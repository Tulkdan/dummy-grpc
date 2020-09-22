# Dummy example with grpc

This project has to purpose for learning how to implement grpc (in a bad way maybe?),

### How to run

You need to install dependencies with `npm i`

Then you need to run the "microservice" that sum numbers with: `node src/server/sum.js`

And run the "microservice" that subtracts numbers with: `node src/server/substraction.js`

Then you need to run the server to receive http request with: `node src/client/index.js`

To check how if it's running, it is only accepting this two requests:

```sh
curl localhost:3000 -H "Content-Type: application/json" -d '{"action": "sum", "num1": 2, "num2": 3}'

curl localhost:3000 -H "Content-Type: application/json" -d '{"action": "substract", "num1": 2, "num2": 3}'
```

