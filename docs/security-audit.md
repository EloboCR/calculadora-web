# Security Audit Report: Calculadora Web

**Fecha:** 2026-08-06  
**Auditor:** Security Engineer  
**Objetivo:** Validar cumplimiento de directivas OWASP Top 10 Client-Side, controles STRIDE y verificación de código en `projects/calculadora-web`.  
**Estado:** APROBADO (Sin vulnerabilidades críticas ni altas en el runtime de producción).

---

## 1. Resumen Ejecutivo

| Categoría | Estado | Observaciones |
| :--- | :--- | :--- |
| **Integridad de Cálculo (TM-08, TM-09)** | ✅ APROBADO | Operaciones matemáticas basadas en `decimal.js`, sin pérdida de precisión de punto flotante ni ambigüedades. |
| **Protección contra Inyecciones (OWASP A03 / TM-03)** | ✅ APROBADO | Cero uso de `eval()`, `Function()`, `innerHTML` o `dangerouslySetInnerHTML`. Todo el renderizado es declarativo vía React y textContent. |
| **Límites Anti-Abuso y DoS (TM-06, TM-12)** | ✅ APROBADO | Expresiones limitadas a 64 caracteres y 64 tokens. Transición inmediata a estado `Error` bloqueante. |
| **Manejo de Errores y Estados Seguros (FR6 / TM-10)** | ✅ APROBADO | Bloqueo estricto `errorLocked` tras división entre cero o desbordamiento. Solo la acción `CLEAR` (`C` / `Escape`) restablece el estado. |
| **Accesibilidad Segura (A11y / TM-10)** | ✅ APROBADO | Sincronización atómica entre display visual y región `aria-live="polite"`. Emisión de `role="alert"` únicamente en estado de error. |
| **Dependencias de Producción** | ✅ APROBADO | `react`, `react-dom` y `decimal.js` limpios de vulnerabilidades conocidas. |
| **Dependencias de Desarrollo (Dev-Only)** | ℹ️ NOTA | Advisory `esbuild` <= 0.24.2 aplica exclusivamente al servidor de desarrollo local de Vite; no impacta el bundle estático de producción. |

---

## 2. Matriz de Mitigaciones STRIDE

| Threat ID | Descripción | Mitigación Implementada | Evidencia |
| :--- | :--- | :--- | :--- |
| **TM-03** | Inyección de eventos o estados no mapeados | Allowlist estricta de teclas e inputs en `App.tsx` y reducer funcional inmutable. | [calculatorEngine.ts:173](file:///Users/geinervillalobos/Documents/dev/agents/projects/calculadora-web/src/domain/calculatorEngine.ts#L173-L220) |
| **TM-05** | Divulgación de información por logs o telemetría | Sin telemetría, sin almacenamiento en cookies/localStorage, sin llamadas a `console.log` con datos de usuario. | Inspección de código fuente `src/**` |
| **TM-06** | DoS por expresiones infinitas o sobrecarga de memoria | `checkGuards()` limita tamaño total de expresión a `<= 64` caracteres y `<= 64` tokens. | [calculatorEngine.ts:68-71](file:///Users/geinervillalobos/Documents/dev/agents/projects/calculadora-web/src/domain/calculatorEngine.ts#L68-L71) |
| **TM-08** | Deriva de precisión en coma flotante | Operaciones ejecutadas con `Decimal.js` con redondeo half-up a 10 dígitos significativos. | [calculatorEngine.ts:40-62](file:///Users/geinervillalobos/Documents/dev/agents/projects/calculadora-web/src/domain/calculatorEngine.ts#L40-L62) |
| **TM-09** | Ambigüedad en semántica de `%` | Implementación del modelo de calculadora física según ADR-004 (`200 + 10% = 220`, `200 - 10% = 180`, `200 * 10% = 20`, `200 / 10% = 2000`). | [calculatorEngine.ts:157-163](file:///Users/geinervillalobos/Documents/dev/agents/projects/calculadora-web/src/domain/calculatorEngine.ts#L157-L163) |
| **TM-10** | Desincronización en lectores de pantalla (A11y) | Un solo estado `state.display` alimenta tanto el contenedor visual como `aria-live`. | [Display.tsx:8-18](file:///Users/geinervillalobos/Documents/dev/agents/projects/calculadora-web/src/ui/Display.tsx#L8-L18) |
| **TM-12** | Inundación de eventos de teclado | Filtro por regex de dígitos y mapa cerrado de operaciones antes de despachar acciones al reducer. | [App.tsx:41-74](file:///Users/geinervillalobos/Documents/dev/agents/projects/calculadora-web/src/App.tsx#L41-L74) |

---

## 3. Verificación de Suites de Pruebas

- **Total de pruebas unitarias & de integración:** 25 pruebas
- **Pruebas superadas:** 25 / 25 (100% GREEN)
- **Compilación TypeScript:** Sin errores (`tsc --noEmit` exitoso)
- **Build de producción:** Generado exitosamente en `projects/calculadora-web/dist/`

---

## 4. Veredicto Final

El componente **Calculadora Web** cumple con los estándares de seguridad, accesibilidad y precisión arquitectónica definidos en los documentos de requisitos, arquitectura y threat model. Se autoriza el pase a fase de producción / despliegue.
