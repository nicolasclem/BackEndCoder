const ProductoModel = require('../models/productModel');
const product = new ProductoModel();
const ChatModel = require('../models/chat.model');
const Chat = new ChatModel();

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('Client Connected 👩‍💻 -', socket.id);

    const sendProducts = async () => {
      const products = await product.getAll();
      io.emit('server:sendProducts', products);
    };
    sendProducts();

    socket.on('client:newProduct', async (data) => {
      await product.save(data);
      sendProducts();
    });

    const sendMessages = async () => {
      const messages = await Chat.getAllMessages();
      io.emit('server:sendMessages', messages);
    };
    sendMessages();

    socket.on('client:newMessage', async (data) => {
      await Chat.saveMessage(data);
      sendMessages()
    });
  });
};
