# Phase 2 Kickoff Packet: Specialist Implementation

Fecha: 2026-08-06  
Estado: Active handoff to frontend specialist

## Objetivo inmediato

Satisfacer RED tests con secuencia TDD real:
1. Habilitar runtime de pruebas.
2. Ejecutar suite RED y confirmar fallas esperadas.
3. Implementar core de calculadora (T10/T14/T18) hasta GREEN.

## Handoff A - @frontend-developer (Core)

Scope:
- T10 scaffold app/store/dispatcher
- T14 tokenizer/parser/evaluator
- T18 percentRule/numberPolicy/displayFormatter

Entradas obligatorias:
- docs/calculadora-web/requirements.md
- docs/calculadora-web/architecture.md
- docs/calculadora-web/test-strategy.md
- projects/calculadora-web/tests/unit/calculadora-core.test.ts
- projects/calculadora-web/tests/integration/calculadora-integration.test.ts

Pre-step tecnico (runtime):
- Crear en projects/calculadora-web/:
  - package.json
  - tsconfig.json
  - vite.config.ts (si aplica)
  - vitest config
  - playwright config
- Instalar dependencias de test necesarias.

Secuencia de ejecucion exigida:
1. Ejecutar unit tests RED y guardar evidencia de fallas esperadas.
2. Implementar T10 en src/app y pasar tests S1.
3. Ejecutar integration RED restante.
4. Implementar T14 en src/domain y pasar S2.
5. Ejecutar unit/integration RED restante.
6. Implementar T18 y pasar S3.

Definition of Done Handoff A:
- S1/S2/S3 en GREEN.
- Cobertura parser >= 90%.
- Casos FR7 completos en verde:
  - 200+10%=220
  - 200-10%=180
  - 200*10%=20
  - 200/10%=2000
  - 10%=0.1
- Error lock FR6 verde: solo C desbloquea.

Evidencia requerida para cerrar A:
- Output de test run antes (RED) y despues (GREEN).
- Lista de archivos implementados en src/app y src/domain.

## Handoff B - @frontend-developer (UI/A11y funcional)

Se activa solo cuando Handoff A cierre GREEN.

Scope:
- T22 componentes UI funcionales
- T26 teclado y accesibilidad funcional

Entradas:
- projects/calculadora-web/tests/e2e/calculadora.e2e.test.ts
- docs/calculadora-web/design.md
- docs/calculadora-web/design-system.md

DoD:
- S4/S5 GREEN funcional.
- aria-live y role alert segun estrategia.
- keyboard mapping completo.

## Handoff C - @css-developer (Styling)

Se activa tras cierre de Handoff B.

Scope:
- aplicar tokens, estados visuales, responsive final, contraste/foco

DoD:
- 375px sin scroll horizontal
- focus-visible claro
- contraste WCAG objetivo

## Handoff D - @test-engineer (Integration/Regression Gate)

Se activa tras cierre C.

Scope:
- regression completa
- cross-browser objetivo NFR1

DoD:
- reportes GREEN
- cobertura y no-regresion verificadas

## Handoff E - @security-engineer (OWASP Gate)

Se activa tras cierre D.

Scope:
- auditoria OWASP final

DoD:
- sin High/Critical abiertos
- riesgo residual documentado y aceptado por PO si aplica

## Regla de escalamiento

Si cualquier gate falla, retorno al especialista responsable de la fase inmediata anterior. Tech Lead no implementa codigo.
