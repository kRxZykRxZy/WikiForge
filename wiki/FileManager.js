const express = require('express');
const router = express.Router();
const axios = require('axios');

let data = [];

(async () => {
  try {
    const response = await axios.get('JSON_COMING_SOON');
    data = response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();

router.get('/wiki/:WikiName', (req, res) => {
  const name = req.params.WikiName;

  if (data.includes(name)) {
    const index = data.indexOf(name);
    const content = data[index + 1];
    const author = data[index + 2];
    const editHistory = data[index + 3];
    const editAuthor = data[index + 4];
    const editDate = data[index + 5];

    let edit = '';
    for (let i = 0; i < editHistory.length; i++) {
      edit += `${editAuthor[i]} edited this page on ${editDate[i]}\n`;
    }

    res.send({ name, content, author, edit });
  } else {
    res.status(404).send('Wiki page not found.');
  }
});

module.exports = router;
