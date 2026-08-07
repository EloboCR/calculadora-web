# Test Strategy: Calculadora Web

Fuente:
- docs/calculadora-web/requirements.md
- docs/calculadora-web/architecture.md
- docs/calculadora-web/design.md
- docs/calculadora-web/threat-model.md

Estado: RED phase plan listo  
Fecha: 2026-08-06

## 1. Test Pyramid Distribution

- Unit tests: 70% (dominio de calculo, formatter, guards, estado)
- Integration tests: 20% (input adapter + estado + motor + display contract)
- E2E tests: 10% (flujos criticos usuario, a11y y responsive)

## 2. Coverage Targets

- Line coverage: 85% minimo
- Branch coverage: 80% minimo
- Critical path coverage: 100%
  - Precedencia matematica (FR3)
  - Regla porcentaje completa (FR7)
  - Division por cero y lock de error (FR6)
  - Overflow y notacion cientifica (FR5)
  - Keyboard mapping y A11y minima (FR2/NFR3)

## 3. Test Cases by Feature

| Feature | Scenario | Type | Priority | Test file |
|:--|:--|:--|:--|:--|
| Calculo basico | suma/resta/multiplicacion/division | Unit | P0 | projects/calculadora-web/tests/unit/calculadora-core.test.ts |
| Precedencia | `2+3×4=14` | Unit | P0 | projects/calculadora-web/tests/unit/calculadora-core.test.ts |
| Porcentaje | +, -, ×, ÷, standalone | Unit | P0 | projects/calculadora-web/tests/unit/calculadora-core.test.ts |
| Error lock | division por cero bloquea todo excepto C | Integration | P0 | projects/calculadora-web/tests/integration/calculadora-integration.test.ts |
| Overflow | >10 digitos notacion cientifica | Unit | P1 | projects/calculadora-web/tests/unit/calculadora-core.test.ts |
| Keyboard | keys validas e invalidas | Integration | P1 | projects/calculadora-web/tests/integration/calculadora-integration.test.ts |
| Responsive | viewport 375px sin scroll horizontal | E2E | P1 | projects/calculadora-web/tests/e2e/calculadora.e2e.test.ts |
| A11y | aria-live, role alert, focus-visible | E2E | P1 | projects/calculadora-web/tests/e2e/calculadora.e2e.test.ts |

## 4. Test Data and Fixtures

- Fixture principal: projects/calculadora-web/tests/fixtures/calculadora-data.json
- Casos de precision decimal: 0.1+0.2, 1.005 redondeo half-up, 10% standalone
- Casos de limite: expression length 64, token limit 64

## 5. Mocks Strategy

- Input guard mock: projects/calculadora-web/tests/mocks/input-guard.mock.ts
- Objetivo: desacoplar pruebas de UI/estado del algoritmo final en etapas tempranas RED

## 6. Security Assertions (from STRIDE)

- TM-06/TM-12: input overflow y key flood pasan a estado controlado
- TM-08: precision y redondeo segun ADR-003
- TM-09: porcentaje consistente en todos operadores
- TM-10: salida accesible sincronizada (display visible y aria-live)

## 7. CI/CD Test Gates

- Pre-commit: unit subset rapido
- PR gate: unit + integration
- Release gate: unit + integration + e2e + a11y checks

## 8. RED Phase Deliverables

- [x] Estrategia de test creada
- [x] Esqueleto RED unit creado
- [x] Esqueleto RED integration creado
- [x] Esqueleto RED e2e creado
- [x] Fixtures y mocks creados
- [ ] Suite RED ejecutada localmente (pendiente scaffold runtime de proyecto)

## 9. Human Loop Checkpoint

Scope de cobertura definido:
- 13 casos unit
- 9 casos integration
- 8 casos e2e

Pregunta de control: cobertura propuesta para RED te parece suficiente para pasar a implementacion GREEN?