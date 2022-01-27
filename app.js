require('dotenv').config();
var bodyParser = require("body-parser");
var express = require('express');
const { request, response } = require('express');
const cors = require('cors');


var app = express();
var port = 80;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.connect();


async function connect() {
  let conn;
  try {
	return await pool.getConnection();
  //return conn;

  } catch (err) {
	throw err;
  } finally {
	if (conn) return conn.end();
  }
}

async function disconnect(conn){
  conn.end();
}