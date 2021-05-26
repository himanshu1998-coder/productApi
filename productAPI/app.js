const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

const port = process.env.port || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
const connection_string = "mongodb://localhost:27017/myDB";
mongoose.connect(connection_string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const productSchema = {
  Name: String,
  Price: Number,
  Description: String,
};

const Product = mongoose.model("Product", productSchema);

// to get all the products

app.get("/api/v1/getProducts", function (req, res) {
  Product.find(function (err, foundProducts) {
    if (!err) {
      res.send(foundProducts);
    } else {
      res.send(err);
    }
  });
});

// for adding the products

app.post("/api/v1/addProduct", function (req, res) {
  const newProduct = new Product({
    Name: req.body.name,
    Price: req.body.price,
    Description: req.body.description,
  });
  newProduct.save((err) => {
    if (!err) {
      res.send("success");
    } else {
      res.send(err);
    }
  });
});

//for getting the specific product

app.get("/api/v1/getProduct:id", (req, res) => {
  const userID = req.params.id;
  Product.findOne({ _id: userID }, (err, foundProduct) => {
    if (!err) {
      res.send(foundProduct);
    } else {
      res.send(err);
    }
  });
});

// for updating the product

app.post("/api/v1/updateProduct:id", (req, res) => {
  const userID = req.params.id;
  Product.updateOne(
    { _id: userID },
    {
      Name: req.body.name,
      Price: req.body.price,
      Description: req.body.description,
    },
    { overwrite: true },
    (err) => {
      if (!err) {
        res.send("successfully updated");
      } else {
        res.send(err);
      }
    }
  );
});

app.listen(port, () => {
  console.log("server starter at port 3000");
});
