(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var fields = ["concatenations", "iterations", "salt", "memorySize", "passwordLength"];

function init() {
  for (var _i = 0; _i < fields.length; _i++) {
    var field = fields[_i];
    document.getElementById(field).placeholder = document.defaultConfig.generation[field];
  }
}

function handlePassword(password) {
  document.getElementById("loading").hidden = true;
  document.getElementById("password").hidden = false;
  document.getElementById("computedPassword").value = password;
}

var step = 0;

document.computePassword = function () {
  document.getElementById("params").hidden = true;
  document.getElementById("loading").hidden = false;
  step = 0;
  setTimeout(function () {
    var config = {};

    for (var _i2 = 0; _i2 < fields.length; _i2++) {
      var field = fields[_i2];
      config[field] = document.getElementById(field).value != "" ? document.getElementById(field).value : undefined;
    }

    document.generator(document.getElementById("masterPassword").value, document.getElementById("username").value, document.getElementById("service").value, config).then(handlePassword);
  }, 10);
};

var toggled = false;

function eyeToggle() {
  if (!toggled) {
    document.getElementById("eye-icon").setAttribute("data-icon", "eye-slash");
    document.getElementById("computedPassword").setAttribute("type", "text");
  } else {
    document.getElementById("eye-icon").setAttribute("data-icon", "eye");
    document.getElementById("computedPassword").setAttribute("type", "password");
  }

  toggled = !toggled;
}

function copyToClipboard() {
  if (!toggled) document.getElementById("computedPassword").setAttribute("type", "text");
  document.getElementById("computedPassword").select();
  document.execCommand("copy");
  if (!toggled) document.getElementById("computedPassword").setAttribute("type", "password");
  setTimeout(function () {
    window.getSelection().empty();
  }, 100);
}

function reset() {
  document.getElementById("password").hidden = true;
  document.getElementById("params").hidden = false;
}

document.hashEvent.on("hash", function (args) {
  step += 1;
  requestAnimationFrame(function () {
    document.getElementById("stepCounter").textContent = step + "/" + args.max;
  });
});
document.eyeToggle = eyeToggle;
document.copyToClipboard = copyToClipboard;
document.reset = reset;
init();
},{}]},{},[1])