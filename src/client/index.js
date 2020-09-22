const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const app = new Koa()
app.use(bodyParser())

const methods = require('./grpc')()

app.use(async ctx => {
  let response
  switch(ctx.method) {
    case 'POST':
      const { body } = ctx.request
      if (body.action === 'sum') {
        response = await methods.sumNumber({ num1: body.num1, num2: body.num2 })
      } else if (body.action === 'substract') {
        response = await methods.substractNumber({ num1: body.num1, num2: body.num2 })
      }
      break
    default:
      response = { message: 'method not supported' }
  }
  ctx.body = JSON.stringify(response)
})

app.listen(3000)

