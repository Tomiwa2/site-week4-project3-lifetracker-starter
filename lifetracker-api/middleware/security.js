const jwt = require ("jsonwebtoken")
const {SECRET_KEY} = require("../config")
const {UnauthorizedError} = require("../utils/errors")

/**
 * parse Auth header middleware function:
 * - check for token in auth header
 * - if token exists,
 * ---- verify the token
 * ---- populate res.locals.user with token payload
 */


const jwtFrom = ({headers}) => {
if (headers?.authorization){
    const [scheme, token] = headers.authorization.split(" ")
    if(scheme.trim() === "Bearer"){
        return token
    }
}

return undefined

}


const extractUserFromJwt = (req, res, next) => {
    try{
        const token = jwtFrom(req)
        if(token){
            res.locals.user = jwt.verify(token, SECRET_KEY)
        }

      return next()
    }catch(error){
        return next()
    }
}

const requireAuthenticatedUser = (req, res, next) => {
    try {
      const { user } = res.locals
      if (!user?.email) {
        throw new UnauthorizedError()
      }
      return next()
    } catch (error) {
      return next(error)
    }
  }



/** 
 * require Auth user middleware function:
 * - check res.locals.user for token payload
 * - if no payload,
 * ---- pass error with built in express error handling
 * 
 * - if payload,
 * ---- allow access
 */

module.exports = {
    extractUserFromJwt,
    requireAuthenticatedUser

}