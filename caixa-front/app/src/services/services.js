let services = angular.module("caixaEletronico.services", []);

services.factory("caixaEleFactory", [
  "$http",
  function ($http) {
    let cxCollection = function () {
      let cliente = [];
      let valueCaixa = [];
    };

    cxCollection.prototype.getCliente = function (id) {
      let self = this;
      const url = `http://localhost:3000/cliente/${id}`;
      // const url = `src/services/caixaEletronico.json`;

      return $http.get(url).then(
        function (response) {
          self.cliente = response.data[0];
          cxCollection.cliente = response.data[0];

          return response;
        },
        function (response) {
          console.log("Erro...");
          return response;
        }
      );
    };

    cxCollection.prototype.getValueCaixa = function () {
      let self = this;

      const url = `http://localhost:3000/caixa`;
      // const url = `src/services/caixaEletronico.json`;

      return $http.get(url).then(
        function (response) {
          self.valueCaixa = response.data[0].caixa;
          cxCollection.valueCaixa = response.data[0].caixa;

          return response;
        },
        function (response) {
          console.log("Erro...");
          return response;
        }
      );
    };
    return cxCollection;
  },
]);
