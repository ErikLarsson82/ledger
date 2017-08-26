'use strict'
const NodeRSA = require('node-rsa')

// a <> b <> c
/*
private a > b > c

public a < b < c
*/


// Use PRIVATE to sign, send PUBLIC so others can confirm

const aliceKey = new NodeRSA({ b: 64 })
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
