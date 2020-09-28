const path = require('path')
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = path.join(__dirname, '..', '..', 'protos', 'calculate.proto');

const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
const calculate_proto = grpc.loadPackageDefinition(packageDefinition).Calculations;

module.exports = () => {
  const sumClient = new calculate_proto.Greeter('localhost:50050',
                                       grpc.credentials.createInsecure());
  const substractClient = new calculate_proto.Greeter('localhost:50051',
                                       grpc.credentials.createInsecure());
  const divisionClient = new calculate_proto.Greeter('localhost:50052',
                                       grpc.credentials.createInsecure());
  const multiplicationClient = new calculate_proto.Greeter('localhost:50053',
                                       grpc.credentials.createInsecure());

  return {
    sumNumber: ({ num1, num2 }) => {
      return new Promise(resolve => {
        sumClient.calculate({ num1, num2 }, function(err, response) {
          resolve(response)
        })
      })
    },
    substractNumber: ({ num1, num2 }) => {
      return new Promise(resolve => {
        substractClient.calculate({ num1, num2 }, function(err, response) {
          resolve(response)
        });
      })
    },
    divideNumber: ({ num1, num2 }) => {
      return new Promise(resolve => {
        divisionClient.calculate({ num1, num2 }, function(err, response) {
          resolve(response)
        })
      })
    },
    multiplyNumber: ({ num1, num2 }) => {
      return new Promise(resolve => {
        multiplicationClient.calculate({ num1, num2 }, function(err, response) {
          resolve(response)
        });
      })
    }
  }
}

