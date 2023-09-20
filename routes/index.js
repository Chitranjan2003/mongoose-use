var express = require('express');
var router = express.Router();
var usermodel = require("./users")

/* GET home page. */
router.get('/', function(req, res, next) {
res.render( 'index')
});
router.get('/feed', function(req, res, next) {
  usermodel.find()
  .then(function(allusers){
   res.render("feed",{allusers});
  })
 });

 router.get('/delete/:id', function(req, res, next) {
   usermodel.findOneAndDelete({_id:req.params.id})
   .then(function(allusers){
    res.redirect("back");
   })
  });   
  router.get('/edit/:id', function(req, res, next) {
   usermodel.findOne({_id:req.params.id})
   .then(function(foundeduser){
    res.render("edit",{foundeduser});
   })
  }); 
 
  router.post('/updated/:id', function(req, res, next) {
   usermodel.findOneAndUpdate({_id:req.params.id},{
      age:req.body.age,
      image:req.body.image,
      username:req.body.username,
      contact:req.body.contact,
      about:req.body.about
   })
   .then(function(users){
    res.redirect("/feed");
   })
  });
 
router.post('/create', function(req, res, next) {
   usermodel
   .create({
      age:req.body.age,
      image:req.body.image,
      username:req.body.username,
      contact:req.body.contact,
      about:req.body.about
   })
   .then(function(createdUser){
      res.redirect("feed")
   })
   });
   router.get('/likes/:id', function(req, res, next) {
      usermodel.findOne({_id:req.params.id})
      .then(function(founded){
       founded.profilelike++;
       founded.save();
      })
      .then(function(saveuser){
         res.redirect("back")
      })
     }); 

module.exports = router;
