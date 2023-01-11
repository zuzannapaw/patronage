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

setGlobalKey('setGlobalKey', setGlobalKey);
setGlobalKey('deleteGlobalKey', deleteGlobalKey);
setGlobalKey('getGlobalKey', getGlobalKey);
