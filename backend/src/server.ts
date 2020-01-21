import Express, { Request, Response } from 'express'
import dotenv from 'dotenv'
const Amadeus = require('amadeus')
dotenv.config()

import 'isomorphic-fetch'
const App = Express()
const amadeus = new Amadeus({
  clientId: process.env.API_KEY,
  clientSecret: process.env.API_SECRET
})
App.get('/recommendations', async (req: Request, res: Response) => {
  const result = await amadeus.shopping.flightDestinations.get({
    origin: 'PAR'
  })
  return res.json({ recommendations: JSON.parse(result.body) })
})

App.listen(3000, () => console.log('server started on port 3000'))
