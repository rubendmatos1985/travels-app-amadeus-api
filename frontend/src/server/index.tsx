import Express, { Request, Response, NextFunction } from 'express'
import { renderReactApp } from './renderReactApp'
import uuid from 'uuid'
import { validateAppToken } from './middlewares/validateAppToken'
import jwt from 'jsonwebtoken'
import fetch from 'isomorphic-fetch'
declare const module: any

function main() {
  const user = uuid()
  const password = uuid()
  const secret = uuid()
  const app = Express()
  const port = 8080
  const token = jwt.sign({ user, password }, secret)
  app.use(Express.static('build'))
  app.get(
    '/autocomplete',
    validateAppToken((req: Request) => jwt.verify(req.query.token, secret)),
    async (req, res) => {
      const result = await fetch(
        `http://localhost:3000/autocomplete?input=${req.query.input}`
      ).then(v => v.json())
      console.log(result)
      res.json(result)
    }
  )

  app.get('/*', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reactApp = await renderReactApp(req, token)

      return res.send(reactApp)
    } catch (e) {
      console.log(e)
      res.json({ message: 'We are having some errors. please come back later' })
    }
  })

  const server = app.listen(port)

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => server.close())
  }
}

main()
