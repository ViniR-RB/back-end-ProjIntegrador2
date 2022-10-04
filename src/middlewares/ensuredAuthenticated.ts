import { Request, Response, NextFunction } from 'express'
import { request } from 'http'
import { verify } from 'jsonwebtoken'
import authConfig from '../config/auth'
import { JwtNotFound, JwtTokenInvalid } from '../models/Erros'

interface TokenPlayLoader {
    iat: number,
    exp: number,
    sub: string,
}
export default function ensuredAuthenticated(req: Request, res: Response, next: NextFunction): void {


    const authHeader = req.headers.authorization

    if (!authHeader) {
        throw new JwtNotFound('JWT NOT FOUND')
    }
    const [, token] = authHeader.split(' ')
    try {
        const decoded = verify(token, authConfig.jwt.secret)
        const {sub} = decoded as TokenPlayLoader
       req.user = {
        id : sub
       }
        return next()
    } catch {
        throw new JwtTokenInvalid('Invalid JWT TOKEN')
    }
}
