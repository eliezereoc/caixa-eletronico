let id_cliente = 0;

let qtdN100 = 0;
let qtdN50 = 0;
let qtdN20 = 0;
let qtdN10 = 0;

let caixaEletronico = angular.module("caixaEletronico", [
  "ngRoute",
  "caixa.services",
  "cliente.services",
]);

caixaEletronico.config([
  "$routeProvider",
  "$locationProvider",
  function ($routeProvider, $locationProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "home.html",
        controller: "HomeCtrl",
      })
      .when("/extrato", {
        templateUrl: "extrato.html",
        controller: "ExtratoCtrl",
      })
      .when("/saque", {
        templateUrl: "saque.html",
        controller: "SaqueCtrl",
      })
      .otherwise({ redirectTo: "/" });

    // $locationProvider.html5Mode(true);
    $locationProvider.html5Mode(true).hashPrefix("*");
  },
]);

/**************************************/
/* Pagina Home                        */
/**************************************/
caixaEletronico.controller("HomeCtrl", [
  "$scope",
  function ($scope) {
    $scope.title_a = "Bem-Vindo ao";
    $scope.title_b = "Credit Bank";
    $scope.nomeCliente = " Eliézer O. Cardoso";
    $scope.recebeID = function (id = 0) {
      id_cliente = id;
    };
  },
]);

/**************************************/
/* Pagina Saque                       */
/**************************************/
caixaEletronico.controller("SaqueCtrl", [
  "$scope",
  "caixaFactory",
  "clienteFactory",
  function ($scope, caixaFactory, clienteFactory) {
    let caixaCollection = new caixaFactory();
    let clienteCollection = new clienteFactory();

    $scope.tNotas_saque_100 = 0;
    $scope.tNotas_saque_50 = 0;
    $scope.tNotas_saque_20 = 0;
    $scope.tNotas_saque_10 = 0;

    /**************************************/
    /* GET caixa                          */
    /**************************************/
    caixaCollection.getValueCaixa().then(function () {
      //passa a quantidade de cedulas de cada valor
      ///ex.: 10 notas de R$100,00
      qtdN100 = caixaCollection.valueCaixa.qtdN100;
      qtdN50 = caixaCollection.valueCaixa.qtdN50;
      qtdN20 = caixaCollection.valueCaixa.qtdN20;
      qtdN10 = caixaCollection.valueCaixa.qtdN10;

      //mostra quais notas estão disponiveis
      if (qtdN100) $scope.tNotas100 = "R$100";
      if (qtdN50) $scope.tNotas50 = "R$50";
      if (qtdN20) $scope.tNotas20 = "R$20";
      if (qtdN10) $scope.tNotas10 = "R$10";

      //mostra a soma de todas as notas disponiveis
      $scope.qtdCedulas = qtdN100 + qtdN50 + qtdN20 + qtdN10;
    });

    /**************************************/
    /* GET Cliente                        */
    /**************************************/
    clienteCollection.getCliente(id_cliente).then(function () {
      $scope.nomeCliente = clienteCollection.cliente.nome;
      $scope.saldoConta = clienteCollection.cliente.saldo;
      $scope.totalSaques = clienteCollection.cliente.saque;
    });

    /**************************************/
    /* Realiza o saque                    */
    /**************************************/
    $scope.sacaValor = function (valorSaque) {
      let valorASerSacado = valorSaque;
      const cedulasDisponiveis = [];

      //monta array com celeulas disponiveis
      if (qtdN100) cedulasDisponiveis.push(100);
      if (qtdN50) cedulasDisponiveis.push(50);
      if (qtdN20) cedulasDisponiveis.push(20);
      if (qtdN10) cedulasDisponiveis.push(10);

      $scope.tNotas_saque_100 = 0;
      $scope.tNotas_saque_50 = 0;
      $scope.tNotas_saque_20 = 0;
      $scope.tNotas_saque_10 = 0;
      $scope.mesnagemSaque = "";

      // console.log(cedulasDisponiveis);

      if (valorSaque == undefined) {
        $scope.mesnagemSaque = "Informe um valor valodo!";
      } else {
        if (valorSaque > $scope.saldoConta) {
          $scope.mesnagemSaque = "Saldo insuficiente!";
        } else {
          document.getElementById("bt-sacar").disabled = true;

          for (let valor of cedulasDisponiveis) {
            const quantidade = Math.floor(valorASerSacado / valor); //recebe o menor numero inteiro
            if (quantidade === 0) continue; //passa para o proximo valor se o resultado for igual a 0

            switch (valor) {
              case 100:
                $scope.tNotas_saque_100 = quantidade;
                break;
              case 50:
                $scope.tNotas_saque_50 = quantidade;
                break;
              case 20:
                $scope.tNotas_saque_20 = quantidade;
                break;
              case 10:
                $scope.tNotas_saque_10 = quantidade;
                break;
            }
            valorASerSacado = valorASerSacado % valor;
          }

          $scope.valorSacado =
            $scope.tNotas_saque_100 * 100 +
            $scope.tNotas_saque_50 * 50 +
            $scope.tNotas_saque_20 * 20 +
            $scope.tNotas_saque_10 * 10;

          $scope.saldoConta = $scope.saldoConta - valorSaque;
          $scope.totalSaques = $scope.totalSaques + 1;

          qtdN100 = qtdN100 - $scope.tNotas_saque_100;
          qtdN50 = qtdN50 - $scope.tNotas_saque_50;
          qtdN20 = qtdN20 - $scope.tNotas_saque_20;
          qtdN10 = qtdN10 - $scope.tNotas_saque_10;

          $scope.qtdCedulas = qtdN100 + qtdN50 + qtdN20 + qtdN10;

          $scope.mesnagemSaque = `Saque de R$${$scope.valorSacado} realizado com sucesso!`;

          clienteCollection
            .putCliente(
              id_cliente,
              $scope.nomeCliente,
              $scope.saldoConta,
              $scope.totalSaques
            )
            .then(function () {});
        }
      }
    };
  },
]);

/**************************************/
/* Pagina Extrato                     */
/**************************************/
caixaEletronico.controller("ExtratoCtrl", [
  "$scope",
  "clienteFactory",
  function ($scope, clienteFactory) {
    let clienteCollection = new clienteFactory();
    clienteCollection.getCliente(id_cliente).then(function (response) {
      $scope.nomeCliente = clienteCollection.cliente.nome;
      $scope.saldoConta = clienteCollection.cliente.saldo;
      $scope.totalSaques = clienteCollection.cliente.saque;
    });
  },
]);
