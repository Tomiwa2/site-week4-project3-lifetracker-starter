require("dotenv").config()
require("colors")

const PORT = process.env.PORT? Number(process.env.PORT) : 3001
const SECRET_KEY = process.env.SECRET_KEY || "secret_dev"

function getDatabaseUri (){
    const dbUser = process.env.DATABASE_USER || "postgres"
    const dbPass = process.env.DATABASE_PASS ? encodeURI(process.env.DATABASE_PASS) : "postgres"
    const dbHost = process.env.DATABASE_HOST || "local"
    const dbPort = process.env.DATABASE_PORT || 5432
    const dbName = process.env.DATABASE_NAME || "lifetracker"

    
    return process.env.DATABASE_URL || `postgreql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`
}

const BCRYPT_WORK_FACTOR = 13

console.log("LifeTracker Config:".red)
console.log("PORT".blue, PORT)
console.log("BCRYPT_WORK_FACTOR". blue, BCRYPT_WORK_FACTOR )
console.log("SECRET_KEY".blue, SECRET_KEY)
console.log("Database".blue, getDatabaseUri())
console.log("---")

// console.log("Database URI: ", getDatabaseUri())


module.exports = {
    PORT,
    SECRET_KEY,
    BCRYPT_WORK_FACTOR,
    getDatabaseUri
}