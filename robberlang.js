// Use Rövarspråket to encrypt/decrypt

function encrypt(message) {
  let newMessage = ""
  const consonants = "bcdfghjklmnpqrstvwxz"

  for (let idx in message) {
    const char = message[idx]
    if (char === " ") {
      newMessage += " "
    } else {
      const found = (consonants.indexOf(char) !== -1)
      if (found) {
        newMessage += char + "o" + char
      } else {
        newMessage += char
      }
    }
  }
  return newMessage
}

function decrypt(message) {
  let newMessage = ""
  let skip = 0

  for (let idx in message) {
    const chunk = message.substr(idx, 3)
    if (skip > 0) {
      skip--
    } else {
      if (message[idx] === " ") {
        newMessage += " "
      } else {
        if (chunk[0] === chunk[2] && chunk[1] === "o") {
          newMessage += chunk[0]
          skip = 2
        } else {
          newMessage += message[idx]
        }
      }
    }
  }
  return newMessage
}

const message = "puss är en liten korv"
const encrypted = encrypt(message)

console.log(encrypted)
// Sends over unsecure network

console.log(decrypt(encrypted))