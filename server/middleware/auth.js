import jwt from 'jsonwebtoken'
async function auth(req, res, next){
    console,log('auth middleware called')
    const {token}  = req.cookies
    if(!token) return next(new AppError('Not authenticated', 401))
    console.log(token)
    console.log('auth')
    const userDetails = await jwt.verify(token, process.env.JWT_SECRET)
    if(!userDetails) {
        console.log('Error class called')
        return next(new AppError('Not authenticated', 401))}
    
    req.userId = userDetails.id
    next()
}

export default auth;