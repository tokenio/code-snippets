const { SANDBOX } = require('../env');
const { TokenClient } = require('@token-io/tpp');

async function createNewMember(aliasValue, env) {
    const TokenTpp = new TokenClient({ env: env });

    const GLOBAL_ALIAS = {
        type: 'DOMAIN',
        value: aliasValue,
    };

    // Will need 3 distinct keys
    await TokenTpp.ManualCryptoEngine.setKeys([
        {
            'publicKey': 'fEiFd20H6o2g9LRhrY5sYgbIbC-QIB8E9Qr-ptrP2y8',
            'privateKey': 'LEFDQxmzJSEINiOYbffjWJV8rUtMd2ZS-UDz6BFilzt8SIV3bQfqjaD0tGGtjmxiBshsL5AgHwT1Cv6m2s_bLw',
            'level': 'LOW',
        },
        {
            'publicKey': 'pZtwrRsb06I9wgu1DNJBLyK-hAg0lPTaTVHQVIeYS0g',
            'privateKey': '8FeUKFdUC7FmFdabzYhAn7pYcCHzJW4XOtYkcKjxXC2lm3CtGxvToj3CC7UM0kEvIr6ECDSU9NpNUdBUh5hLSA',
            'level': 'STANDARD',
        },
        {
            'publicKey': 'X78lbyTuBDLJmU0MsKIFd4dzCk-yEskmUtIHIlO2vlw',
            'privateKey': '78HnKdQrEbkcef27NXB7F8KpHnc9V7Mx4Lv2yH_GYkFfvyVvJO4EMsmZTQywogV3h3MKT7ISySZS0gciU7a-XA',
            'level': 'PRIVILEGED',
        },
    ]);

    try {
        // Create a member with keys stored in memory
        const member = await TokenTpp.createMember(GLOBAL_ALIAS, TokenTpp.ManualCryptoEngine);

        console.log('\nMember ID: ' + member.memberId());
    } catch (err) {
        console.error(`Member alias of ${aliasValue} already exists`);
    }
}

(function argParser() {
    if (process.argv.length !== 3) {
        console.error(`Usage: ./createNewMember <aliasValue>`);
        return;
    }

    const [aliasValue] = process.argv.slice(2);

    createNewMember(aliasValue, SANDBOX);
})();
