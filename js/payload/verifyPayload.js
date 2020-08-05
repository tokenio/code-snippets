const stringify = require('fast-json-stable-stringify');
const { TokenClient } = require('@token-io/tpp');
const forge = require('node-forge');
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const { SANDBOX } = require('../env');

async function verifyPayload(payload) {
    const tokenPublicKey = await getTokenPublicKey();
    const forgeKeys = {
        publicKey: bufferKey(tokenPublicKey),
    };

    const forgeVerify = forge.pki.ed25519.verify({
        message: stringify(payload),
        encoding: 'binary',
        publicKey: forgeKeys.publicKey,
        signature: bufferKey('lId4ZznCvouhjGZjcVIhIN9LvqbHXIgGR-rkIw0GUZanIqD2kGr1SE0B2aFgAm7jlwktDVv8MKleRBXWOYnvBg'),
    });

    console.log('\nVerify\n' + forgeVerify);
}

async function getTokenPublicKey() {
    const Token = new TokenClient({ env: SANDBOX });

    const tokenMember = await Token._unauthenticatedClient.getTokenMember();
    const { publicKey } = tokenMember.keys[0];

    return publicKey;
}

function bufferKey(key) {
    const segmentLength = 4;
    const string = key.toString();
    const newLength = Math.ceil(string.length / segmentLength) * segmentLength;
    const base64Buffer = string.padEnd(newLength, '=')
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const base64 = Buffer.from(base64Buffer, 'base64');

    return new Uint8Array(base64);
}

(async function argParser() {
    const payloadFile = await readFile('js/payload/payload.txt');
    const payload = JSON.parse(payloadFile.toString());

    verifyPayload(payload);
})();

