const axios = require('axios');

exports.getAll = async (req, res) => {
  try {
    axios.get('https://itunes.apple.com/search?term=all&entity=album')
    .then(function (response) {
      const result = filteredResults(response.data);
      res.status(201);
      res.send(result);
    })
  } catch (err) {
    res.status(500);
    res.send('Failed to access iTunes API');
  }
};

function filteredResults (result) {
  const resultArr = [];
  const albumNames = [];

  for (const album of result.results) {
    const name = album.collectionName;
    const isThere = albumNames.includes(name);

    if (!isThere) {
      albumNames.push(name);
      resultArr.push(album);
    }
  }
  return resultArr
};