/* @Description: I have used ChatGpt only as a guide to clarify doubts and add new functionalities I have seen or don't remember. Lizzy
OpenAI. (2025). ChatGPT (June 2025 version). https://chat.openai.com/*/


//HEADER


// NAVBAR
const nav = document.createElement("nav");

// LOGO

const logoDiv = document.createElement("div");
logoDiv.className = "logo";

const logoImg = document.createElement("img");
logoImg.src = "images/coworking.png";
logoImg.alt = "Coworking Logo";
logoImg.style.height = "80px";

logoDiv.appendChild(logoImg);


// Navbar
const navLinks = document.createElement("div");
navLinks.className = "nav-links";

const linkHome = document.createElement("a");
linkHome.href = "#home";
linkHome.textContent = "Home";

const linkSignUp = document.createElement("a");
linkSignUp.href = "#signup";
linkSignUp.textContent = "Sign Up";

const loginBtnNav = document.createElement("button");
loginBtnNav.className = "login-button";
loginBtnNav.textContent = "Login";


//Login button form Nav will direct to Login Page
loginBtnNav.addEventListener("click", () => {
  window.location.href = "login.html";
});


// Links added to Nav Bar 

navLinks.appendChild(linkHome);
navLinks.appendChild(linkSignUp);
navLinks.appendChild(loginBtnNav);

nav.appendChild(logoDiv);
nav.appendChild(navLinks);
document.getElementById("navbar-container").appendChild(nav);

//TITLE
const pageTitle = document.createElement("h1");
pageTitle.textContent = "Welcome to Coworking Page";

//DOM
document.getElementById("title").appendChild(pageTitle);


//TITLE and Subtitle
const subTitle = document.createElement("h5");
subTitle.textContent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
document.getElementById("subTitle").appendChild(subTitle);

//Btns Get Started nad Login - Hero Section
const btnContainer = document.createElement("div");
btnContainer.className = "hero-btns";

const getStartedBtn = document.createElement("button");
getStartedBtn.className = "get-started";
getStartedBtn.textContent = "Rent";
getStartedBtn.addEventListener("click", () => {
  window.location.href = "create-account.html";
});

const loginBtn = document.createElement("button");
loginBtn.className = "login-btn";
loginBtn.textContent = "Login";
loginBtn.addEventListener("click", () => {
  window.location.href = "login.html";
});

btnContainer.appendChild(getStartedBtn);
btnContainer.appendChild(loginBtn);

//CARDS
const btnPlaceholder = document.getElementById("hero-button-placeholder");
btnPlaceholder.appendChild(btnContainer);

// Mid section paragraphs 

document.getElementById("midSection").textContent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
document.getElementById("subParagraph").textContent =
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

// Paragraph end of Page
document.getElementById("endSection").textContent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
document.getElementById("lastParagraph").textContent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

// FOOTER 
const footer = document.querySelector("footer");
const footerContainer = document.createElement("div");
footerContainer.className = "footer-container";

// Column 1 - Text
const column1 = document.createElement("div");
column1.className = "footer-column";
const p = document.createElement("p");

//FOOTER PARAGRAPH

p.textContent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
column1.appendChild(p);

// Column 2 -Links
const column2 = document.createElement("div");
column2.className = "footer-column";
column2.innerHTML = `
  <h4>Quick Links</h4>
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">Sign Up</a></li>

`;

// Column 3 - Socials
const column3 = document.createElement("div");
column3.className = "footer-column";
column3.innerHTML = `
  <h4>Socials</h4>
  <ul>
    <li><a href="#">Instagram</a></li>
    <li><a href="#">Facebook</a></li>
  </ul>
`;

footerContainer.appendChild(column1);
footerContainer.appendChild(column2);
footerContainer.appendChild(column3);

// Footer bottom
const bottom = document.createElement("div");
bottom.className = "footer-bottom";
bottom.innerHTML = `
  ©2024 Company Name. All rights reserved |
  <a href="#" style="color:white;">Privacy Policy</a> |
  <a href="#" style="color:white;">Terms & Conditions</a>
`;

footer.appendChild(footerContainer);
footer.appendChild(bottom);