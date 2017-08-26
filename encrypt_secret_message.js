'use strict'
const NodeRSA = require('node-rsa')

// a <> b <> c
/*
private a > b > c

public a < b < c
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
