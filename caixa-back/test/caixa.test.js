const request = require("supertest");
const server = require("../src/server/server");

const caixa = {
  id: "1",
  qtdN100: 130,
  qtdN50: 35,
  qtdN20: 120,
  qtdN10: 80,
};

const updateCaixa = {
  id: "1",
  qtdN100: 5,
  qtdN50: 20,
  qtdN20: 8,
  qtdN10: 3,
};

describe("Teste de Integração - Caixa", () => {
  test("DELETE Caixa", async () => {
    const res = await request(server).delete("/caixa/1");

    expect(res.text).toBe("Cadastro excluido com sucesso!");
    expect(res.status).toBe(200);
  });

  test("POST Caixa", async () => {
    const res = await request(server).post("/caixa").send(caixa);
    expect(res.body.acknowledged).toBe(true);
    expect(res.status).toBe(200);
  });

  test("GET Caixa", async () => {
    const res = await request(server).get("/caixa").send(caixa);

    expect(res.body[0].id).toBe(caixa.id);
    expect(res.body[0].qtdN100).toBe(caixa.qtdN100);
    expect(res.body[0].qtdN50).toBe(caixa.qtdN50);
    expect(res.body[0].qtdN20).toBe(caixa.qtdN20);
    expect(res.body[0].qtdN10).toBe(caixa.qtdN10);
    expect(res.status).toBe(200);
  });

  test("PUT Caixa", async () => {
    const res = await request(server).put("/caixa").send(updateCaixa);

    expect(res.body.acknowledged).toBe(true);
    expect(res.status).toBe(200);
  });

  test("GET update Caixa", async () => {
    const res = await request(server).get("/caixa").send(updateCaixa);
    expect(res.body[0].id).toBe(updateCaixa.id);
    expect(res.body[0].qtdN100).toBe(updateCaixa.qtdN100);
    expect(res.body[0].qtdN50).toBe(updateCaixa.qtdN50);
    expect(res.body[0].qtdN20).toBe(updateCaixa.qtdN20);
    expect(res.body[0].qtdN10).toBe(updateCaixa.qtdN10);
    expect(res.status).toBe(200);
  });
});
