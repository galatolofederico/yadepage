(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

document.defaultConfig = {
  version: 1,
  generation: {
    concatenations: 3,
    // Number of Argon2 + SHA256 concatenations
    iterations: 10,
    // Maximum number of Argon2 iterations
    salt: "yf9rH8.,Q4)faP2.J?;",
    // Secret salt
    memorySize: 1024,
    // Memory size for Argon2
    passwordLength: 24,
    // Password length
    argonType: argon2.ArgonType.Argon2d // Type of the Argon2 hash

  }
};
},{}]},{},[1])