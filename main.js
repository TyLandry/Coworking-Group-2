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
  }else if (item.type === "button") {
  const btn = document.createElement("button");
  btn.textContent = item.text;
  btn.className = item.class;
  
// Login button form Nav will direct to Login Page
  btn.addEventListener("click", () => {
    window.location.href = "login.html";
  });

  navLinks.appendChild(btn);
  }
});

// Links added to Nav Bar

nav.appendChild(logoDiv);
nav.appendChild(navLinks);

// DOM
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

//Btns Get started nad Login - Hero section

const btnContainer = document.createElement("div");
btnContainer.className = "hero-btns";
document.querySelector("main").appendChild(btnContainer);

const getStartedBtn = document.createElement("button");
getStartedBtn.className = "get-started";
getStartedBtn.textContent = "Get Started";
getStartedBtn.addEventListener("click", function () {
  window.location.href = "create-account.html";
});


const loginBtn = document.createElement("button");
loginBtn.className = "login-btn";
loginBtn.textContent = "Login";
loginBtn.addEventListener("click", function () {
  window.location.href = "login.html";
});


btnContainer.appendChild(getStartedBtn);
btnContainer.appendChild(loginBtn);


//Mid Section paragraphs

const midSectionParagraph = document.createElement("h3");
midSectionParagraph.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
midSectionParagraph.id ="midSection";
document.querySelector("main").appendChild(midSectionParagraph);


//Sub Section

const subSectionP = document.createElement("h5");
subSectionP.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation";
subSectionP.id = "subParagraph";
document.querySelector("main").appendChild(subSectionP);

const cardSection = document.createElement("section");
cardSection.id = "card-section";
document.getElementById("subParagraph").insertAdjacentElement("afterend", cardSection);

const cardsPic = [
  { src: "images/property1.jpg", alt: "Building 1", label: "Private Office" },
  { src: "images/property2.jpg", alt: "Building 2", label: "Private Office" },
  { src: "images/property3.jpg", alt: "Building 3", label: "Private Office" },
  { src: "images/workplace1.jpg", alt: "Workspace 1", label: "Meeting Space" },
  { src: "images/workplace2.jpg", alt: "Workspace 2", label: "Shared Office" },
  { src: "images/workplace3.jpg", alt: "Workspace 3", label: "Meeting Space" }
];

cardsPic.forEach(data => {
  const card = document.createElement("div");
  card.className = "card";

  const img = document.createElement("img");
  img.src = data.src;
  img.alt = data.alt;

  const caption = document.createElement("p");
  caption.textContent = data.label;

  card.appendChild(img);
  card.appendChild(caption);

  cardSection.appendChild(card);
});

//Paragraph end of Page
const endOfPageParagraph = document.createElement("h3");
endOfPageParagraph.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
endOfPageParagraph.id ="endSection";
document.querySelector("main").appendChild(endOfPageParagraph);

const lastContent = document.createElement("h5");
lastContent.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation";
lastContent.id = "lastParagraph";
document.querySelector("main").appendChild(lastContent);


//FOOTER

const footer = document.querySelector("footer");

const footerContainer = document.createElement("div");
footerContainer.className = "footer-container";

// CCOLUMN 1 - PARAGRAPH AND LOGO
const column1 = document.createElement("div");
column1.className = "footer-column";

//FOOTER LOGO

const logoFooter = document.createElement("img");
logoFooter.src = "images/coworkingNoBckg.png";
logoFooter.alt = "Coworking Logo";
logoFooter.className = "footer-logo"; // classe do CSS com height e spacing

//FOOTER PARAGRAPH

const p = document.createElement("p");
p.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";


column1.appendChild(logoFooter);
column1.appendChild(p);

// COLUMN 2 - Links

const column2 = document.createElement("div");
column2.className = "footer-column";
column2.innerHTML = `
  <h4>Quick Links</h4>
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">Sign Up</a></li>
    <li><a href="#">Create Account</a></li>
  </ul>
`;

//COLUMN 3 - SOCIAL MEDIAS

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


const bottom = document.createElement("div");
bottom.className = "footer-bottom";
bottom.innerHTML = `
  ©2024 Company Name. All rights reserved |
  <a href="#" style="color:white;">Privacy Policy</a> |
  <a href="#" style="color:white;">Terms & Conditions</a>
`;

footer.appendChild(footerContainer);
footer.appendChild(bottom);