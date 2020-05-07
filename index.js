const express = require("express");
const postsRoutes = require("./postsRoutes")
const port = process.env.PORT || 5000
const server = express();

server.use(express.json());
server.use('/api/posts', postsRoutes)

server.get("/", (req, res) => {
    res.json({ api: "Up and running!" });
})

server.listen(port, () => console.log(`\n== API is up on http://localhost:${port} ==\n`))