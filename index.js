
const express = require('express');
const app = express();
const port = 3000;


const bodyParser = require('body-parser'); // For parsing form data
const { MongoClient } = require('mongodb');
// const connectToDatabase = require('./db');

app.use(bodyParser.urlencoded({ extended: true }));
const mongoURL = 'mongodb+srv://shettyankith:mjnLh9heUyr7fXd@cluster0.uaivfyu.mongodb.net/?retryWrites=true&w=majority/HelpDesk'; 


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

  



// Define a route for handling form submissions
app.post('/submit-form', (req, res) => {
  const formData = req.body; // Get form data from the request

  // Connect to MongoDB
  MongoClient.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
      console.error('Error connecting to MongoDB:', err);
      res.status(500).send('Error connecting to the database');
      return;
    }

    const db = client.db(); // Get the database instance
    // Insert the form data into the "contactusform" collection
    db.collection('contactusform').insertOne(formData, (err, result) => {
      if (err) {
        console.error('Error inserting data into MongoDB:', err);
        res.status(500).send('Error submitting form');
        client.close();
        return;
      }

      console.log('Form data submitted:', formData);

      // Close the MongoDB connection
      client.close();

      // Send a response with a success message
      res.status(200).send('Form submitted successfully');
    });
  });
});











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
