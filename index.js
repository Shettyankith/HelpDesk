
const express = require('express');
const app = express();
const port = 3000;
const mongoose =require('mongoose');
const bodyParser = require('body-parser'); // For parsing form data
// const { MongoClient } = require('mongodb');
app.use(bodyParser.urlencoded({ extended: true }));


// const mongoURL = 'mongodb+srv://shettyankith2003:54wGOjwGgbv1Qldo@cluster0.u1wptqf.mongodb.net/Helpdesk'; 
mongoose.connect("mongodb+srv://shettyankith2003:54wGOjwGgbv1Qldo@cluster0.u1wptqf.mongodb.net/Helpdesk",{ useNewUrlParser: true}, {useUnifiedTopology: true });
const formschema={
  studentName: String,
  parentName: String,
  state: String,
  contactNo: String,
  email: String
}
const details=mongoose.model("details",formschema);

app.post("/",function(req,res){
  let newdetails=new details({
    studentName:req.body.studentName,
    parentName:req.body.parentName,
    state:req.body.state,
    contactNo:req.body.contactNo,
    email:req.body.email
  });
  newdetails.save();
  res.redirect("/");
})









// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static assets (CSS, images, etc.) from a directory (e.g., 'public')
app.use(express.static('public'));

// Define route handlers for each template
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/service', (req, res) => {
  res.render('service');
});

app.get('/contactus', (req, res) => {
  res.render('contactus');
});

  



// // Define a route for handling form submissions
// app.post('/', (req, res) => {
//   const formData = req.body; // Get form data from the request

//   // Connect to MongoDB
//   MongoClient.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
//     if (err) {
//       console.error('Error connecting to MongoDB:', err);
//       res.status(500).send('Error connecting to the database');
//       return;
//     }

//     const db = client.db(); // Get the database instance
//     // Insert the form data into the "contactusform" collection
//     db.collection('contactusform').insertOne(formData, (err, result) => {
//       if (err) {
//         console.error('Error inserting data into MongoDB:', err);
//         res.status(500).send('Error submitting form');
//         client.close();
//         return;
//       }

//       console.log('Form data submitted:', formData);

//       // Close the MongoDB connection
//       client.close();

//       // Send a response with a success message
//       res.status(200).send('Form submitted successfully');
//     });
//   });
// });











app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


if (typeof window !== 'undefined') {
    // Your client-side code here
    function openSidebar() {
      document.getElementById("mySidebar").style.width = "250px";
      document.getElementById("mySidebar").style.left = "0";
      document.getElementById("navbar").style.visibility = "hidden";
    }
  
    function closeSidebar() {
      document.getElementById("mySidebar").style.width = "0";
      document.getElementById("mySidebar").style.left = "-250px";
      document.getElementById("navbar").style.visibility = "visible";
    }
  
    // Add an event listener to the button with class ".btn"
    document.getElementById("contactButton").addEventListener("click", function() {
      // Redirect to the "contactus.html" file
      window.location.href = "contactus.html";
    });
  }
