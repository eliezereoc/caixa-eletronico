export const swaggerDocument = {
  swagger: "2.0",
  info: {
    description: "API de cadastro de usuarios.",
    version: "1.0.0",
    title: "CAD USER API",
  },
  host: "localhost:3000",
  tags: [
    {
      name: "Usuários",
      description: "Gerenciamento de usuários",
    },
  ],
  paths: {
    "/user": {
      post: {
        tags: ["user"],
        summary: "Create a new user",
        description: "Create a new user with the received parameters",
        consumes: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "body",
            description: "User object",
            required: true,
            schema: {
              $ref: "#/definitions/User",
            },
          },
        ],
        responses: {
          200: {
            description: "User created",
          },
          400: {
            description: "Error occurred",
          },
        },
      },
      get: {
        tags: ["user"],
        summary: "Get existing users",
        description: "Get existing user description",
        produces: ["application/json"],
        responses: {
          200: {
            description: "successful operation",
            schema: {
              type: "array",
              items: {
                $ref: "#/definitions/User",
              },
            },
          },
          400: {
            description: "Error occurred",
          },
        },
      },
      put: {
        tags: ["user"],
        summary: "Updated user",
        description: "Atualiza um usuário",
        operationId: "updateUser",
        produces: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "body",
            description: "Objeto do usuário atualizado.",
            required: true,
            schema: {
              $ref: "#/definitions/UserPut",
            },
          },
        ],
        responses: {
          200: {
            description: "Retorna o usuário atualizado",
            schema: {
              $ref: "#/definitions/UserPutRes",
            },
          },
          400: {
            description: "Registro não encontrado.",
          },
        },
      },
    },

    "/user/{id}": {
      get: {
        tags: ["user"],
        summary: "Find user by ID",
        description: "Returns a single user",
        produces: ["application/json"],
        parameters: [
          {
            name: "id",
            in: "path",
            description: "User ID.",
            required: true,
            type: "integer",
          },
        ],
        responses: {
          200: {
            description: "Successful operation",
          },
          400: {
            description: "Error occurred",
          },
        },
      },
      delete: {
        tags: ["user"],
        summary: "Deletes a user",
        description: "Deletes user by id",
        produces: ["application/json"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: false,
            type: "integer",
          },
        ],
        responses: {
          200: {
            description: "Successful operation",
          },
          404: {
            description: "Error occurred",
          },
        },
      },
    },

    "/user/updatePass": {
      patch: {
        tags: ["updatePass"],
        summary: "Update user password",
        description: "Atualiza senho do usuário",
        operationId: "updatePass",
        produces: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "body",
            description: "Objeto do usuário atualizado.",
            required: true,
            schema: {
              $ref: "#/definitions/UserPatch",
            },
          },
        ],
        responses: {
          200: {
            description: "Retorna o usuário atualizado",
            schema: {
              $ref: "#/definitions/UserPutRes",
            },
          },
          400: {
            description: "Registro não encontrado.",
          },
        },
      },
    },
  },
  definitions: {
    User: {
      type: "object",
      properties: {
        name: {
          type: "string",
          example: "Eliezer de Oliveira",
        },
        email: {
          type: "string",
          example: "eliezer@gmail.com",
        },
        pass: {
          type: "number",
          example: 123456,
        },
      },
    },
    UserPut: {
      type: "object",
      properties: {
        id: {
          type: "number",
          example: null,
        },
        name: {
          type: "string",
          example: "",
        },
        email: {
          type: "string",
          example: "",
        },
        pass: {
          type: "number",
          example: null,
        },
      },
    },
    UserPutRes: {
      type: "object",
      properties: {
        id: {
          type: "number",
          example: 1,
        },
        name: {
          type: "string",
          example: "Eliezer de Oliveira",
        },
      },
    },
    UserPatch: {
      type: "object",
      properties: {
        id: {
          type: "number",
          example: 1,
        },
        pass: {
          type: "number",
          example: 123456,
        },
      },
    },
  },
};
