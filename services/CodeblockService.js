
const Codeblock = require('../models/Codeblock');

const getCodeblocks = async () => {
    try {
        const codeblocks = await Codeblock.find();
        return codeblocks;
    } catch (error) {
        return error.message;
    }
}

const getCodeblockById = async (id) => {
    const codeblock = await Codeblock.findById(id);
    return codeblock;
}

const createCodeblock = async (codeBlock) => {
    const newCodeblock = new Codeblock(codeBlock);
    try {
        await newCodeblock.save();
        return newCodeblock;
    } catch (error) {
        return error.message;
    }
}

const deleteAll = async () => {
    try {
        await Codeblock.deleteMany();
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getCodeblocks,
    getCodeblockById,
    createCodeblock,
    deleteAll
}