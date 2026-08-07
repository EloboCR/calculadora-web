# PRD: Calculadora Web Básica

**Standard:** ISO/IEC/IEEE 29148:2018 | IIBA BABOK v3
**Estado:** READY
**Fecha:** 2026-08-06

## 1. Problema y OKR

**Problema:** Usuarios necesitan realizar cálculos aritméticos básicos rápido, sin instalar app, desde navegador.

**OKR:** Habilitar cálculo aritmético básico (suma, resta, multiplicación, división, porcentaje) en web, respuesta instantánea, sin fricción de login.

## 2. Actores

| Actor | Descripción | Permisos |
|---|---|---|
| Usuario anónimo | Único actor, sin cuenta ni rol | Ejecutar cálculos, limpiar display |

## 3. Alcance

### In-Scope
- Operaciones: suma, resta, multiplicación, división, porcentaje
- Input: botones en pantalla + teclado físico (números, operadores, Enter=`=`, Escape/`C`=limpiar)
- Decimales (`.`) y cambio de signo (`±`)
- Cálculo encadenado con precedencia matemática estándar (`2+3×4=14`)
- Porcentaje estilo calculadora física completa:
  - `200+10%=220`
  - `200-10%=180`
  - `200×10%=20`
  - `200÷10%=2000`
  - `10%=0.1` (standalone)
- Límite de 10 dígitos en display; overflow → notación científica (`1.234e+15`)
- Error de división por cero → muestra `"Error"`, requiere botón `C` para continuar
- Diseño responsive: escritorio + móvil
- Accesibilidad WCAG 2.1 AA

### Out-of-Scope
- Login / cuentas de usuario
- Historial de cálculos (ni local ni en servidor)
- Funciones científicas (trig, log, raíces, potencias, paréntesis explícitos)
- Conversión de unidades / calculadora financiera
- Persistencia entre sesiones (recarga resetea a `0`)

## 4. Requisitos Funcionales

| ID | Requisito |
|---|---|
| FR1 | Sistema ejecuta suma, resta, multiplicación, división, porcentaje |
| FR2 | Usuario ingresa datos vía click/tap en botones o teclado físico |
| FR3 | Cálculos encadenados resuelven con precedencia matemática (multiplicación/división antes que suma/resta) |
| FR4 | Usuario ingresa decimales (`.`) y alterna signo (`±`) |
| FR5 | Display máximo 10 dígitos; excedente se muestra en notación científica |
| FR6 | División por cero muestra `"Error"` en display; solo botón `C` limpia y reactiva calculadora |
| FR7 | Botón `%` sigue regla calculadora física completa: en `+` y `-` aplica porcentaje sobre acumulado; en `×` y `÷` usa valor porcentual del operando actual; standalone convierte `n%` a `n/100` |
| FR8 | Layout se adapta a escritorio y móvil (responsive) |

## 5. Requisitos No Funcionales (restricciones de negocio)

| ID | NFR | Valor medible |
|---|---|---|
| NFR1 | Compatibilidad navegador | Últimas 2 versiones de Chrome, Firefox, Edge, Safari |
| NFR2 | Compatibilidad dispositivo | Escritorio + móvil, responsive (sin app nativa) |
| NFR3 | Accesibilidad | WCAG 2.1 nivel AA (contraste, navegación por teclado, labels para screen reader) |
| NFR4 | Tiempo de respuesta percibido | <100ms entre input y actualización de display |
| NFR5 | Persistencia de datos | Ninguna — sin backend, sin cookies, sin storage entre sesiones |
| NFR6 | Privacidad | Sin recolección de datos personales (no aplica login) |

## 6. Criterios de Aceptación (BDD)

```gherkin
Feature: Calculadora web básica

  Scenario: Suma simple (happy path)
    Given la calculadora muestra "0"
    When el usuario ingresa "5", luego "+", luego "3", luego "="
    Then el display muestra "8"

  Scenario: Cálculo encadenado con precedencia matemática (happy path)
    Given la calculadora muestra "0"
    When el usuario ingresa "2 + 3 × 4 ="
    Then el display muestra "14"

  Scenario: Entrada de decimales (happy path)
    Given la calculadora muestra "0"
    When el usuario ingresa "1.5 + 2.25 ="
    Then el display muestra "3.75"

  Scenario: Cambio de signo (happy path)
    Given el display muestra "7"
    When el usuario presiona "±"
    Then el display muestra "-7"

  Scenario: Porcentaje del acumulado (happy path)
    Given la calculadora muestra "0"
    When el usuario ingresa "200 + 10 % ="
    Then el display muestra "220"

  Scenario: Porcentaje en resta (happy path)
    Given la calculadora muestra "0"
    When el usuario ingresa "200 - 10 % ="
    Then el display muestra "180"

  Scenario: Porcentaje en multiplicación (happy path)
    Given la calculadora muestra "0"
    When el usuario ingresa "200 × 10 % ="
    Then el display muestra "20"

  Scenario: Porcentaje en división (happy path)
    Given la calculadora muestra "0"
    When el usuario ingresa "200 ÷ 10 % ="
    Then el display muestra "2000"

  Scenario: Porcentaje standalone (happy path)
    Given la calculadora muestra "0"
    When el usuario ingresa "10 %"
    Then el display muestra "0.1"

  Scenario: División por cero (error path)
    Given la calculadora muestra "0"
    When el usuario ingresa "5 ÷ 0 ="
    Then el display muestra "Error"
    And ningún botón excepto "C" produce cambio en el display

  Scenario: Recuperación tras error (error path)
    Given el display muestra "Error"
    When el usuario presiona "C"
    Then el display muestra "0"
    And la calculadora acepta nueva entrada normalmente

  Scenario: Overflow de dígitos (edge case)
    Given la calculadora muestra "0"
    When el resultado de una operación excede 10 dígitos
    Then el display muestra el resultado en notación científica (ej. "1.234e+15")

  Scenario: Entrada por teclado físico (edge case)
    Given la calculadora muestra "0"
    When el usuario presiona teclas físicas "9", "*", "9", "Enter"
    Then el display muestra "81"

  Scenario: Uso en viewport móvil (edge case)
    Given el usuario abre la calculadora en un viewport de 375px de ancho
    Then todos los botones son visibles y accionables sin scroll horizontal
```

## 7. Riesgos y Trade-offs Conocidos

| Riesgo | Mitigación |
|---|---|
| Sin historial puede frustrar usuarios que quieran recuperar cálculo previo | Aceptado por decisión de Product Owner (fuera de alcance v1) |
| Precisión de punto flotante en decimales (ej. `0.1+0.2`) | Arquitecto define estrategia de redondeo en display |

## 8. Definition of Ready (Quality Gate)

- [x] Problema y OKR definidos
- [x] Alcance in/out explícito
- [x] Actores y permisos identificados
- [x] Requisitos funcionales completos y sin ambigüedad
- [x] NFRs con valores medibles (no términos vagos)
- [x] Criterios de aceptación BDD (happy, error, edge cubiertos)
- [x] Riesgos documentados
- [x] Aprobación de Product Owner pendiente (ver sección 9)

**Verdicto: READY**

## 9. Aprobación

Aprobado por Product Owner (2026-08-06).
