import 'module-alias/register'
import app from './config/app'

app.get('/', (req, res) => {
  res.send('Hello Test')
})

const port = process.env.PORT ?? 5000
app.listen(port as number, 'localhost', () => {
  console.log('Server listening on',`http://localhost:${port}`)
})
