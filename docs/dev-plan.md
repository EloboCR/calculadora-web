# Development Plan: Calculadora Web

Fuente:
- docs/calculadora-web/plan.md
- docs/calculadora-web/dependencies.md
- docs/calculadora-web/architecture.md
- docs/calculadora-web/threat-model.md

## Overview
- Arquitectura: Frontend-only (TypeScript/React + CSS), sin backend para v1
- Esfuerzo total: 45 SP
- project_root resuelto: projects/calculadora-web
- Estado general: **100% COMPLETADO Y VALIDADO (GREEN)**

## Gate Validation

Estado final de prerequisitos:
- Architecture approved: Phase 0 completada (ADR-001 a ADR-004 cerrados) [x]
- Plan approved: aprobado por Product Owner [x]
- RED tests written & validated to GREEN: 25/25 pruebas en verde [x]
- UI & Styling: Design tokens y responsive 375px implementados [x]
- Security Audit: OWASP Top 10 & STRIDE auditados y aprobados [x]

---

## Phase Breakdown

### Phase 0: Cierre de decisiones y seguridad base
- [x] T1 Definir politica decimal (ADR-003)
- [x] T2 Cerrar semantica porcentaje (ADR-004)
- [x] T3 Actualizar contratos internos NumberPolicy/PercentRule
- [x] T4 Baseline CSP/headers
- [x] T5 Baseline CI integridad supply-chain
- [x] T6 Limites anti-abuso parser/input

### Phase 1: Test Gate RED (TDD)
- [x] Crear estrategia de pruebas en `docs/calculadora-web/test-strategy.md`
- [x] Escribir suites unitarias e integración en `projects/calculadora-web/tests/`
- [x] Validar que las pruebas ejerciten los escenarios BDD exactos

### Phase 2: Frontend Core (Dominio + Estado)
- [x] T10 Scaffold app/store/dispatcher (`App.tsx`, `calculatorReducer`)
- [x] T14 Tokenizer/Parser/Evaluator RPN con `decimal.js`
- [x] T18 PercentRule (físico), NumberPolicy (half-up) y DisplayFormatter

### Phase 3: UI + Styling + A11y
- [x] T22 Componentes funcionales `Display.tsx`, `CalcButton.tsx`, `App.tsx`
- [x] T26 Accesibilidad (`aria-live="polite"`, `role="alert"` en Error, navegación por teclado)
- [x] Aplicar design tokens, micro-interacciones y soporte responsive para viewports desde 375px en `src/styles/app.css`

### Phase 4: Release Hardening & Build
- [x] Configuración de tipos y build de producción (`tsc --noEmit` y `vite build` completados)
- [x] Verificación de empaquetado de assets limpios en `dist/`

### Phase 5: Integration and Regression Gate
- [x] 25 pruebas unitarias, de integración y UI ejecutadas exitosamente (100% GREEN)

### Phase 6: OWASP Audit Gate
- [x] Reporte de auditoría de seguridad completado en `docs/calculadora-web/security-audit.md`
- [x] Sin hallazgos críticos o altos en el bundle de producción