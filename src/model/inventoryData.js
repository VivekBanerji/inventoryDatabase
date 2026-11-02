
let inventory = [];

let nextId = 1;

module.exports = {
    inventory,

    getNextId: () => nextId++
};
