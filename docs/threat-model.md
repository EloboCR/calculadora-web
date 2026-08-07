# Threat Model: Calculadora Web Básica

Source architecture: [docs/calculadora-web/architecture.md](architecture.md)  
Source requirements: [docs/calculadora-web/requirements.md](requirements.md)  
Method: STRIDE + OWASP ASVS + CWE/SANS Top 25  
Date: 2026-08-06  
Status: Approved checkpoint 1 - mitigations defined, ready for RED test phase

## 1. Scope and Assets

In scope:
- Browser app runtime and UI components
- Input adapter (keyboard and pointer)
- Expression parser and evaluator
- Static hosting and CDN delivery
- Build pipeline artifacts serving frontend

Critical assets:
- Integrity of calculator logic (correct and unmodified results)
- Availability of client app
- User trust in displayed results
- Build artifact integrity and dependency supply chain

Out of scope:
- Backend APIs, databases, authentication systems (none in v1)

## 2. Trust Boundaries and Data Flows

Trust boundaries:
1. User input to browser runtime
2. Browser runtime to in-page domain engine
3. Static host/CDN to browser (asset delivery)
4. Build pipeline to static host (artifact promotion)

Primary data flows:
- DF1: keystrokes/taps from user to input adapter
- DF2: input actions to parser/evaluator/state machine
- DF3: computed output to display and aria-live region
- DF4: JS/CSS/HTML artifacts from CDN to browser
- DF5: CI build output to hosting platform

## 3. STRIDE Analysis by Boundary/Data Flow

| ID | Boundary/Flow | STRIDE | Threat | Likelihood | Impact | Risk | Required mitigation | Owner |
|---|---|---|---|---|---|---|---|---|
| TM-01 | DF4 CDN to browser | Spoofing | User receives app from impersonated domain (phishing clone) | Medium | High | High | Enforce HSTS preload, redirect HTTP to HTTPS, custom domain with strict DNS management, user-facing canonical URL guidance | Architect + Ops |
| TM-02 | DF5 CI to host | Tampering | Build artifact modified before deployment | Medium | High | High | Protected main branch, signed commits/tags for releases, CI provenance attestations, immutable deploy per commit hash | Tech Lead + DevOps |
| TM-03 | DF1 user input | Tampering | Synthetic event injection manipulates hidden states | Medium | Medium | Medium | Pure functional reducer with explicit action allowlist, reject unknown key mappings, disable dangerous eval APIs | Frontend |
| TM-04 | DF2 input to evaluator | Repudiation | No auditable trace for calculation bugs reported by users | Low | Medium | Low | Optional local debug mode with reproducible action trace (non-personal, non-persistent) | Frontend |
| TM-05 | DF3 output to display | Information Disclosure | Sensitive data leaked through logs/telemetry | Low | Medium | Low | No telemetry by default, ban console logging of user expressions in production build | Frontend |
| TM-06 | DF1/DF2 | Denial of Service | Extremely long or malformed expression causes UI freeze | Medium | Medium | Medium | Input length cap, operation count cap, debounce key repeat, parser guardrails and fail-fast error state | Frontend |
| TM-07 | Runtime global objects | Elevation of Privilege | Third-party script executes and gains code execution context | Low | High | High | CSP default-src 'self'; no inline script; no untrusted third-party scripts; dependency pinning and audit | Architect + Security |
| TM-08 | DF2 evaluator | Tampering | Floating-point precision drift leads to incorrect financial-like outputs | High | Medium | High | Adopt decimal arithmetic library or deterministic rounding policy approved in ADR-003, add regression tests for decimal edge cases | Architect + Test |
| TM-09 | DF2 percent rule | Insecure design | Ambiguous '%' semantics produce inconsistent behavior exploitable for user deception | High | Medium | High | Close business rule ADR-004 before implementation; enforce behavior via BDD tests | Product Owner + Requirements |
| TM-10 | DF3 aria-live | Information Disclosure | Screen reader announces stale or misleading output sequence | Medium | Low | Low | Single source of truth state store, atomic updates to visible + aria-live text, announce errors with role alert only on transition | Frontend |
| TM-11 | DF4 asset caching | Tampering | Stale/corrupt assets mixed across versions | Medium | Medium | Medium | Content-hashed assets, short-cache index.html, cache busting on release | DevOps |
| TM-12 | Client runtime | Denial of Service | Repeated keydown flood (automation) causes degraded UX | Medium | Low | Low | Ignore unsupported keys, cap repeat processing per frame/requestAnimationFrame batch | Frontend |

## 4. Top Risks (Critical and High)

High findings summary:
- TM-01 domain spoofing and transport hardening gap
- TM-02 artifact integrity in CI/CD path
- TM-07 script execution and supply-chain exposure
- TM-08 numeric integrity drift for decimals
- TM-09 unresolved percent-rule ambiguity (insecure design)

Critical findings:
- None identified at this stage

## 5. Mitigation Plan Mapped to Architecture Components

| Architecture component | Threat IDs | Mandatory controls before planning handoff |
|---|---|---|
| Static Hosting/CDN | TM-01, TM-11 | HTTPS-only, HSTS, content hashing, cache policy split for index vs assets |
| CI pipeline/deploy | TM-02 | Branch protection, provenance/signed releases, immutable artifact promotion |
| Input adapter | TM-03, TM-06, TM-12 | Key allowlist, action schema validation, rate and length guards |
| Parser/Evaluator | TM-06, TM-08, TM-09 | Deterministic parser, decimal policy decision, percent-rule closure, exhaustive unit tests |
| State store + Display + A11y layer | TM-10 | Atomic state updates, aria-live consistency contract, error transition tests |
| Dependency management | TM-07 | Lockfile required, automated vulnerability scans in CI, trusted dependency policy |

## 6. Security Requirements for Architect Sign-off

1. Publish CSP and security headers policy in architecture/deployment section.
2. Lock decision for decimal strategy (ADR-003) and define rounding behavior.
3. Resolve business rule ADR-004 for percent semantics before development.
4. Define CI security gates: dependency audit, lint for unsafe APIs, build reproducibility.
5. Include abuse limits in parser/input (max token count, max input length).

## 7. Residual Risk

Residual risk accepted only if Product Owner documents explicit acceptance:
- Potential user confusion if percent rule remains partially specified.
- Supply-chain drift between vulnerability disclosure and patch window.

## 8. Human Loop Checkpoint

Threats identified: 12 total  
Critical: 0  
High: 5  
Medium: 4  
Low: 3

Recommendation:
- High findings have mitigation decisions documented (TM-01/TM-02/TM-07/TM-08/TM-09).
- Proceed to RED test phase and enforce controls during implementation.

Decision prompt for Product Owner and Architect:
- Approved. Route to Test Engineer for RED suite creation with security assertions.

## 9. Sign-off Checklist

- [x] Threat model reviewed by Product Owner
- [x] Threat model reviewed by Architect
- [x] High risks TM-01/TM-02/TM-07/TM-08/TM-09 have documented mitigation in architecture
- [x] ADR-003 approved (decimal policy)
- [x] ADR-004 resolved (percent semantics)
- [x] Security checkpoint 1 approved for handoff to planning
