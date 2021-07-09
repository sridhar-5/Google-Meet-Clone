const Express = require("express");
const app = Express();
const http = require("http");
const server = http.createServer(app);
const { v4: uuidv4 } = require("uuid");
const HomePage = require("./routes/HomePage");
const GenerateIdAndRedirect = require("./routes/Generate_UUiD_and_Redirect");
const io = require("socket.io")(server);
const { roomID } = require("./routes/Generate_UUiD_and_Redirect");

app.use(Express.json());
app.use(Express.static("./public"));

app.set("view engine", "ejs");

app.use("/", HomePage);
app.use("/room", GenerateIdAndRedirect);

io.on("connection", (socket) => {
  socket.on("join-room", (roomID) => {
    socket.join(roomID);
    console.log("request reached server");
    socket.to(roomID).broadcast.emit("user-connected");
  });
});

port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
