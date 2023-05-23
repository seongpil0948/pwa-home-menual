// import fs from 'fs'
// import https from 'https-localhost'
import fs from 'fs'
import jsonServer from 'json-server'
import MiniSearch from 'minisearch'

// 둘다 익스프레스인데.. 어떻게 못합치나..?
// const httpsLocalhost = https()
const DB_PATH = 'server/db.json'
const server = jsonServer.create({
  // key: fs.readFileSync('/home/sp/.config/https-localhost/localhost.key'),
  // cert: fs.readFileSync('/home/sp/.config/https-localhost/localhost.crt'),
})
const router = jsonServer.router(DB_PATH)
const middleware = jsonServer.defaults()
// await httpsLocalhost.getCerts()
server.use(jsonServer.bodyParser)
server.use(middleware)

const ID_FIELD = 'id'
const FIELD_LIST = [ID_FIELD, 'title', 'content']
const postSearch = new MiniSearch({
  fields: FIELD_LIST,
  storeFields: FIELD_LIST,
  idField: ID_FIELD,
})

// server.use((req, res, next) => {
//   console.log('in middleware')
//   if (req.method === 'POST')
//     req.body.createdAt = Date.now()
//   // Continue to JSON Server router
//   next()
// })

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})

server.get('/posts/search/:word', (req, res) => {
  const buff = fs.readFileSync(DB_PATH)
  const data = JSON.parse(buff)
  postSearch.removeAll()
  postSearch.addAll(data.posts)
  console.log('search word: ', req.params.word)
  res.jsonp(postSearch.search(req.params.word).reduce((acc, val) => {
    const serialized = {}
    for (let i = 0; i < FIELD_LIST.length; i++)
      serialized[FIELD_LIST[i]] = val[FIELD_LIST[i]]

    acc.push(serialized)
    return acc
  }, []))
})
server.get('/posts/search', (req, res) => {
  const buff = fs.readFileSync(DB_PATH)
  const data = JSON.parse(buff)
  postSearch.removeAll()
  postSearch.addAll(data.posts)
  const word = req.query.word
  console.info('search word: ', word)
  const result = postSearch.autoSuggest(word)

  res.jsonp(result.reduce((acc, val) => {
    const keywords = val.suggestion.split(' ').map(x => x.trim())
    return [...acc, ...keywords]
  }, []))
})
server.use(router)
// server.listen(443, () => {
server.listen(3000, () => {
  // console.log('JSON Server is running', server._router.stack)
  console.log('JSON Server is running')
})
