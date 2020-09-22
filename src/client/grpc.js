const path = require('path')

const PROTO_PATH = path.join(__dirname, '..', '..', 'protos', 'helloworld.proto');

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
const hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

module.exports = () => {
  const sumClient = new hello_proto.Greeter('localhost:50050',
                                       grpc.credentials.createInsecure());
  const substractClient = new hello_proto.Greeter('localhost:50051',
                                       grpc.credentials.createInsecure());

  return {
    sumNumber: ({ num1, num2 }) => {
      return new Promise(resolve => {
        sumClient.sumNumber({ num1, num2 }, function(err, response) {
          resolve(response)
        })
      })
    },
    substractNumber: ({ num1, num2 }) => {
      return new Promise(resolve => {
        substractClient.substractNumber({ num1, num2 }, function(err, response) {
          resolve(response)
        });
      })
    }
  }
}

