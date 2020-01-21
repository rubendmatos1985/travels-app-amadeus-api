import Express, { Request, Response } from 'express'
import dotenv from 'dotenv'
const Amadeus = require('amadeus')
dotenv.config()

import 'isomorphic-fetch'
const App = Express()
const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_API_KEY,
  clientSecret: process.env.AMADEUS_API_SECRET
})
App.get('/recommendations', async (req: Request, res: Response) => {
  try {
    const result = await amadeus.shopping.flightDestinations.get({
      origin: 'PAR'
    })
    return res.json({ recommendations: JSON.parse(result.body) })
  } catch (e) {
    return res
      .status(404)
      .send({ recommendations: 'Error getting recommendations' })
  }
})

App.get('/autocomplete', async (req: Request, res: Response) => {})

App.listen(3000, () => console.log('server started on port 3000'))
