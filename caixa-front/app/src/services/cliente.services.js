let servicesCliente = angular.module("cliente.services", []);

servicesCliente.factory("clienteFactory", [
  "$http",
  function ($http) {
    let clienteCollection = function () {
      let cliente = [];
    };

    clienteCollection.prototype.getCliente = function (id) {
      let self = this;
      const url = `http://localhost:3000/cliente/${id}`;
      // const url = `src/services/caixaEletronico.json`;

      return $http.get(url).then(
        function (response) {
          self.cliente = response.data[0];
          clienteCollection.cliente = response.data[0];
          return response;
        },
        function (response) {
          console.log("Erro...");
          return response;
        }
      );
    };

    clienteCollection.prototype.putCliente = function (id, nome, saldo, saque) {
      const url = `http://localhost:3000/cliente/`;

      const data = {
        id: id.toString(),
        nome: nome.toString(),
        saldo: saldo.toString(),
        saque: parseInt(saque),
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

    return clienteCollection;
  },
]);
