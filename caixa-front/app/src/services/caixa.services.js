let servicesCaixa = angular.module("caixa.services", []);

servicesCaixa.factory("caixaFactory", [
  "$http",
  function ($http) {
    let caixaCollection = function () {
      let valueCaixa = [];
    };

    caixaCollection.prototype.getValueCaixa = function () {
      let self = this;
      const url = `http://localhost:3000/caixa/1`;
      // const url = `src/services/caixaEletronico.json`;
      return $http.get(url).then(
        function (response) {
          self.valueCaixa = response.data[0];
          caixaCollection.valueCaixa = response.data[0];

          // console.log(response.data[0]);

          return response;
        },
        function (response) {
          console.log("Erro...");
          return response;
        }
      );
    };

    caixaCollection.prototype.putCaixa = function (
      id,
      qtdN100,
      qtdN50,
      qtdN20,
      qtdN10
    ) {
      const url = `http://localhost:3000/caixa/`;

      const data = {
        id: id.toString(),
        qtdN100: parseInt(qtdN100),
        qtdN50: parseInt(qtdN50),
        qtdN20: parseInt(qtdN20),
        qtdN10: parseInt(qtdN10),
      };

      return $http.put(url, data).then(
        function (response) {
          return response;
        },
        function (response) {
          console.log("Erro...");
          return response;
        }
      );
    };

    return caixaCollection;
  },
]);
