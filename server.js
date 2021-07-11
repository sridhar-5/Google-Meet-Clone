const Express = require("express");
const app = Express();
const http = require("http");
const server = http.createServer(app);
const { v4: uuidv4 } = require("uuid");
const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, { debug: true });
const HomePage = require("./routes/HomePage");
//const GenerateIdAndRedirect = require("./routes/Generate_UUiD_and_Redirect");
const io = require("socket.io")(server);
const GenerateIdAndRedirect = require("./routes/Generate_UUiD_and_Redirect");
app.use(Express.json());
app.use(Express.static("./public"));
app.use("/peerjs", peerServer);
app.set("view engine", "ejs");

app.use("/", HomePage);
app.use("/room", GenerateIdAndRedirect);

io.on("connection", (socket) => {
  socket.on("join-room", (roomID, id) => {
    socket.join(roomID);
    console.log("request reached server");
    socket.broadcast.emit("user-connected", id);
  });

  socket.on("chat message", (message) => {
    //if we do this we will not recieve our own messages but here we wnt our texts too
    //socket.broadcast.emit("chat message", message);
    io.emit("chat message", message);
  });
});

port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
