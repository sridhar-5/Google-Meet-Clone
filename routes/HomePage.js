const Express = require("express");
const router = Express.Router();
const path = require("path");

router.get("/", (request, response) => {
  response.status(200).sendFile(path.resolve("./", "index.html"));
});

module.exports = router;
