const express = require('express');
const router = express.Router();
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

let data = [];

// Fetch wiki data at startup
(async () => {
  try {
    const response = await axios.get('JSON_COMING_SOON'); // replace this later
    data = response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();

router.get('/wiki/:WikiName', async (req, res) => {
  const name = req.params.WikiName;

  if (data.includes(name)) {
    const index = data.indexOf(name);
    const content = data[index + 1];
    const author = data[index + 2];
    const editHistory = data[index + 3];
    const editAuthor = data[index + 4];
    const editDate = data[index + 5];

    // Build edit history
    let edits = [];
    for (let i = 0; i < editHistory.length; i++) {
      edits.push({
        author: editAuthor[i],
        date: editDate[i],
        description: editHistory[i]
      });
    }

    // Read the wiki.ejs file manually
    const templatePath = path.join(__dirname, 'public', 'wiki.ejs');
    try {
      const template = fs.readFileSync(templatePath, 'utf-8');
      const html = ejs.render(template, { name, content, author, edits });
      res.send(html);
    } catch (err) {
      console.error('Error reading template:', err);
      res.status(500).send('Template error.');
    }

  } else {
    res.status(404).send('Wiki page not found.');
  }
});

module.exports = router;
