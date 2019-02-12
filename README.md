# yadepage

A **reasonably secure** offline deterministic password generator.

yadepage uses a chain of [SHA256](https://en.wikipedia.org/wiki/SHA-2) and [Argon2](https://en.wikipedia.org/wiki/Argon2) hashing algorithms to generate **strong deterministic passwords**.

## Where does it work?

First of all yadepage is **not** supposed to be used **online**. 

You **have to** download and **run** it **locally**.

I'm providing a stand-alone zip version but it is **strongly recommended** to 
download the source code, read it and build it.

## How does it work?

With yadepage you have **two secrets**
* Your config.js
* Your Master Password

and **both** have to be compromised in order to compromise your passwords
