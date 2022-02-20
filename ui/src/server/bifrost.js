const express = require('express')
const cors = require('cors')
const BramblJS = require('brambljs')
const { KeyManager } = require('brambljs/src/Brambl')

const app = express()
const port = 8000

let brambl

app.use(cors())

app.get('/init', (req, res) => {

  brambl = new BramblJS({
    KeyManager: new KeyManager({
      network: 'private',
      password: 'test',
      keyFile: {
        "crypto": {
          "mac": "2377P8eRGhGPWCi18qBxpoNeWjmSmFxa5SjirffMxEH7",
          "kdf": "scrypt",
          "cipherText": "2txz2BXpCpgCe6xVksCUvSNVoCdRYDnH6n9qoJn5RRWNn1V4XsaeicsjDu2oMU1QsZdqdxbk4g3insDC5cCeK4w6",
          "kdfSalt": "4efQbFkNkBMnHaF4EhUiBFVSyoFUQ5GuTFpurKpHiki6",
          "cipher": "aes-256-ctr",
          "cipherParams": {
            "iv": "4rjExon4jG8KcRvftZW3i5"
          }
        },
        "address": "AU9avKWiVVPKyU9LoMqDpduS4knoLDMdPEK54qKDNBpdnAMwQZcS"
      }
    })
  })

  res.send(`User's address is ${brambl.keyManager.address}`)

})

app.get('/mint', (req, res) => {

  brambl = new BramblJS({
    KeyManager: new BramblJS.KeyManager({
      network: 'private',
      password: 'test',
      keyFile: {
        "crypto": {
          "mac": "2377P8eRGhGPWCi18qBxpoNeWjmSmFxa5SjirffMxEH7",
          "kdf": "scrypt",
          "cipherText": "2txz2BXpCpgCe6xVksCUvSNVoCdRYDnH6n9qoJn5RRWNn1V4XsaeicsjDu2oMU1QsZdqdxbk4g3insDC5cCeK4w6",
          "kdfSalt": "4efQbFkNkBMnHaF4EhUiBFVSyoFUQ5GuTFpurKpHiki6",
          "cipher": "aes-256-ctr",
          "cipherParams": {
            "iv": "4rjExon4jG8KcRvftZW3i5"
          }
        },
        "address": "AU9avKWiVVPKyU9LoMqDpduS4knoLDMdPEK54qKDNBpdnAMwQZcS"
      }
    })
  })

  const address = brambl.keyManager.address
  const assetCode = brambl.createAssetCode('test')

  const rawAssetParams = {
    "propositionType": "PublicKeyCurve25519",
    "recipients": [
      // basic: [address, quantity]
      // advance: [address, quantity, securityRoot, metadata]
      [address, 1, '11111111111111111111111111111111', 'testData'],
    ],
    "assetCode": assetCode,
    "sender": [address],
    "changeAddress": address,
    "consolidationAddress": address,
    "metadata": "ffdsfsa",
    "random": "true",
    "minting": true,
    "fee": 1
  }

  const tx = brambl.transaction('createRawAssetTransfer', rawAssetParams)
  .then(res => { console.log('Unconfirmed transaction'); console.log(res); return res })
  .then(res => brambl.pollTx(res.result.txHash))
  .then(res => { console.log('\nConfirmed transaction'); console.log(res); return res })
  .catch(console.log)

  res.send(tx)
})

app.get('/balances', (req, res) => {

  const params = {
    addresses: [
      brambl.keyManager.address
    ]
  }

  brambl.requests.lookupBalancesByAddresses(params)
    .then(result => res.send(result))
})

app.listen(port)