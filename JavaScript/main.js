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

//repeated it is coming from landing page correctly
// const navbarContainer = document.getElementById("navbar-container");

// if (navbarContainer) {
//   navbarContainer.innerHTML = `
//     <nav>
//       <img src="images/logo.png" alt="Logo" class="logo" />
//       <div class="nav-links">
//         <a href="index.html">Home</a>
//         <a href="login.html">Login</a>
//         <a href="register.html">Register</a>
//       </div>
//     </nav>
//   `
// }



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

//Call AddProperty
import {AddProperty} from './addproperty.js';
//Only run AddProperty if the addPropertyForm exists
const formElement = document.getElementById("addPropertyForm");
if (formElement) {
  new AddProperty("addPropertyForm"); 
}

//Import ownerdashboard 
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
const propertyDetails = new PropertyDetails();

//Code checks what page is currently loaded and runs the login handler if it's the login page
if (window.location.pathname.includes("login.html")) {
  const login = new Login();
  login.login();
}

// Importing coworkerDashboard
try {
  const path = window.location.pathname.toLowerCase();
  if (path.includes("coworkerDashboard.html")) {
    const coworker = new CoworkerDashboard("propertiesGallery", "searchWorkspace", "sortDropdown", "filterDropdown");
  }
} catch (err) {
  console.error("CoworkerDashboard failed to load:", err.message);
}



