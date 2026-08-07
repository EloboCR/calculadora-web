# Matriz de Dependencias: Calculadora Web Básica

Fuente plan: `docs/calculadora-web/plan.md`  
Fecha: 2026-08-06

## 1. Matriz de dependencias directas

| ID | Predecesora | Sucesora | Tipo | Justificación | Riesgo si falla |
|---|---|---|---|---|---|
| D1 | T1 | T3 | Bloqueante | Contratos dependen de política decimal | Inconsistencia numérica en dominio |
| D2 | T2 | T3 | Bloqueante | Contratos dependen de semántica `%` | Ambigüedad funcional en evaluador |
| D3 | T3 | T10 | Bloqueante | Scaffold necesita contratos claros para interfaces | Re-trabajo en app/domain |
| D4 | T6 | T9 | Bloqueante | Edge tests requieren límites anti-abuso definidos | Tests no deterministas |
| D5 | T10 | T14 | Bloqueante | Parser/evaluator integran con estado y dispatcher base | Integración rota |
| D6 | T14 | T18 | Bloqueante | Formatter y percent rule usan resultado del evaluator | Doble implementación de lógica |
| D7 | T18 | T22 | Bloqueante | UI consume output formateado y estados de error finales | UI atada a contrato inestable |
| D8 | T22 | T26 | Bloqueante | A11y aplica sobre componentes ya renderizables | Re-trabajo visual y de foco |
| D9 | T4 | T27 | Bloqueante | Config final de headers parte de baseline definida | Seguridad incompleta en hosting |
| D10 | T5 | T28 | Bloqueante | CI gates necesitan política acordada | Pipeline inseguro |
| D11 | T26 | T30 | Bloqueante | QA final depende de comportamiento accesible estable | Defectos tardíos costosos |
| D12 | T27 | T30 | Bloqueante | Cross-browser final incluye validación headers | Aprobación release incompleta |
| D13 | T28 | T30 | Bloqueante | QA release requiere CI verde con gates activos | Sin evidencia de calidad |
| D14 | T29 | T30 | Bloqueante | Estrategia de caché debe estar activa antes de validación final | Bugs por assets mezclados |

## 2. Dependencias por amenaza (STRIDE)

| Threat ID | Controles dependientes | Estado esperado antes de release |
|---|---|---|
| TM-01 | T4, T27 | HTTPS + HSTS + dominio canónico configurado |
| TM-02 | T5, T28 | Integridad de artefactos y protecciones de rama activas |
| TM-07 | T4, T5, T28 | CSP efectiva + control de dependencias |
| TM-08 | T1, T3, T15, T18 | Política decimal cerrada y validada por pruebas |
| TM-09 | T2, T3, T15, T18 | Regla `%` cerrada y cubierta por BDD/tests |
| TM-11 | T5, T29, T30 | Hashing y caché verificados en validación final |

## 3. Orden de ejecución por sprint

### Sprint 0
T1 -> T2 -> T3 -> T4 -> T5 -> T6

### Sprint 1
T7/T8/T9 -> T10 -> T11/T12/T13 -> T14 -> T15/T16/T17 -> T18

### Sprint 2
T19/T20/T21 -> T22 -> T23/T24/T25 -> T26 -> T27/T28/T29 -> T30

## 4. Hitos y criterios de paso

| Hito | Criterio |
|---|---|
| H1 Fin Sprint 0 | ADR-003 y ADR-004 cerrados; baseline seguridad y límites anti-abuso definidos |
| H2 Fin Sprint 1 | Núcleo de cálculo pasa BDD funcional y edge principal |
| H3 Fin Sprint 2 | WCAG objetivo, cross-browser objetivo y pipeline de seguridad en verde |

## 5. Riesgos de dependencia crítica

- CR-1: retraso en T2 bloquea toda implementación de `%` y test de aceptación.
- CR-2: retraso en T1 bloquea definición numérica y puede invalidar tests S3.
- CR-3: retraso en T28 retrasa release aunque funcionalidad esté completa.

## 6. Estrategia de mitigación

- Timebox T1/T2 en primeros 2 días de Sprint 0.
- Preparar test skeletons de S1/S2 en paralelo mientras cierra T3.
- Ejecutar dry-run de CI gates en entorno preview antes de freeze de Sprint 2.
