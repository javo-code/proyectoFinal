export const info = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API ecommerce",
      version: "1.0.0",
      description: "API para la venta de produtctos descartables de medicina",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["./src/docs/*.yml"],
};