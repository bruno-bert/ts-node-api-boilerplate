import cors from 'cors'
import express from 'express'
import { AddressInfo } from 'net'
const app = express()
app.use(cors())
app.get('/', (req, res) => res.send('Hello Test!'))
const port = process.env.PORT ?? 5000
const server = app.listen(port as number, '0.0.0.0', () => {
  const { port, address } = server.address() as AddressInfo
  console.log('Server listening on:',`http://${address}:${port}`)
})
