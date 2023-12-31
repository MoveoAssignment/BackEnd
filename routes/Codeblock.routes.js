const express = require("express");
const router = express.Router();

const codeblockController = require("../controllers/CodeblockController");


router
.get("/", codeblockController.getCodeblocks)
.get("/:id", codeblockController.getCodeblockById)
.post("/", codeblockController.createCodeblock)
.delete("/", codeblockController.deleteAll)



module.exports = router;