import Express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
const Amadeus = require('amadeus')
dotenv.config()

import 'isomorphic-fetch'
const App = Express()

App.use(cors())

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

App.get('/autocomplete', async (req: Request, res: Response) => {
  const result = await amadeus.referenceData.locations
    .get({ subType: 'AIRPORT,CITY', keyword: req.query.input, view: 'LIGHT' })
    .then((v: any) => ({ status: 'Successfully', data: v.result }))
    .catch((e: any) => ({ status: 'Error', data: e }))
  if (result.status === 'Successfully') {
    return res.json({ result: result.data })
  }
  return res.status(404).json({ autocomplete: 'Error getting autocomplete' })
})

App.listen(3000, () => console.log('server started on port 3000'))
