const Express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = Express.Router();

var roomID;
router.get("/", (request, response) => {
  response.redirect(`/room/${uuidv4()}`);
});

router.get("/:roomid", (request, response) => {
  response.render("room", { roomID: request.params.roomid });
});

module.exports = router;
