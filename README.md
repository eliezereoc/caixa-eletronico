# caixa-eletronico

## MongoDB Compass

> Version 1.31.2 - [MongoDB](https://www.mongodb.com/)

    HOST: localhost:27017

---

## Back-Ent (caixa-back)

> NodeJs v16.13.1 - [NodeJs](https://nodejs.org/en/)

> Começando

    ./caixa-back
        - npm install

        - Execute npm test (Testa as rotas e popula as tabelas)

        - npm start (para subir a aplicação)

        - Servidor sera executo em http://localhost:3000

---

## Front-Ent (caixa-front)

> Angular 1.6 - [AngularJs](https://angularjs.org/)

> Começando

    ./caixa-front
        - npm install

        - npm start

        - Servidor sera executo em http://localhost:8000

---

<p style="font-size: 15px" >
    A aplicação utiliza um único cadastro para exemplo.
    O botão extrato apresenta o saldo da conta do cliente.
    O botão extrato vai para pagina de extrato. Nessa pagina é apresentado o número de notas e valor do caixa e o saldo da conta da conta do cliente.
    Informe o valor desejado no campo VALOR e clique em sacar.
    Após o saque, a aplicação atualiza com os novos valores e para realizar novo saque basta clicar no botão NOVO SAQUE.
</p>

<p style="font-size: 15px" >
    Validações.
    A Aplicação valida número de notas disponíveis e saldo do caixa, valor do saldo do cliente, se não for inserido valor e caso seja informado um valor com resto menor que R$10,00
</p>

<p style="font-size: 15px" >
    Caso queira aumentar o saldo do caixa e assim testar o saldo disponível do cliente, basta editar o arquivo em “./caixa-back/test/caixa.test.js”, e no objeto updateCaixa altere as quantidades de notas e excute o teste novamente “npm test”.
    Assim, será possível realizar saques na conta sem zerar o saldo do caixa.
</p>

    const updateCaixa = {
        id: "1",
        qtdN100: 500,
        qtdN50: 20,
        qtdN20: 8,
        qtdN10: 3,
    };

<p style="font-size: 15px" >
    A pasta utils/postman contem os arquivos caso queira realizar teste atraves do mesmo.
</p>
