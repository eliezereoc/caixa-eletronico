const request = require("supertest");
const server = require("../src/server/server");

const cliente = {
  id: "1",
  nome: "Eliezer de Oliveira Cardoso",
  saldo: "5000",
  saque: "0",
};

const updateCliente = {
  id: "1",
  nome: "Eliezer de Oliveira",
  saldo: "10000",
  saque: "0",
};

describe("Teste de Integração - Cliente", () => {
  test("Resposta status 200 na raiz", async () => {
    const res = await request(server).get("/");
    expect(res.status).toBe(200);
  });

  test("DELETE Cliente", async () => {
    const res = await request(server).delete("/cliente/1");

    expect(res.text).toBe("Cadastro excluido com sucesso!");
    expect(res.status).toBe(200);
  });

  test("POST Cliente", async () => {
    const res = await request(server).post("/cliente").send(cliente);
    expect(res.body.acknowledged).toBe(true);
    expect(res.status).toBe(200);
  });

  test("GET Cliente", async () => {
    const res = await request(server).get("/cliente").send(cliente);

    expect(res.body[0].id).toBe(cliente.id);
    expect(res.body[0].nome).toBe(cliente.nome);
    expect(res.body[0].saldo).toBe(cliente.saldo);
    expect(res.body[0].saque).toBe(cliente.saque);
    expect(res.status).toBe(200);
  });

  test("PUT Cliente", async () => {
    const res = await request(server).put("/cliente").send(updateCliente);

    expect(res.body.acknowledged).toBe(true);
    expect(res.status).toBe(200);
  });

  test("GET update Cliente", async () => {
    const res = await request(server).get("/cliente").send(updateCliente);
    expect(res.body[0].id).toBe(updateCliente.id);
    expect(res.body[0].nome).toBe(updateCliente.nome);
    expect(res.body[0].saldo).toBe(updateCliente.saldo);
    expect(res.body[0].saque).toBe(updateCliente.saque);
    expect(res.status).toBe(200);
  });
});
