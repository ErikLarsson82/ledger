const fs = require("fs")
const sha = require("sha")

/*
console.log(fs.readFileSync('plain-message.txt', "utf8"))
const hash = sha.getSync("plain-message.txt")
console.log(sha.checkSync("plain-message.txt", hash))
*/

const ledger = []

function mineTheCoinz(obj) {
    let found = false
    let seed = ""
    while(!found) {
        seed = (Math.round(Math.random() * 10000)).toString()
        obj.seed = seed
        fs.writeFileSync('tmp.json', JSON.stringify(obj), "utf8")
        hash = sha.getSync('tmp.json', "uft8")
        if (hash.substring(0, 2) === "11") {
            found = true
        } else {
            console.log('dismissed', hash)
        }
    }
    console.log('hash found', hash)
    return {
        transaction: obj,
        hash: hash
    }
}

//Incoming message
let message1 = fs.readFileSync('plain-message.json', 'utf8')
message1 = JSON.parse(message1)

ledger.push(mineTheCoinz(message1))

let message2 = fs.readFileSync('plain-message-2.json', 'utf8')
message2 = JSON.parse(message2)
message2.prevHash = ledger[ledger.length-1].hash

ledger.push(mineTheCoinz(message2))

console.log(ledger)