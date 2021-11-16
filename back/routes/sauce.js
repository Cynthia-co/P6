const express = require("express");
const router = express.Router();
const sauceCtrl = require("../controllers/sauces");

router.post("/", sauceCtrl.createThing);
router.get("/:id", sauceCtrl.getOneThing);
router.get("/", sauceCtrl.getAllThing);
router.put("/:id", sauceCtrl.modifyThing);
router.delete("/:id", sauceCtrl.deleteThing);

module.exports = router;
