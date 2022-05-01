let servicesCaixa = angular.module("caixa.services", []);

servicesCaixa.factory("caixaFactory", [
  "$http",
  function ($http) {
    let caixaCollection = function () {
      let valueCaixa = [];
    };

    caixaCollection.prototype.getValueCaixa = function () {
      let self = this;

      const url = `http://localhost:3000/caixa`;
      // const url = `src/services/caixaEletronico.json`;

      return $http.get(url).then(
        function (response) {
          self.valueCaixa = response.data[0].caixa;
          caixaCollection.valueCaixa = response.data[0].caixa;

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
