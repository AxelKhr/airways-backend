const express = require('express');
const PORT = process.env.PORT || 3002;
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const connectToDB = require('./database');
const routes = require('./routes/routes');
const compression = require('compression');

app.use(compression());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

app.use(cors());

routes(app);

const start = async () => {
  try {
    await connectToDB();
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  }
  catch(e) {
      console.log(`Error: ${e}`);
  }
};

start();