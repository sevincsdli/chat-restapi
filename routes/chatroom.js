const router = require("express").Router();
const chatroomController = require("../controllers/chatroom");
const auth = require("../middleware/auth");
router.get("/", auth, chatroomController.getAllChatrooms);
router.post("/", auth,chatroomController.createChatroom);

module.exports = router;