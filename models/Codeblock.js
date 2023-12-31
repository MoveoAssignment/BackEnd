const mongoose = require('mongoose');

const codeblockSchema = mongoose.Schema({
    title: String,
    description: String,
    task: String,
    code: String,
    image_url: String,

})

const Codeblock = mongoose.model('Codeblock', codeblockSchema, 'codeblocks');
module.exports = Codeblock; 