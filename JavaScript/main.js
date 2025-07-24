//For error testing, making sure that main JS fires on all HTML files
console.log("Main script is running!");

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


// code checks what page is currently loaded and runs the login handler if it's the login page
if (window.location.pathname.includes("login.html")) {
  const login = new Login();
  login.login();
}
