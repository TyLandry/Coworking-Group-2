

//HEADER

// Logo
const logo = document.createElement("div");
logo.className = "logo";
logo.textContent = "Logo";


// Container for the nav bar
const nav = document.createElement("nav");
const navLinks = document.createElement("div");
navLinks.className = "nav-links";

// Nav bar 
const navItems = [
  { type: "link", text: "Home", href: "#home" },
  { type: "link", text: "Sign Up", href: "#signup" },
  { type: "button", text: "Login", class: "login-button" }
];


navItems.forEach(item => {
  if (item.type === "link") {
    const a = document.createElement("a");
    a.href = item.href;
    a.textContent = item.text;
    navLinks.appendChild(a);
  } else if (item.type === "button") {
    const btn = document.createElement("button");
    btn.textContent = item.text;
    btn.className = item.class;
    navLinks.appendChild(btn);
  }
});

//nav bar appended
nav.appendChild(logo);
nav.appendChild(navLinks);

// Dom inserted
document.getElementById("navbar-container").appendChild(nav);


//TITLE and Subtitle

let title = "Welcome to Coworking Page";
let pageTitle = document.createElement("h1");

pageTitle.textContent = title;
document.getElementById("title").appendChild(pageTitle);

let subTitle = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation";

let subTitlePage = document.createElement("h5");

subTitlePage.textContent = subTitle;
document.getElementById("subTitle").appendChild(subTitlePage);

let getStartedBtn = document.createElement("button");

// getStartedBtn.