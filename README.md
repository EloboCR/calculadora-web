# Calculadora Web 🧮

Calculadora web interactiva con operaciones aritméticas fundamentales, precedencia matemática estándar, lógica de porcentaje tipo calculadora física, cambio de signo y soporte completo para teclado físico.

[![React](https://img.shields.io/badge/React-18-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-purple.svg)](https://vitejs.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-2.1-green.svg)](https://vitest.dev/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 🚀 Características

- ➕ **Operaciones Aritméticas:** Suma, resta, multiplicación, división y porcentaje.
- 🧮 **Precedencia Matemática:** Resolución correcta de expresiones encadenadas (`2 + 3 × 4 = 14`).
- % **Porcentaje Estilo Calculadora Física:** Soporte para acumulados (`200 + 10% = 220`, `200 - 10% = 180`), factores (`200 × 10% = 20`) y conversión directa (`10% = 0.1`).
- ⌨️ **Navegación por Teclado:** Entrada fluida tanto con botones en pantalla como con teclado físico (números, operadores, `Enter` para igual, `Backspace`/`Escape` para limpiar).
- 🔢 **Manejo de Desbordamiento:** Formateo dinámico con notación científica para resultados mayores a 10 dígitos (`1.234e+15`).
- ⚠️ **Gestión de Errores Robustos:** Captura y control de división por cero con bloqueo de pantalla `"Error"` hasta reinicio.
- ♿ **Accesibilidad (a11y):** Cumplimiento con WCAG 2.1 Nivel AA (alto contraste, navegación enfocable, etiquetas ARIA).

---

## 🛠️ Tecnologías

- **Frontend:** React 18 + TypeScript
- **Bundler / Dev Server:** Vite 5
- **Pruebas:** Vitest + React Testing Library (@testing-library/react)
- **Estilos:** CSS3 Vanilla con variables y soporte responsive para móviles y escritorio

---

## 📂 Documentación del Proyecto

Toda la documentación técnica y de ingeniería se encuentra en la carpeta [`/docs`](./docs):

- 📋 [**Requisitos y PRD**](./docs/requirements.md): Historias de usuario, criterios BDD e ISO/IEC/IEEE 29148:2018.
- 📐 [**Arquitectura de Software**](./docs/architecture.md): Diagramas C4, modelo de datos y ADRs.
- 🎨 [**Diseño UI/UX y Sistema de Diseño**](./docs/design.md): Wireframes, flujos de usuario y [tokens de diseño](./docs/design-system.md).
- 🛡️ [**Modelado de Amenazas y Seguridad**](./docs/threat-model.md): Análisis STRIDE y [auditoría de seguridad OWASP](./docs/security-audit.md).
- 🧪 [**Estrategia de Pruebas**](./docs/test-strategy.md): Cobertura TDD, suites unitarias e integración.
- 🗓️ [**Plan de Proyecto y WBS**](./docs/plan.md): Desglose WBS y [mapa de dependencias](./docs/dependencies.md).

---

## 🏁 Instalación y Ejecución

### Prerrequisitos
- **Node.js**: v18.0.0 o superior
- **npm**: v9.0.0 o superior

### Pasos

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/EloboCR/calculadora-web.git
   cd calculadora-web
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

4. **Ejecutar las pruebas unitarias e integración (Vitest):**
   ```bash
   npm test
   ```

5. **Construir para producción:**
   ```bash
   npm run build
   ```

---

## 📜 Licencia

Este proyecto está bajo la Licencia MIT.
