'use strict'
const NodeRSA = require('node-rsa')

// a <> b <> c
/*
private a > b > c

public a < b < c
*/


// Use PRIVATE to sign, send PUBLIC so others can confirm

/*const aliceKey = new NodeRSA({ b: 64 })
aliceKey.generateKeyPair()
let alicePubPEM = aliceKey.exportKey('pkcs1-public-pem')
console.log('alice public key', alicePubPEM)

const orvarKey = new NodeRSA({ b: 64 })
orvarKey.generateKeyPair()
let orvarPubPEM = orvarKey.exportKey('pkcs1-public-pem')
console.log('orvar public key', orvarPubPEM)

const encrypted = aliceKey.encryptPrivate('I signed this, i promise', 'base64')

console.log('encrypted: ', encrypted)

//Sends encrypted data and alicePubPEM over unsecure networks

const publicKey = (true) ? alicePubPEM : orvarPubPEM; //True for correct transaction, false for attack attempt

const bobKey = new NodeRSA({ b: 64 })
bobKey.importKey(publicKey, 'pkcs1-public-pem')

const decrypted = bobKey.decryptPublic(encrypted, 'utf8')
console.log('decrypted: ', decrypted)
*/

// Use other persons PUBLIC to encrypt and send, letting the reciever decrypt
const ottoKey = new NodeRSA({ b: 64 })
ottoKey.generateKeyPair()
let ottoPubPEM = ottoKey.exportKey('pkcs1-public-pem')

//sends ottoPubPEM over unsecure network

const puss = new NodeRSA({ b: 64 })
puss.generateKeyPair()
puss.importKey(ottoPubPEM, 'pkcs1-public-pem')

const encrypted = puss.encrypt('Super secret message', 'base64')
console.log('encrypted', encrypted)

// Sends encrypted message over unsecure network

const decrypted =ottoKey.decrypt(encrypted, 'utf8')
console.log('decrypted', decrypted)

