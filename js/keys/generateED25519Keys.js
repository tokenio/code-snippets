const forge = require('node-forge');

async function generateED25519Keys() {
    const keypair = forge.pki.ed25519.generateKeyPair();

    const privateKey = strKey(keypair.privateKey);
    const publicKey = strKey(keypair.publicKey);

    console.log('\nPublic Key: ' + publicKey);
    console.log('Private Key: ' + privateKey);
}

function strKey(input) {
    const base64 = input.toString('base64');

    return base64ToBase64Url(base64);
}

function base64ToBase64Url(input) {
    return input.replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}

(function argParser() {
    generateED25519Keys();
})();
