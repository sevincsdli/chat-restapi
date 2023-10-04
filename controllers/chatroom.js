const mongoose = require("mongoose");
const Chatroom = mongoose.model("Chatroom");

const createChatroom = async (req, res) => {
  const { name } = req.body;

  const nameRegex = /^[A-Za-z\s]+$/;

  if (!nameRegex.test(name)) {
    return res.status(400).json({
      message: "Chatroom name can contain only alphabets.",
    });
  }

  const chatroom = await Chatroom.findOne({ name });

  if (chatroom) {
    return res.status(400).json({
      message: "Chatroom with that name already exists!",
    });
  }

  const chatroomNew = new Chatroom({
    name,
  });

  await chatroomNew.save();

  res.status(201).json({
    message: "Chatroom created!",
  });
};

const getAllChatrooms = async (req, res) => {
  const chatrooms = await Chatroom.find({});
 if(!chatrooms){
  return res.status(404).json({
    message:"Any chatroom does not found"
  })
 }
  res.json(chatrooms);
};

module.exports = {
  createChatroom,
  getAllChatrooms
};
