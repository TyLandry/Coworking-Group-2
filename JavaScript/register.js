//Register.js
//Created class Register
export class Register {

  register() {
    const form = document.getElementById("registration-form");
    if (!form){
      return;
    } 
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const firstName = document.getElementById("firstName").value.trim();
      const lastName = document.getElementById("lastName").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const password = document.getElementById("password").value.trim();
      const role = document.getElementById("role").value;

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\d{10}$/;

      //Error handling for credentials
      if (!emailRegex.test(email)) {
        return this.showMessage("Invalid email format.", true);
      }

      if (!phoneRegex.test(phone)) {
        return this.showMessage("Phone number must be 10 digits.", true);
      }

      //Save to localStorage
      //Adding local data storage by converting the data to string using .stringify()
      // const saveUsers = {firstName, lastName, email, phone, password, role};
      // //adds the new user 
      // const users = JSON.parse(localStorage.getItem("users")) || [];
      // //Checks for duplicates (Specifically for Email and Phone)
      // const duplicate = users.find(user => user.email === email || user.phone === phone);
      // if (duplicate) {
      //   return this.showMessage("This account might already been taken", true);
      // }
      // users.push(saveUsers);
      // //Saves the new User inside of the "local storage"
      // localStorage.setItem("users", JSON.stringify(users));

      //Save the info using DB
      
      try {
        const res = await fetch("http://localhost:3000/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ firstName, lastName, email, phone, password, role }),
        });

        const data = await res.json();

        if (!res.ok) {
          // Your backend returns { message: "..." }
          return this.showMessage(data?.message || `Registration failed (${res.status})`, true);
        }

        this.showMessage("Registration successful!", false);
        form.reset();
        //Redirects to login.html
        setTimeout(() => {
          window.location.href = "login.html";
        }, 1500);

      } catch (err) {
        console.error(err);
        this.showMessage("Network or server error.", true);
      }
    });
  }

  showMessage(msg, isError) {
    const messageEl = document.getElementById("formMessage");
    if (messageEl) {
      messageEl.textContent = msg;
      messageEl.style.color = isError ? "red" : "green";
    }
  }

}

//Used the old code in order to convert it to a Class
// document.getElementById("registration-form").addEventListener("submit", function (e) {
//   e.preventDefault();

//   const firstName = document.getElementById("firstName").value.trim();
//   const lastName = document.getElementById("lastName").value.trim();
//   const email = document.getElementById("email").value.trim();
//   const phone = document.getElementById("phone").value.trim();
//   const password = document.getElementById("password").value.trim();
//   const role = document.getElementById("role").value;

//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   const phoneRegex = /^\d{10}$/;

//   if (!emailRegex.test(email)) {
//     return showMessage("Invalid email format.", true);
//   }

//   if (!phoneRegex.test(phone)) {
//     return showMessage("Phone number must be 10 digits.", true);
//   }
  
//   //Adding local data storage by converting the data to string using .stringify()
//   const saveUsers = {firstName, lastName, email, phone, password, role};
//   const users = JSON.parse(localStorage.getItem("users")) || [];
//   //adds the new user 
//   users.push(saveUsers);
//   //Saves the new User inside of the "local storage"
//    localStorage.setItem("users", JSON.stringify(users));

//   showMessage("Registration successful!", false);
//   document.getElementById("registration-form").reset();
// });

// function showMessage(msg, isError) {
//   const messageEl = document.getElementById("formMessage");
//   messageEl.textContent = msg;
//   messageEl.style.color = isError ? "red" : "green";
// }
