const CodeblockService = require('../services/CodeblockService');

const getCodeblocks = async (req, res) => {
    try {
        const codeblocks = await CodeblockService.getCodeblocks();
        res.status(200).json(codeblocks);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getCodeblockById = async (req, res) => {
    const id = req.params.id;
    try {
        const codeblock = await CodeblockService.getCodeblockById(id);
        res.status(200).json(codeblock);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createCodeblock = async (req, res) => {
    const codeblock = req.body;
    console.log(codeblock);
    try {
        const newCodeblock = await CodeblockService.createCodeblock(codeblock);
        res.status(201).json(newCodeblock);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const deleteAll = async (req, res) => {
    try {
        await CodeblockService.deleteAll();
        res.status(200).json({ message: "All codeblocks deleted" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}



module.exports = {
    getCodeblocks,
    getCodeblockById,
    createCodeblock,
    deleteAll
}