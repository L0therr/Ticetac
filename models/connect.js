const mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true
   };

mongoose.connect("mongodb+srv://admin:@lphabetaTango9@cluster0-k0fxq.gcp.mongodb.net/test?retryWrites=true&w=majority", options, error =>{
    if (error) {
   console.log("ATTENTION ERREUR:", error);
  } else {
      console.log("====== BDD CONNECTED")
  }
});

module.exports = mongoose;