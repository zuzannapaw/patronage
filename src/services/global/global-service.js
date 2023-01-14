Object.prototype.patronage = {};

const setGlobalKey = (key, value) => {
    Object.prototype.patronage = {
        ...Object.prototype.patronage,
        [key]: value,
    };
};

const deleteGlobalKey = (key) => {
    delete Object.prototype.patronage[key]; 
};

const getGlobalKey = (key) => {
    return Object.prototype.patronage[key]; 
};

// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest?fbclid=IwAR3vujnOeYeRqp3R-P8T6UqBjlhnz14vprUzRjRGeomy6zQCTp9Uuzsh3zc
const createHash = async (message) => {
    const msgUint8 = new TextEncoder().encode(message);                           // encode as (utf-8) Uint8Array
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);           // hash the message, SHA-256 is algorithm
    const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
    return hashHex;
};

setGlobalKey('setGlobalKey', setGlobalKey);
setGlobalKey('deleteGlobalKey', deleteGlobalKey);
setGlobalKey('getGlobalKey', getGlobalKey);
setGlobalKey('createHash', createHash);
