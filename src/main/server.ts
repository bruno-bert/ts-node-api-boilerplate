import 'module-alias/register'
import { resolve } from 'path'
import cors from 'cors'
import { serve, setup } from 'swagger-ui-express'
import express from 'express'
import { AddressInfo } from 'net'
import swaggerConfig from '@/main/docs'
const app = express()

app.use(cors())
app.use('/docs', serve, setup(swaggerConfig))
app.use('/static', express.static(resolve(__dirname, '../static')))

app.get('/', (req, res) => res.send('Hello Test!'))

const port = process.env.PORT ?? 5000
const server = app.listen(port as number, '0.0.0.0', () => {
  const { port, address } = server.address() as AddressInfo
  console.log('Server listening on:',`http://${address}:${port}`)
})
