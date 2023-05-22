import fs from 'fs'
import jsonServer from 'json-server'
import https from 'https-localhost'

// 둘다 익스프레스인데.. 어떻게 못합치나..?
const httpsLocalhost = https()

const router = jsonServer.router('server/db.json')
await httpsLocalhost.getCerts()

const server = jsonServer.create({
  key: fs.readFileSync('/home/sp/.config/https-localhost/localhost.key'),
  cert: fs.readFileSync('/home/sp/.config/https-localhost/localhost.crt'),
})
const middleware = jsonServer.defaults()

server.use(middleware)
server.use(router)
server.listen(443, () => {
  console.log('JSON Server is running')
})
