# MongoMart

Frontend de tienda desarrollada con Angular 21, Tailwind CSS y DaisyUI.



En `http://localhost:4200/` se encuentra la página principal que muestra promociones y secciones de tecnología y frutas y verduras; el catálogo completo está en `/products`.

Cada producto tiene una página de detalle en `/products/:id`. El carrito se encuentra en `/cart`; conserva sus artículos mientras la aplicación está abierta y admite un artículo de cada producto, sin control de cantidades. El proceso de pago aún no está implementado.

Los productos de demostración se mantienen en `src/app/services/product.service.ts` como datos locales de TypeScript. La aplicación aún no se conecta a un backend como Node.js.
