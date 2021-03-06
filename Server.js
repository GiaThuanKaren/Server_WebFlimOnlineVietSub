const express = require("express");
const Routes = require("./src/Routes/routes");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
const PORT = process.env.PORT || 5000;
Routes(app);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
