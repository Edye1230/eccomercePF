const router = require("express").Router();
var path = require('path');


router.get("/", async (req, res) => {
    try{
    res.send("hola")
}catch {
    console.log("Algo falló");
}
});

module.exports = router;