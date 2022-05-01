let id_cliente = 0;

let qtdN100 = 0;
let qtdN50 = 0;
let qtdN20 = 0;
let qtdN10 = 0;

let caixaEletronico = angular.module("caixaEletronico", [
  "ngRoute",
  "caixaEletronico.services",
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

    $locationProvider.html5Mode(true);
  },
]);

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

caixaEletronico.controller("SaqueCtrl", [
  "$scope",
  "caixaEleFactory",
  function ($scope, caixaEleFactory) {
    let cxCollection = new caixaEleFactory();

    $scope.tNotas_saque_100 = 0;
    $scope.tNotas_saque_50 = 0;
    $scope.tNotas_saque_20 = 0;
    $scope.tNotas_saque_10 = 0;

    //Consulta notas disponiveis
    cxCollection.getValueCaixa().then(function () {
      qtdN100 = cxCollection.valueCaixa.qtdN100;
      qtdN50 = cxCollection.valueCaixa.qtdN50;
      qtdN20 = cxCollection.valueCaixa.qtdN20;
      qtdN10 = cxCollection.valueCaixa.qtdN10;

      if (qtdN100) $scope.tNotas100 = "R$100";
      if (qtdN50) $scope.tNotas50 = "R$50";
      if (qtdN20) $scope.tNotas20 = "R$20";
      if (qtdN10) $scope.tNotas10 = "R$10";
      $scope.qtdCedulas = qtdN100 + qtdN50 + qtdN20 + qtdN10;
    });

    //consulta dados do cliente
    cxCollection.getCliente(id_cliente).then(function () {
      $scope.nomeCliente = cxCollection.cliente.nome;
      $scope.saldoConta = cxCollection.cliente.saldo;
      $scope.tatalSaques = cxCollection.cliente.saque;
    });

    //realiza o saque
    $scope.sacaValor = function (valorSaque) {
      let resto = valorSaque;
      const cedulasDisponiveis = [];

      //monta array com celeulas disponiveis
      if (qtdN100) {
        // $scope.tNotas100 = "R$100";
        cedulasDisponiveis.push(100);
      }
      if (qtdN50) {
        // $scope.tNotas50 = "R$50";
        cedulasDisponiveis.push(50);
      }
      if (qtdN20) {
        // $scope.tNotas20 = "R$20";
        cedulasDisponiveis.push(20);
      }
      if (qtdN10) {
        // $scope.tNotas10 = "R$10";
        cedulasDisponiveis.push(10);
      }

      $scope.qtdCedulas = qtdN100 + qtdN50 + qtdN20 + qtdN10;

      $scope.tNotas_saque_100 = 0;
      $scope.tNotas_saque_50 = 0;
      $scope.tNotas_saque_20 = 0;
      $scope.tNotas_saque_10 = 0;
      $scope.mesnagemSaque = "";

      console.log(cedulasDisponiveis);

      if (valorSaque == undefined) {
        $scope.mesnagemSaque = "Informe um valor valodo!";
      } else {
        if (valorSaque > $scope.saldoConta) {
          $scope.mesnagemSaque = "Saldo insuficiente!";
        } else {
          for (let valor of cedulasDisponiveis) {
            const quantidade = Math.floor(resto / valor); //recebe o menor numero inteiro
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

            resto = resto % valor;
          }

          $scope.valorSacado =
            $scope.tNotas_saque_100 * 100 +
            $scope.tNotas_saque_50 * 50 +
            $scope.tNotas_saque_20 * 20 +
            $scope.tNotas_saque_10 * 10;

          $scope.saldoConta = $scope.saldoConta - valorSaque;
          $scope.tatalSaques = $scope.tatalSaques + 1;

          $scope.mesnagemSaque = `Saque de R$${$scope.valorSacado} realizado com sucesso!`;
        }
      }
    };
  },
]);

caixaEletronico.controller("ExtratoCtrl", [
  "$scope",
  "caixaEleFactory",
  function ($scope, caixaEleFactory) {
    let cxCollection = new caixaEleFactory();
    cxCollection.getCliente().then(function (response) {
      $scope.nomeCliente = cxCollection.cliente[0].nome;
      $scope.saldoConta = cxCollection.cliente[0].saldoConta;
      $scope.tatalSaques = cxCollection.cliente[0].qtdSaque;
    });
  },
]);
