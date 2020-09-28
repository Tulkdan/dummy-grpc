const path = require('path')

const PORT = '50053'
const PROTO_PATH = path.join(__dirname, '..', '..', 'protos', 'calculate.proto');

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
const hello_proto = grpc.loadPackageDefinition(packageDefinition).Calculations;

const multiplyNumbers = (call, callback) => {
  const { num1, num2 } = call.request
  const result = num1 * num2
  callback(null, { result })
}

const main = () => {
  const server = new grpc.Server();
  server.addService(hello_proto.Greeter.service, { calculate: multiplyNumbers });

  console.log(`server started at 0.0.0.0:${PORT}`)

  server.bind(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure());
  server.start();
}

main()

