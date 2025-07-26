/* @Description: We have used ChatGpt only as a guide to clarify doubts and add new functionalities we have seen or don't remember. Lizzy
OpenAI. (2025). ChatGPT (June 2025 version). https://chat.openai.com/*/

// HEADER
//Created a class called LandingPage
export class LandingPage {
  //Created a local function/method called init to call all the methods inside of the class
  init() {
    //NAVBAR
    this.createNavbar();

    //TITLE and Subtitle + Hero Buttons
    this.createHero();

    //Mid section paragraphs
    this.fillMidSections();

    //FOOTER
    this.createFooter();
  }

  createNavbar() {
    //NAVBAR
    const nav = document.createElement("nav");

    //LOGO
    const logoDiv = document.createElement("div");
    logoDiv.className = "logo";

    const logoImg = document.createElement("img");
    logoImg.src = "images/coworking.png";
    logoImg.alt = "Coworking Logo";
    logoImg.style.height = "80px";
    logoDiv.appendChild(logoImg);


    //Navbar
    const navLinks = document.createElement("div");
    navLinks.className = "nav-links";

    const linkHome = document.createElement("a");
    linkHome.href = "index.html";
    linkHome.textContent = "Home";  
    navLinks.appendChild(linkHome);

    //added to get into logged mode
    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (loggedUser) {//appears whoever logged in
    // DASHBOARD
    const dashboardLink = document.createElement("a");
    dashboardLink.href = loggedUser.role.toLowerCase() === "owner"
      ? "ownerDashboard.html"
      : "coworkerDashboard.html";
    dashboardLink.textContent = "Dashboard";
    navLinks.appendChild(dashboardLink);

    // LOGOUT
    const logoutBtn = document.createElement("button");
    logoutBtn.className = "login-button-nav";
    logoutBtn.textContent = "Logout";
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      window.location.href = "index.html";
    });
    navLinks.appendChild(logoutBtn);
  } else {

    const linkSignUp = document.createElement("a");
    linkSignUp.href = "register.html";
    linkSignUp.textContent = "Sign Up";
     navLinks.appendChild(linkSignUp);

    const loginBtnNav = document.createElement("button");
    loginBtnNav.className = "login-button-nav";
    loginBtnNav.textContent = "Login";

    //Login button form Nav will direct to Login Page
    loginBtnNav.addEventListener("click", () => {
      window.location.href = "login.html";
    });

    //Links added to Nav Bar
  
    navLinks.appendChild(loginBtnNav);
  }
    nav.appendChild(logoDiv);
    nav.appendChild(navLinks);
    document.getElementById("navbar-container")?.appendChild(nav);
  }

  createHero() {
    //TITLE
    const pageTitle = document.createElement("h1");
    pageTitle.className = "pageTitle";
    pageTitle.textContent = "Welcome to Coworking Page";

    //DOM
    document.getElementById("title")?.appendChild(pageTitle);

    //TITLE and Subtitle
    const subTitle = document.createElement("h5");
    subTitle.textContent =
      "Connect with premium workspace solutions. Whether you're looking for a space or offering one, we've got you covered.";
    document.getElementById("subTitle")?.appendChild(subTitle);

    //Btns Get Started and Login - Hero Section
    const btnContainer = document.createElement("div");
    btnContainer.className = "hero-btns";

    const getStartedBtn = document.createElement("button");
    getStartedBtn.className = "register-btn";
    getStartedBtn.textContent = "Sign Up";
    getStartedBtn.addEventListener("click", () => {
      window.location.href = "register.html";
    });

    const loginBtnMainPage = document.createElement("button");
    loginBtnMainPage.className = "login-btn-main";
    loginBtnMainPage.textContent = "Login";
    loginBtnMainPage.addEventListener("click", () => {
      window.location.href = "login.html";
    });

    btnContainer.appendChild(getStartedBtn);
    btnContainer.appendChild(loginBtnMainPage);

    //CARDS
    const btnPlaceholder = document.getElementById("hero-button-placeholder");
    btnPlaceholder?.appendChild(btnContainer);
  }

  fillMidSections() {
    //Mid section paragraphs
    document.getElementById("midSection").textContent =
      "Rent your property. Find your perfect Workspace.";
    document.getElementById("subParagraph").textContent =
      "Everything you need to rent a property and rent a workspace, you can find here";

    //Paragraph end of Page
    document.getElementById("endSection").textContent = "Ready to start?";
    document.getElementById("lastParagraph").textContent =
      "Join to our group of professionals who have already rented properties or found their workspace.";
  }

  createFooter() {
    //FOOTER
    const footer = document.querySelector("footer");
    const footerContainer = document.createElement("div");
    footerContainer.className = "footer-container";

    //Column 1 - Text
    const column1 = document.createElement("div");
    column1.className = "footer-column";
    const p = document.createElement("p");

    //FOOTER PARAGRAPH
    p.textContent =
      "CCorworking connecting you and other professional to the best property and workspace.";
    column1.appendChild(p);

    //Column 2 - Links
    const column2 = document.createElement("div");
    column2.className = "footer-column";
    column2.innerHTML = `
      <h4>Quick Links</h4>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="register.html">Sign Up</a></li>
      </ul>
    `;

    //Column 3 - Socials
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

    //Footer bottom
    const bottom = document.createElement("div");
    bottom.className = "footer-bottom";
    bottom.innerHTML = `
      ©2024 Coworking Group 2 Project. All rights reserved |
      <a href="#" style="color:white;">Privacy Policy</a> |
      <a href="#" style="color:white;">Terms & Conditions</a>
    `;

    footer?.appendChild(footerContainer);
    footer?.appendChild(bottom);
  }
}


