import swaggerJSDoc from "swagger-jsdoc"; // read JSDoc comments and Converts into Swagger format

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Medical Store API",
      version: "1.0.0"
    }
  },
  apis: ["./routes/*.js"] // Go to routes folder, Read Swagger comments from all .js files
};

export default swaggerJSDoc(options);