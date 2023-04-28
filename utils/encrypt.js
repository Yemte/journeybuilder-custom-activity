const CryptoJS = require("crypto-js");

const encryptdjsn = function(enctext) {
    // Please parse  your secret key
//var iv = CryptoJS.enc.Utf8.parse(CryptoJS.lib.WordArray.random(128 / 8));
    var key = CryptoJS.enc.Utf8.parse("93wj660t8fok9jws");
var iv = CryptoJS.enc.Utf8.parse("Password");
    return CryptoJS.AES.encrypt(enctext, key,{
         iv: iv,padding:CryptoJS.pad.Pkcs7,mode:CryptoJS.mode.CBC 
    }).ciphertext.toString(CryptoJS.enc.Base64);
}
module.exports = encryptdjsn