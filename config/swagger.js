import swaggerJSDoc from "swagger-jsdoc"; // read JSDoc comments and Converts into Swagger format

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Medical Store API",
      version: "1.0.0"
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      },
      schemas: {
        Medicine: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "65f1a2b3c4d5e6f789012345"
            },
            name: {
              type: "string",
              example: "Paracetamol"
            },
            manufacturer: {
              type: "string",
              example: "Cipla"
            },
            price: {
              type: "number",
              example: 50
            },
            quantity: {
              type: "number",
              example: 20
            },
            expiryDate: {
              type: "string",
              format: "date",
              example: "2026-12-31"
            },
            category: {
              type: "string",
              example: "Tablet"
            },
            lowStockThreshold: {
              type: "number",
              example: 5
            }
          }
        }
      }
    }

  },
  apis: ["./routes/*.js"] // Go to routes folder, Read Swagger comments from all .js files
};



export default swaggerJSDoc(options);