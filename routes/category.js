const { resolveInclude } = require('ejs');
var express = require('express');
var router = express.Router();

router.get('/:filter', function(req, res, next) {
   /*const connectionString = process.env.CONNECTION_STRING; not working env variable = undefined*/
   const connectionString = "mongodb+srv://nexttt:1234554321bg@cluster0.tysyogu.mongodb.net/?retryWrites=true&w=majority";
   const MongoClient = require('mongodb').MongoClient.connect(connectionString,{
   useUnifiedTopology: true}, async function(err, client){
   if(err) throw err;
   console.log("Connected to MongoDB!");
   const db = client.db("OnlineStore");
   var products;
   var categories;
   products = await db.collection("Products").find().toArray();
   categories = await db.collection("Categories").find().toArray();
   if(req) 
   {
    products = products.filter(function(product){
        return product.primary_category_id === req.params.filter;
    });
   }
   res.render('index', {products: products.slice(0,10), categories: categories, filter:""});
   })
});

module.exports = router;