/* @Description: I have used ChatGpt only as a guide to clarify doubts and add new functionalities I have seen or don't remember. Lizzy
OpenAI. (2025). ChatGPT (June 2025 version). https://chat.openai.com/*/


// //HEADER


// // NAVBAR
// const nav = document.createElement("nav");

// // LOGO

// const logoDiv = document.createElement("div");
// logoDiv.className = "logo";

// const logoImg = document.createElement("img");
// logoImg.src = "images/coworking.png";
// logoImg.alt = "Coworking Logo";
// logoImg.style.height = "80px";

// logoDiv.appendChild(logoImg);


// // Navbar
// const navLinks = document.createElement("div");
// navLinks.className = "nav-links";

// const linkHome = document.createElement("a");
// linkHome.href = "index.html"; 
// linkHome.textContent = "Home";

// const linkSignUp = document.createElement("a");
// linkSignUp.href = "register.html";
// linkSignUp.textContent = "Sign Up";

// const loginBtnNav = document.createElement("button");
// loginBtnNav.className = "login-button";
// loginBtnNav.textContent = "Login";


// //Login button form Nav will direct to Login Page
// loginBtnNav.addEventListener("click", () => {
//   window.location.href = "login.html";
// });


// // Links added to Nav Bar 

// navLinks.appendChild(linkHome);
// navLinks.appendChild(linkSignUp);
// navLinks.appendChild(loginBtnNav);

// nav.appendChild(logoDiv);
// nav.appendChild(navLinks);
// document.getElementById("navbar-container").appendChild(nav);

// //TITLE
// const pageTitle = document.createElement("h1");
// pageTitle.textContent = "Welcome to Coworking Page";

// //DOM
// document.getElementById("title").appendChild(pageTitle);


// //TITLE and Subtitle
// const subTitle = document.createElement("h5");
// subTitle.textContent =
//   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
// document.getElementById("subTitle").appendChild(subTitle);

// //Btns Get Started nad Login - Hero Section
// const btnContainer = document.createElement("div");
// btnContainer.className = "hero-btns";

// const getStartedBtn = document.createElement("button");
// getStartedBtn.className = "get-started";
// getStartedBtn.textContent = "Get Started";
// getStartedBtn.addEventListener("click", () => {
//   window.location.href = "create-account.html";
// });

// const loginBtn = document.createElement("button");
// loginBtn.className = "login-btn";
// loginBtn.textContent = "Login";
// loginBtn.addEventListener("click", () => {
//   window.location.href = "login.html";
// });

// btnContainer.appendChild(getStartedBtn);
// btnContainer.appendChild(loginBtn);

// //CARDS
// const btnPlaceholder = document.getElementById("hero-button-placeholder");
// btnPlaceholder.appendChild(btnContainer);

// // Mid section paragraphs 

// document.getElementById("midSection").textContent =
//   "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
// document.getElementById("subParagraph").textContent =
//   "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

// // Paragraph end of Page
// document.getElementById("endSection").textContent =
//   "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
// document.getElementById("lastParagraph").textContent =
//   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

// // FOOTER 
// const footer = document.querySelector("footer");
// const footerContainer = document.createElement("div");
// footerContainer.className = "footer-container";

// // Column 1 - Text
// const column1 = document.createElement("div");
// column1.className = "footer-column";
// const p = document.createElement("p");

// //FOOTER PARAGRAPH

// p.textContent =
//   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
// column1.appendChild(p);

// // Column 2 -Links
// const column2 = document.createElement("div");
// column2.className = "footer-column";
// column2.innerHTML = `
//   <h4>Quick Links</h4>
//   <ul>
//     <li><a href="#">Home</a></li>
//     <li><a href="register.html">Sign Up</a></li>

// `;

// // Column 3 - Socials
// const column3 = document.createElement("div");
// column3.className = "footer-column";
// column3.innerHTML = `
//   <h4>Socials</h4>
//   <ul>
//     <li><a href="#">Instagram</a></li>
//     <li><a href="#">Facebook</a></li>
//   </ul>
// `;

// footerContainer.appendChild(column1);
// footerContainer.appendChild(column2);
// footerContainer.appendChild(column3);

// // Footer bottom
// const bottom = document.createElement("div");
// bottom.className = "footer-bottom";
// bottom.innerHTML = `
//   ©2024 Company Name. All rights reserved |
//   <a href="#" style="color:white;">Privacy Policy</a> |
//   <a href="#" style="color:white;">Terms & Conditions</a>
// `;

// footer.appendChild(footerContainer);
// footer.appendChild(bottom);