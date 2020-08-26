# Code Snippets
Intended to provide examples on how to encrypt and verify payloads

## JavaScript

### Prereqs
* Node 10

### How to use
* cd into the js folder - `cd js`
* run - `npm run start`
* the tool will be hosted in `localhost:3000`

#### Generate ED25519 key pair
Provides a code sample on generating a ED25519 key pair.

#### Create New Member
Provides a code sample on how to create a new member in Sandbox environment. Alias value must be unique.

Production is similar just change the env variable.

#### Sign Payload
Provides a code sample on how to sign a payload as well as normalize the payload in a format that is expected by our server.

#### Verify Payload
Provides a code sample on how to use Token's public key to verify the signature.
