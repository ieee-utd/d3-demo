//force pwetty colors
process.env.FORCE_COLOR = "1";

import * as express from "express";         //create APIs really easily
import * as cors from "cors";


//Load Express middleware
const port = 3000; //listen to localhost:PORT_NUMBER_HERE

let app = express(); //load express

//enable CORS support
var corsOptions = {
  origin: /^http:\/\/localhost:.*$/,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true
};
app.use(cors(corsOptions));

//Basic index message
app.get('/', (req, res) => {
  res.send({'msg': "API running!"})
})

//Start server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
