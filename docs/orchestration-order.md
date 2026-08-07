# Orchestration Order Runbook: Calculadora Web

Objetivo: ejecutar handoffs en orden seguro, con gates obligatorios y evidencia por fase.

## 1. Orden obligatorio

1. [DONE] @software-architect - cerrar T1/T3/T4/T5/T6 y actualizar arquitectura
2. [DONE] @requirements-analyst - cerrar T2 (semantica completa de porcentaje)
3. [DONE] @security-engineer - validar mitigaciones de alto riesgo de Sprint 0
4. [DONE] @test-engineer - generar estrategia y RED tests completos
5. [ACTIVE] @frontend-developer - implementar core de calculadora (T10/T14/T18)
6. [PENDING] @frontend-developer - implementar UI y accesibilidad funcional (T22/T26)
7. [PENDING] @css-developer - aplicar design system y responsive refinements
8. [PENDING] @test-engineer - integration/regression gate completo
9. [PENDING] @security-engineer - OWASP audit gate final

## 2. Regla de transicion entre fases

No se avanza a la siguiente fase sin:
- evidencia de DoD de fase actual
- aprobacion humana explicita del Product Owner

## 3. Evidencia minima requerida por handoff

| Handoff | Evidencia requerida |
|:--------|:--------------------|
| Architect -> Requirements | ADR-003 decision draft + contratos actualizados |
| Requirements -> Security | ADR-004 aprobado y trazado en PRD/arquitectura |
| Security -> Test | Confirmacion controles altos definidos (TM-01/02/07/08/09) |
| Test -> Frontend | RED suite ejecuta y falla por causas esperadas |
| Frontend -> CSS | UI funcional + capturas de componentes y estados |
| CSS -> Test | Layout responsive + contraste/focus visible documentado |
| Test -> Security | Reporte GREEN integración/regresión + cobertura |
| Security -> Done | Reporte OWASP sin High/Critical abiertos |

## 3.1 Estado de evidencias a fecha 2026-08-06

- Architect -> Requirements: completo
- Requirements -> Security: completo
- Security -> Test: completo
- Test -> Frontend: parcial (artefactos RED listos; ejecucion automatizada pendiente de runtime)

Decision de operacion para no bloquear flujo:
- Iniciar implementacion core con enfoque TDD estricto.
- Primera tarea del @frontend-developer: crear runtime minimo de pruebas (package.json + vitest + playwright config) sin resolver pruebas.
- Objetivo inmediato: ejecutar RED y capturar falla esperada antes de escribir implementacion funcional.

## 4. Rollback policy

Si gate falla:
- Gate de Test falla: retorna a @frontend-developer o @css-developer segun tipo de defecto.
- Gate de Security falla: retorna a @frontend-developer para remediacion; re-auditar.

## 5. Duracion objetivo por macrofase

- Fase 0 + gate seguridad inicial: 2.5 dias
- RED tests: 1.5 dias
- Desarrollo frontend+css: 7 dias
- Gates finales: 1.5 dias

Total objetivo: 12.5 dias habiles

## 6. Mensajes de control para cada transicion

- "Phase 0 complete. Ready to handoff to @test-engineer for RED suite?"
- "RED suite complete. Ready to handoff to @frontend-developer for core implementation?"
- "Frontend core complete. Ready to handoff to @css-developer for styling phase?"
- "Styling complete. Ready to handoff to @test-engineer for integration/regression gate?"
- "Test gate GREEN. Ready to handoff to @security-engineer for OWASP gate?"
