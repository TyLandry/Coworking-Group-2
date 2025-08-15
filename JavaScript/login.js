//Converted the code into a class for modular style programming and a little bit of OOP style of approach
export class Login {
  //Used for testing
  // constructor() {
  //   this.validEmail = "user@example.com";
  //   this.validPassword = "password123";
  // }

  login() {
    const loginForm = document.querySelector(".login-form");
    if (!loginForm) {
      return;
    };

    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;

      //Adds the users on the handleLogin local function/method
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const userFound = users.find((user) => user.email === email && user.password === password
      );
    
     if (userFound) { 
      

        //  trying the logged to appear dashboard and logout on the nav bar -- Lizzy
        localStorage.setItem("loggedInUser", JSON.stringify(userFound));

        //I replaced the alert into this "show" sign to alert the user that has been logged in successfully.  it comes fro the DOM main. then it will not allow to load twice the same message
        localStorage.setItem("loginMessage", "show");
    
        //alert("Login successful!");
        // Redirect based on user role, "over" for owner, "coworker" for coworker.
        if (userFound.role === "owner") {
          window.location.href = "ownerdashboard.html";
        } else if (userFound.role === "coworker") {
          window.location.href = "coworkerDashboard.html";
        } else {
          window.location.href = "index.html"; // fallback
        }
        // To check if the form did go through
        console.log("Form submitted with:", email, password);
    
      } else {
        alert("Invalid email or password.");
        console.log("Form was inputted with wrong credentials:", email, password);
      }

      // if (email === this.validEmail && password === this.validPassword) {
      //   alert("Login successful!");
      //   window.location.href = "index.html";
      //   //To check if the form did go through
      //   console.log("Form submitted with:", email, password);
      // } else {
      //   alert("Invalid email or password.");
      //   console.log("Form was inputted with wrong credentials.")
      // }
    });
  }
};