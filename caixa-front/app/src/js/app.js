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

      //quantidade de notas de cada valor
      $scope.tn100 = qtdN100;
      $scope.tn50 = qtdN50;
      $scope.tn20 = qtdN20;
      $scope.tn10 = qtdN10;

      //mostra quais notas estão disponiveis
      if (qtdN100) $scope.tNotas100 = "R$100";
      if (qtdN50) $scope.tNotas50 = "R$50";
      if (qtdN20) $scope.tNotas20 = "R$20";
      if (qtdN10) $scope.tNotas10 = "R$10";

      //mostra a soma de todas as notas disponiveis
      $scope.qtdCedulas = qtdN100 + qtdN50 + qtdN20 + qtdN10;

      //mostra o saldo do caixa disponivel para saque
      $scope.disponivelSaque =
        qtdN100 * 100 + qtdN50 * 50 + qtdN20 * 20 + qtdN10 * 10;
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
      let resto = valorSaque;

      $scope.tNotas_saque_100 = 0;
      $scope.tNotas_saque_50 = 0;
      $scope.tNotas_saque_20 = 0;
      $scope.tNotas_saque_10 = 0;
      $scope.mesnagemSaque = "";

      if (valorSaque == undefined) {
        $scope.mesnagemSaque = "Informe um valor valodo!";
      } else {
        if (valorSaque > $scope.saldoConta) {
          $scope.mesnagemSaque = "Saldo insuficiente!";
        } else {
          if ($scope.disponivelSaque < valorSaque) {
            $scope.mesnagemSaque = "Saldo do caixa insuficiente!";
          } else {
            //realiza o saque

            document.getElementById("bt-sacar").disabled = true;

            if (qtdN100 && resto >= 100) {
              const quantidade = Math.floor(valorSaque / 100);
              if (quantidade >= qtdN100) {
                resto = valorSaque - qtdN100 * 100;
                valorSaque = resto;
                $scope.tNotas_saque_100 = qtdN100;
                qtdN100 = 0;
                valorSaque = resto;
              } else {
                resto = valorSaque - quantidade * 100;
                valorSaque = resto;
                qtdN100 = qtdN100 - quantidade;
                $scope.tNotas_saque_100 = quantidade;
              }
              $scope.tn100 = qtdN100; //Atualiza quantidade de notas
            }

            if (qtdN50 && resto >= 50) {
              const quantidade = Math.floor(valorSaque / 50);
              if (quantidade >= qtdN50) {
                resto = valorSaque - qtdN50 * 50;
                $scope.tNotas_saque_50 = qtdN50;
                qtdN50 = 0;
                valorSaque = resto;
              } else {
                resto = valorSaque - quantidade * 50;
                valorSaque = resto;
                qtdN50 = qtdN50 - quantidade;
                $scope.tNotas_saque_50 = quantidade;
              }
              $scope.tn50 = qtdN50; //Atualiza quantidade de notas
            }

            if (qtdN20 && resto >= 20) {
              const quantidade = Math.floor(valorSaque / 20);

              if (quantidade >= qtdN20) {
                resto = valorSaque - qtdN20 * 20;
                $scope.tNotas_saque_20 = qtdN20;
                qtdN20 = 0;
                valorSaque = resto;
              } else {
                resto = valorSaque - quantidade * 20;
                valorSaque = resto;
                qtdN20 = qtdN20 - quantidade;
                $scope.tNotas_saque_20 = quantidade;
              }
              $scope.tn20 = qtdN20; //Atualiza quantidade de notas
            }

            if (qtdN10 && resto >= 10) {
              const quantidade = Math.floor(valorSaque / 10);
              if (quantidade >= qtdN10) {
                resto = valorSaque - qtdN10 * 10;
                $scope.tNotas_saque_10 = qtdN10;
                qtdN10 = 0;
                valorSaque = resto;
              } else {
                resto = valorSaque - quantidade * 10;
                valorSaque = resto;
                qtdN10 = qtdN10 - quantidade;
                $scope.tNotas_saque_10 = quantidade;
              }
              $scope.tn10 = qtdN10; //Atualiza quantidade de notas
            }

            //multiplica a quantidade de notas pelo valor da nota
            //soma tudo para apresentar o valor total sacado
            $scope.valorSacado =
              $scope.tNotas_saque_100 * 100 +
              $scope.tNotas_saque_50 * 50 +
              $scope.tNotas_saque_20 * 20 +
              $scope.tNotas_saque_10 * 10;

            //diminui o valor sacado do saldo da conta
            $scope.saldoConta = $scope.saldoConta - $scope.valorSacado;

            //incrementa a quantidade de saques realizados na conta
            $scope.totalSaques = $scope.totalSaques + 1;

            //soma a quantidade de cada cedulas para saber o total de notas disponiveis
            $scope.qtdCedulas = qtdN100 + qtdN50 + qtdN20 + qtdN10;

            //Mensagem de saque bem sucedido e com o valor
            $scope.mesnagemSaque = `Saque de R$${$scope.valorSacado} realizado com sucesso!`;

            //Atualiza saldo disponivel (do caixa)
            $scope.disponivelSaque =
              $scope.disponivelSaque - $scope.valorSacado;

            //Atualiza o saldo da conta do cliente
            clienteCollection
              .putCliente(
                id_cliente,
                $scope.nomeCliente,
                $scope.saldoConta,
                $scope.totalSaques
              )
              .then(function () {});

            // Atualiza o saldo de notas do caixa
            caixaCollection
              .putCaixa(id_cliente, qtdN100, qtdN50, qtdN20, qtdN10)
              .then(function () {});
          }
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
