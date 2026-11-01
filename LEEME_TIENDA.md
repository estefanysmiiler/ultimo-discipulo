# El Último Discípulo – versión de tienda (demo gratis + juego completo 2,99 €)

## Qué hace
- Cualquiera juega gratis los 5 primeros niveles.
- Los niveles 6–40 (textos, jefes, versículos) NO están en el archivo público. Solo los entrega una función de Netlify cuando Polar confirma que el código de licencia es válido.
- El código funciona en hasta 3 dispositivos. Una vez activado, el juego funciona sin conexión.
- El juego se vende solo cuando pongas tu enlace de compra. Hasta entonces el botón "Comprar" avisa de que no está configurado.

## Qué contiene
- `public/` → lo que ve el público (index.html, sw.js, manifest, iconos).
- `netlify/functions/` → `activar` y `validar` (privado, no se publica) y los niveles de pago.
- `netlify.toml` → configuración.

## Pasos (cuando quieras)
1. Crea la cuenta en https://polar.sh y usa primero el entorno de pruebas (sandbox). Los datos fiscales y de cobro se piden para cobrar de verdad.
2. Crea un producto de pago único de 2,99 € con el beneficio "License Keys" (límite de activaciones: 3).
3. Copia el ID de tu organización y el enlace de compra (checkout link). En el enlace de compra pon como página de éxito `https://TU-SITIO.netlify.app/?compra=ok`.
4. En `public/index.html` busca `REEMPLAZA_CON_TU_ENLACE_DE_PAGO_DE_POLAR` y pega tu enlace.
5. Sube esta carpeta a GitHub y conéctala a Netlify (arrastrar y soltar NO sirve: las funciones no se despliegan así).
6. En Netlify → Site configuration → Environment variables añade:
   - `POLAR_ORG_ID` = tu ID de organización
   - `POLAR_API` = `https://sandbox-api.polar.sh/v1` (pruebas) o `https://api.polar.sh/v1` (venta real)
7. Prueba una compra con tarjeta de prueba, pega el código en el juego ("Tengo un código") y comprueba que se abren los 40 niveles.
8. Para vender de verdad: cambia a la cuenta real de Polar, repite los pasos 2–3 y cambia `POLAR_API`.

## Antes de vender
- Rellena los textos legales (política de privacidad, condiciones) y enlázalos.
- Revisa que el nombre del juego no esté registrado por otra persona.
- Si alguien borra los datos del navegador y vuelve a introducir el código, gasta una de sus 3 activaciones; si te escribe, puedes liberarlas desde el panel de Polar.

## Probado aquí (con un Polar simulado, no el real)
Código falso rechazado, código válido desbloquea 6–40, funciona sin conexión, 4.º dispositivo bloqueado, licencia revocada se retira, sin textos de pago en el HTML público, niveles 6, 21 y 40 arrancan. NO probado con Polar real ni con Netlify real ni el sonido o mando en móvil.
