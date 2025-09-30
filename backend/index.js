const http = require("http");
const app = require("./app");
const {PORT} = process.env;

//Create server
const server = http.createServer(app);

//Listen server
server.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});