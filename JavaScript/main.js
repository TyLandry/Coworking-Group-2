//For error testing, making sure that main JS fires on all HTML files
//Make sure to add type = "module" before src inside the script!
console.log("Main script is running!");

//trying the alert successfully logged in without the glitch using DOM here
document.addEventListener("DOMContentLoaded", () => {
  const loginMessage = localStorage.getItem("loginMessage");
  if (loginMessage === "show") {
    alert("Login successful!");
    localStorage.removeItem("loginMessage"); // prevent repeat
  }
});



//Call landing page
import {LandingPage} from "./landing.js";
try {
  const landing = new LandingPage();
  landing.init();
  //Catch the landing page before it loads to other html and script.
  //Landing does try to load first before going to other imports.
  } catch (err) {
    console.log("Landing cannot load at this", err.message);
  }

//Manually add user so the owner doesnt need to create one
const defaultUser = {
  firstName: "Owner",
  lastName: "User",
  email: "user@example.com",
  phone: "1234567890",
  password: "password123",
  role: "owner"
};

let users = JSON.parse(localStorage.getItem("users")) || [];

//Only add the user if it doesnt exist
const exists = users.some(user => user.email === defaultUser.email);

if (!exists) {
  users.push(defaultUser);
  localStorage.setItem("users", JSON.stringify(users));
  console.log("Default owner account created.");
} else {
  console.log("Default owner account already exists.");
}

//Call login
import {Login} from "./login.js";
const loginForm = document.getElementById("login-form");

if (loginForm) {
  const login = new Login();
  login.login();
}else{
    console.log("Login page isn't responding.");
}

//Call register
import {Register} from './register.js';
const form = document.getElementById("registration-form");

if (form) {
  const registration = new Register();
  registration.register();
  console.log("Register handler attached");
}else{
  console.log("Error, not working");
}

//Import ownerdashboard


// Aj look this over, add property would not link back to owner dash after pushing add property button without addproperty.js file
//and edit property does not work either

import {Property} from './ownerdashboard.js';

//If statement to check if the buttons are existing on the current HTML so that DOM will know when to run this block of code
if (document.getElementById("propertiesGallery") && document.getElementById("addPropertyBtn")) {
  const property = new Property("propertiesGallery", "addPropertyBtn");
} else {
  //Error handling to know if the ownerdashboard isn't firing/working
  console.log("Elements are not found");
}

//Call property details
import {PropertyDetails} from './propertydetails.js';
document.addEventListener('DOMContentLoaded', () => {
  // Instantiate and render the selected property details
  const propertyDetails = new PropertyDetails();
});

//Code checks what page is currently loaded and runs the login handler if it's the login page
if (window.location.pathname.includes("login.html")) {
  const login = new Login();
  login.login();
}
