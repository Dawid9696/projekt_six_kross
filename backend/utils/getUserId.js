const jwt = require('jsonwebtoken')

const getUserId = (request) => {
    const header = request.request.headers.authorization
    console.log(header)
    if(!header) throw new Error('Authentication required!')
    
    const token = header.replace('Bearer ','')
    console.log(token)
    const decoded = jwt.verify(token,'secret')
    console.log(decoded)
    return decoded.userId
}

module.exports = getUserId