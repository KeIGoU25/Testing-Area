const express = require('express');
const bodyParser = require('body-parser');
const { insertToDB, connectToDatabase } = require('./db');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/user', async (req, res) => {
  const dbName = "dbMarketPrice";
  const dbCollection = "ConsumerGoodsPrices";

  const itm_imglink = req.body.itm_imglink;
  const itm_name = req.body.itm_name;
  const itm_category = req.body.itm_category;
  const itm_measure = req.body.itm_measure;
  const itm_brand = req.body.itm_brand;
  const itm_stock = req.body.itm_stock;
  const itm_store = req.body.itm_store;
  const itm_location = req.body.itm_location;
  const itm_type = req.body.itm_type;
  const itm_price = req.body.itm_price;

  const content = {
    itm_imglink: itm_imglink,
    itm_name: itm_name,
    itm_category: itm_category,
    itm_measure: itm_measure,
    itm_brand: itm_brand,
    itm_stock: itm_stock,
    itm_store: itm_store,
    itm_location: itm_location,
    itm_type: itm_type,
    itm_price: itm_price,
  };

  await connectToDatabase(); // Ensure the client is connected before inserting
  await insertToDB(dbName, dbCollection, content);
  res.send('Document inserted successfully');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
