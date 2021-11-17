const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const sauceCtrl = require("../controllers/sauces");

router.post("/", auth, sauceCtrl.createThing);
router.get("/:id", auth, sauceCtrl.getOneThing);
router.get("/", auth, sauceCtrl.getAllThing);
router.put("/:id", auth, sauceCtrl.modifyThing);
router.delete("/:id", auth, sauceCtrl.deleteThing);

module.exports = router;
