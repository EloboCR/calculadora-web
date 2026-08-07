# Design System Tokens: Calculadora Web Básica

**Fuente:** [docs/calculadora-web/design.md](design.md)
**Estado:** Borrador — pendiente aprobación

## Colors

```
Primary (operadores):   #0066CC  (Azul)
Neutral (digitos):      #F1F3F5  (Gris muy claro, fondo boton digito)
Neutral text:           #212529  (Texto sobre boton digito)
Function (C, ±, %):     #ADB5BD  (Gris medio, fondo boton funcion)
Equals:                 #0066CC  (Azul, mismo peso visual que operador principal)
Danger (Error):         #DC3545  (Rojo, texto de error — contraste 4.5:1 validado sobre fondo blanco)
Background (pantalla):  #FFFFFF
Display background:     #212529  (Fondo oscuro, texto claro — legibilidad numerica)
Display text:           #FFFFFF
Border:                 #DEE2E6
Focus outline:          #0066CC  (2px solido, alto contraste)
```

## Typography

```
Font Family: 'Inter', -apple-system, system-ui, sans-serif
Display Font: 'Roboto Mono', ui-monospace, monospace  (alineacion de digitos)

Display value: clamp(28px, 8vw, 48px), Regular (400)
Button label:  clamp(18px, 4vw, 22px), Medium (500)
Error text:    clamp(24px, 6vw, 32px), Semibold (600)
```

## Spacing

```
Base: 4px
Escala: 4, 8, 12, 16, 24, 32

Uso:
- Padding boton: 16px
- Gap entre botones (grid): 8px
- Padding contenedor calculadora: 16px (movil) / 24px (escritorio)
- Padding display: 24px horizontal, 16px vertical
```

## Layout

```
Grid botones: display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px
Ancho maximo contenedor: 360px (escritorio), 100% (movil, con padding lateral 16px)
Touch target minimo: 44x44px (todos los botones)
Border-radius boton: 8px
```

## Elevation

```
Nivel 1 (contenedor calculadora): 0 2px 8px rgba(0,0,0,0.10)
Nivel 2 (boton pressed, inset): inset 0 2px 4px rgba(0,0,0,0.15)
```

## Component Specs

### Boton (todas las variantes)
- Tamaño mínimo: 44×44px
- Estado `pressed`: escala 0.96 + sombra inset (feedback táctil <100ms)
- Estado `focus-visible`: outline 2px `--focus-outline`, offset 2px
- Estado `disabled` (durante Error, excepto `C`): opacidad 0.4, `aria-disabled="true"`, no responde a click/tecla

### Display
- Alineación: derecha (convención numérica)
- Overflow: `clamp()` reduce tamaño de fuente en 2 pasos antes de notación científica
- Error: cambia color de texto a `--color-danger`, mantiene mismo tamaño de contenedor (sin reflow)
