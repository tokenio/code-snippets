const stringify = require('fast-json-stable-stringify');
const forge = require('node-forge');
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

async function signPayload(payload) {
    const forgeKeys = {
        publicKey: bufferKey('tUEprcSvHCVwIyV-emHU9mjiYKLy5Q8aDcV2gPPzwmI'),
        privateKey: bufferKey('QuCL_4mOZ1F7MyKenEBtsFVQ-0UCpPJQgULvaVSE9P-1QSmtxK8cJXAjJX56YdT2aOJgovLlDxoNxXaA8_PCYg'),
    };

    const forgeSignature = forge.pki.ed25519.sign({
        message: stringify(payload),
        encoding: 'binary',
        privateKey: forgeKeys.privateKey,
    });

    const base64 = forge.util.encode64(forge.util.binary.raw.encode(forgeSignature));
    const normalizedPayload = base64
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/g, '')
        .replace(/\s/g, '');

    console.log('\nSignature: ' + normalizedPayload);
}

function bufferKey(key) {
    const segmentLength = 4;
    const string = key.toString();
    const newLength = Math.ceil(string.length / segmentLength) * segmentLength;
    const base64Buffer = string.padEnd(newLength, "=")
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const base64 =  Buffer.from(base64Buffer, 'base64');

    return new Uint8Array(base64);
}

(async function argParser() {
    const payload = await readFile('js/payload/payload.txt');

    signPayload(payload);
})();
