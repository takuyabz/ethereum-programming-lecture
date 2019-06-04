const express = require("express");
const app = express();
const PORT = 7002;

app.use(express.static("dist"));

app.use(express.static("build/contracts"));

app.get("/", (req,res)=>{
  res.sendFile(`${__dirname}/dist/index.html`);
});

app.get("*", (req, res)=> {
  res.status(404);
  res.send("URL does not exist");
})

app.listen(PORT, () => {
  console.log(`Todo List App running on port http://localhost:${PORT} ...`);
});

