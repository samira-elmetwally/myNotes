const express = require("express");
const app = express();
require("dotenv").config();
const notesRouter=require('./routes/note.route');
app.use(express.json());


app.get('/',(req,res)=>{
  res.status(200).end(`your server is running on port ${process.env.PORT}`);
});


//---------------------------------
app.use('/notes',notesRouter);
//---------------------------------



app.use((req, res) => {
  res.status(404).send("<h1>error page</h1>");
});

app.listen(process.env.PORT, "localhost", () => {
  console.log(`connected on port ${process.env.PORT}`);
});


