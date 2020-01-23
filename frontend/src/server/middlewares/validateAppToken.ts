import { Request, Response, NextFunction } from 'express'

export const validateAppToken = (jwtFn: (req: Request) => string | object) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = jwtFn(req)

    return next()
  } catch (e) {
    return res.status(404).json({ message: 'Forbidden' })
  }
}
