//force pwetty colors
process.env.FORCE_COLOR = "1";

import * as express from "express";         //create APIs really easily
import * as cors from "cors";
import * as csvParse from "csv-parse";
import * as fs from "fs";
import * as _ from "lodash";
import * as moment from "moment";

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
  res.send({ message: "Hey, it works ;)" })
})

function convertCSVToJson(input: string) {
  return new Promise((resolve, reject) => {
    csvParse(input, {
      //options go here
    }, function(err, output){
      if (err) return reject(err);
      return resolve(output)
    })
  })
}

function checkIfFileExists(filename: string) {
  return new Promise((resolve, reject) => {
    fs.stat(filename, (err, stats) => {
      if (err) return reject(err)
      if (!stats) {
        return resolve(false)
      } else {
        return resolve(stats.isFile())
      }
    })
  })
}

function readFileToString(filename: string) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    })
  })
}

//Get stock data for a given ticker code (e.g. AAPL)
app.get('/stocks/:tickerName', async (req, res, next) => {
  try {
    const ticker = req.params.tickerName.trim().toLowerCase();
    const filename = `data/stocks/${ticker}.us.txt`;

    //check if our ticker file exists
    let fileExists = await checkIfFileExists(filename);
    if (!fileExists) {
      return next({ status: 404, message: "Stock not found" })
    }

    //read the file and convert to JSON
    let fileData = await readFileToString(filename) as string;
    let csvData: any = await convertCSVToJson(fileData);

    //convert to a format that the user can understand
    csvData.splice(0, 1); //remove the first item in the array (headers)

    //information from csvs: Date,Open,High,Low,Close,Volume
    csvData = _.map(csvData, (line: any[]) => {
      return {
        date: moment(line[0]).toDate(),
        open: line[1],
        high: line[2],
        low: line[3],
        close: line[4],
        volume: line[5]
      }
    })

    res.send(csvData);

  } catch (e) {
    next(e)
  }
})

//Start server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
