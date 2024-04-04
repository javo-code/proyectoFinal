export const info = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API ecommerce Nueva Medicina Internacion Domiciliaria",
      version: "1.0.0",
      description: "API para la venta de productos descartables de salud",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["./src/docs/*.yml"],
};