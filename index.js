const express = require("express");
const postsRoutes = require("./postsRoutes")

const server = express();

server.use(express.json());
server.use('/api/posts', postsRoutes)

server.get("/", (req, res) => {
    res.json({ api: "Up and running!" });
})

server.listen(5000, () => console.log("\n== API is up on Localhost:5000 ==\n"))