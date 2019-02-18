# yadepage

A **reasonably secure** offline deterministic password generator.

yadepage uses a chain of [SHA256](https://en.wikipedia.org/wiki/SHA-2) and [Argon2](https://en.wikipedia.org/wiki/Argon2) hashing algorithms to generate **strong deterministic passwords**.

![schema](https://i.imgur.com/B0pcJ5U.png)

## Where does it work?

First of all yadepage is **not** supposed to be used **online**. 

You **have to** download and **run** it **locally**.

I'm providing a stand-alone zip version but it is **strongly recommended** to 
download the source code, read it and build it.

## How does it work?

With yadepage you have **two secrets**
* Your config.js
* Your Master Password

and **both** have to be compromised in order to compromise your passwords.

Furthermore with the yadepage cryptographic scheme your passwords will be **safe** even if **both** of the **hash functions** will be **compromised**.

## How safe it is?

Assuming a **catastrophic** and **sci-fi** scenario in which SHA256 and/or Argon2 gets compromised and become invertible this is how secure is yadepage.

:heavy_multiplication_x: = compromised/invertible

:heavy_check_mark: = safe

SHA256|Argon2|Config.js|Can crack the Master Password?|Can generate new Passwords?
---|---|---|---|---
:heavy_multiplication_x:|:heavy_check_mark:|:heavy_check_mark:|:heavy_multiplication_x:|:heavy_multiplication_x:
:heavy_check_mark:|:heavy_multiplication_x:|:heavy_check_mark:|:heavy_multiplication_x:|:heavy_multiplication_x:
:heavy_multiplication_x:|:heavy_multiplication_x:|:heavy_check_mark:|:heavy_multiplication_x:|:heavy_multiplication_x:
:heavy_multiplication_x:|:heavy_multiplication_x:|:heavy_multiplication_x:|:heavy_multiplication_x:*|:heavy_multiplication_x:*

\* the complexity of this attack is ![formula](https://latex.codecogs.com/gif.latex?%5Cdpi%7B120%7D%20O%28H%5E%7B-1%7D%29O%28n%5Em%29) where ![formula](https://latex.codecogs.com/gif.download?%5Cdpi%7B120%7D%20O%28H%5E%7B-1%7D%29) is the complexity of inverting both the hash functions, n is the number of *concatenations* and m is the number of *maximum iterations*


## How to use it

1) Clone this repository

```
git clone https://github.com/galatolofederico/yadepage && cd yadepage
```

2) Install the dependencies

```
npm install
```

3) Read and verify the code (the password generation functions is in ``src/js/generator.js``)
4) **Customize your config.js**
5) Build it

```
gulp
```
6) You will find in ``dist/`` your yadepage instance