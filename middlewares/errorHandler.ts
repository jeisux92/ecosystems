import { Request, Response, NextFunction, Error } from 'express';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        return next(err)
    }
    console.log(err)
    res.status(500).send()
    // res.render('error', { error: err })
}
module.exports = errorHandler