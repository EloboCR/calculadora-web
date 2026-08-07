# Handoff Specifications: Calculadora Web

Este documento define contrato de entrada/salida entre agentes para evitar bloqueos y retrabajo.

## H1 - Product Breakdown Planner to Tech Lead

Entrada:
- docs/calculadora-web/plan.md
- docs/calculadora-web/dependencies.md

Salida esperada:
- docs/calculadora-web/dev-plan.md
- docs/calculadora-web/orchestration-order.md

Criterio de aceptacion:
- Fases claras
- Dependencias y ruta critica reflejadas
- Security controls convertidos en tareas explicitas

## H2 - Tech Lead to Software Architect

Objetivo:
- Ejecutar T1/T3/T4/T5/T6 (Sprint 0 tecnico y seguridad base)

Entradas minimas:
- Arquitectura actual
- Threat model aprobado
- WBS aprobado

Entregables:
- Arquitectura actualizada con ADR-003 definido
- Contratos internos actualizados
- Baseline headers/CSP y CI security gates documentados
- Limites anti-abuso documentados

Gate para cerrar H2:
- TM-01/TM-02/TM-07/TM-08 mitigados a nivel de definicion

## H3 - Tech Lead to Requirements Analyst

Objetivo:
- Ejecutar T2 y cerrar ADR-004 (regla de porcentaje)

Entradas:
- PRD actual
- Dependencias y amenazas TM-09

Entregables:
- Regla porcentaje aprobada para +,-,x,division,standalone
- Escenarios BDD ajustados

Gate para cerrar H3:
- Sin ambiguedad funcional en FR7

## H4 - Tech Lead to Security Engineer (checkpoint inicial)

Objetivo:
- Verificar Sprint 0 cubre riesgos altos

Entradas:
- Arquitectura actualizada tras H2/H3
- Threat model

Entregables:
- Confirmacion de mitigaciones propuestas aceptables
- Lista de gaps remanentes para desarrollo

Gate para cerrar H4:
- Aprobacion para pasar a RED tests

## H5 - Tech Lead to Test Engineer (RED phase)

Objetivo:
- Generar estrategia de test y suites RED

Entradas:
- PRD, arquitectura, diseño, plan y dependencias

Entregables:
- docs/calculadora-web/test-strategy.md
- RED tests bajo projects/calculadora-web/tests/**

Gate para cerrar H5:
- Suite RED ejecuta y falla por razones esperadas
- Cobertura de escenarios happy/error/edge

## H6 - Tech Lead to Frontend Developer (core)

Objetivo:
- Implementar T10/T14/T18 y llevar S1-S3 a GREEN

Entradas:
- RED tests S1-S3
- ADR-003 y ADR-004 cerrados

Entregables:
- src/app y src/domain implementados
- Evidencia tests GREEN S1-S3

Gate para cerrar H6:
- FR1/FR3/FR4/FR5/FR6/FR7 funcionales en pruebas

## H7 - Tech Lead to Frontend Developer (UI/A11y funcional)

Objetivo:
- Implementar T22/T26 y dejar base para styling

Entradas:
- RED tests S4-S5
- Diseño y tokens

Entregables:
- Componentes UI funcionales
- Navegacion teclado y atributos ARIA base

Gate para cerrar H7:
- Flujos UI funcionales + pruebas S4/S5 en verde (sin refinamiento visual final)

## H8 - Tech Lead to CSS Developer

Objetivo:
- Aplicar sistema visual, responsive y estados finales

Entradas:
- Componentes funcionales
- docs/calculadora-web/design.md
- docs/calculadora-web/design-system.md

Entregables:
- estilos finales responsive
- estados visuales focus/pressed/error
- evidencia contraste WCAG objetivo

Gate para cerrar H8:
- Sin layout break en 375px, 768px, desktop

## H9 - Tech Lead to Test Engineer (integration/regression gate)

Objetivo:
- Validacion final funcional + cross-browser (T30)

Entradas:
- Implementacion frontend/css completa
- Config release hardening T27/T28/T29

Entregables:
- Reporte regression GREEN
- Reporte compatibilidad navegadores objetivo

Gate para cerrar H9:
- NFR1/NFR2/NFR3/NFR4 comprobados

## H10 - Tech Lead to Security Engineer (OWASP final gate)

Objetivo:
- Auditoria final antes de produccion

Entradas:
- Reportes GREEN de tests
- Configuracion security controls activa

Entregables:
- Reporte OWASP final
- Riesgos residuales y aceptacion PO (si aplica)

Gate para cerrar H10:
- No Critical/High abiertos o aceptacion formal de riesgo

## Escalation Rule

Si cualquier gate falla:
- Tech Lead no implementa cambios.
- Reasigna al especialista responsable y repite gate.
