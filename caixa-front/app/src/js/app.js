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
      let restante = valorSaque;
      let valorValido = valorSaque;
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

      if (valorSaque == undefined) {
        $scope.mesnagemSaque = "Informe um valor valodo!";
      } else {
        if (valorSaque > $scope.saldoConta) {
          $scope.mesnagemSaque = "Saldo insuficiente!";
        } else {
          if ($scope.disponivelSaque < valorSaque) {
            $scope.mesnagemSaque = "Saldo do caixa insuficiente!";
          } else {
            //
            valorValido = valorValido % 10;
            if (valorValido != 0) {
              $scope.mesnagemSaque =
                "Informe um valor com notas de R$100, R$50, R$20 e R$10";
            } else {
              //desabilita o botão sacar, limpar, início e habilita botão novo saque,
              //força o usuario a voltar ao inicio para novo saque, garente melhor validção dos dados
              document.getElementById("bt-sacar").style.display = "none";
              document.getElementById("bt-limpar").style.display = "none";
              document.getElementById("bt-inicio").style.display = "none";
              document.getElementById("bt-novosaque").style.display = "block";

              for (let valor of cedulasDisponiveis) {
                const quantidade = Math.floor(restante / valor); //recebe o menor numero inteiro
                if (quantidade === 0) continue; //passa para o proximo valor se o resultado for igual a 0

                //verifica qual o valor da nota e passa a quantidade
                switch (valor) {
                  case 100:
                    //Se a quantidade de notas for maior que a quantidade atual para formar o valor a
                    //ser sacado, passa a quantidad e atualiza o restante
                    //caso seja menor, passa a quantidade de notas que tem no caixa e atualiza o restante
                    //para libera notas de outros valores
                    if (qtdN100 >= quantidade) {
                      $scope.tNotas_saque_100 = quantidade;
                      restante = restante % valor;
                    } else {
                      $scope.tNotas_saque_100 = qtdN100;
                      restante = restante - qtdN100 * valor;
                    }
                    break;
                  case 50:
                    if (qtdN50 >= quantidade) {
                      $scope.tNotas_saque_50 = quantidade;
                      restante = restante % valor;
                    } else {
                      $scope.tNotas_saque_50 = qtdN50;
                      restante = restante - qtdN50 * valor;
                    }
                    break;
                  case 20:
                    if (qtdN20 >= quantidade) {
                      $scope.tNotas_saque_20 = quantidade;
                      restante = restante % valor;
                    } else {
                      $scope.tNotas_saque_20 = qtdN20;
                      restante = restante - qtdN20 * valor;
                    }
                    break;
                  case 10:
                    if (qtdN10 >= quantidade) {
                      $scope.tNotas_saque_10 = quantidade;
                      restante = restante % valor;
                    } else {
                      $scope.tNotas_saque_10 = qtdN10;
                      restante = restante - qtdN10 * valor;
                    }
                    break;
                }
              }

              //multiplica a quantidade de notas pelo valor da nora
              //soma tudo para apresentar o valor sacado
              $scope.valorSacado =
                $scope.tNotas_saque_100 * 100 +
                $scope.tNotas_saque_50 * 50 +
                $scope.tNotas_saque_20 * 20 +
                $scope.tNotas_saque_10 * 10;

              //diminui o valor sacado do saldo da conta
              $scope.saldoConta = $scope.saldoConta - valorSaque;

              //incrementa a quantidade de saques realizados na conta
              $scope.totalSaques = $scope.totalSaques + 1;

              //Decrementa a quantidade de cedulas de cada nota
              qtdN100 = qtdN100 - $scope.tNotas_saque_100;
              qtdN50 = qtdN50 - $scope.tNotas_saque_50;
              qtdN20 = qtdN20 - $scope.tNotas_saque_20;
              qtdN10 = qtdN10 - $scope.tNotas_saque_10;

              //Atualiza quantidade de notas de cada valor após o saque
              $scope.tn100 = qtdN100;
              $scope.tn50 = qtdN50;
              $scope.tn20 = qtdN20;
              $scope.tn10 = qtdN10;

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
