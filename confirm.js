const fs = require("fs")
const sha = require("sha")

const file = process.argv[2]
const hash = process.argv[3]
console.log(sha.checkSync(file, hash))