const Express = require("express");
const app = Express();
const http = require("http");
const { v4: uuidv4 } = require("uuid");
const HomePage = require("./routes/HomePage");
const GenerateIdAndRedirect = require("./routes/Generate_UUiD_and_Redirect");
const server = http.createServer(app);

app.use(Express.json());
app.use(Express.static("./public"));

app.set("view engine", "ejs");

app.use("/", HomePage);
app.use("/room", GenerateIdAndRedirect);

port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
