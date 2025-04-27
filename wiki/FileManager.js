const express = require('express');
const router = express.Router();
const axios = require('axios');
const ejs = require('ejs');

const response = await axios.get(JSON_COMING_SOON);
const data = await response.json();

router.get('/wiki/:WikiName', (req, res) => {
  const name = req.params.WikiName;
  if(data.includes(name)) {
    const data = JSON.parse(data);
    const content = data[data.indexOf(name) + 1];
    const author = data[data.indexOf(name) + 2];
    const editHistory = data[data.indexOf(name) + 3];
    const editAuthor = data[data.indexOf(name) + 4];
    const editDate = data[data.indexOf(name) + 5];
    let edit = '';
    const index = 1
    editHistory.forEach => {
      const edit += `${editAuthor[index]} Edited This Page On ${editDate[index]}` 
      const index += 1
      }
    } 
