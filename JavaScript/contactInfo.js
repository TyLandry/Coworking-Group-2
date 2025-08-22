/* @Description: We have used ChatGpt only as a guide to support me on how to link into the localStorage the info of the Owner's contact info and the workspace linking.I had to learn how to do the pop up window for the email after clicking the contact  Lizzy
OpenAI. (2025). ChatGPT (June 2025 version). https://chat.openai.com/*/



    // //It will bring up the email from Owner Contact
    // const ownerEmail = localStorage.getItem("ownerEmail");

    // //retrieves the users added to JSON local storage file
    // const users = JSON.parse(localStorage.getItem("users")) || [];

    // //searches the owner's email from the localStorage
    // const owner = users.find((user) => user.email === ownerEmail);//---I am not sure about this until we get Contact

    //Find the workspace's property
const selectedWorkspaceId = (localStorage.getItem("selectedWorkspaceId") || "").trim();
//To display the name of the workspace from localstorage
  const workspaceName = localStorage.getItem("workspaceName");
const properties = JSON.parse(localStorage.getItem("properties")) || [];
const users = JSON.parse(localStorage.getItem("users")) || [];

//Error Handling Method to check if all the data are firing properly
console.log("selectedWorkspaceId:", selectedWorkspaceId);
console.log("All properties:", properties);
console.log("All users:", users);

let owner = null;
let property = null;

//Loop to find its property and the ID of the workspace 
for (const p of properties) {
  const workspace = p.workspaces?.find(w => (String(w.id) === selectedWorkspaceId) || (w._id === selectedWorkspaceId));
  if (workspace) {
    property  = p;
    break;
  }
}

const ownerEmail = (localStorage.getItem("selectedOwnerEmail") || "").trim() || (property?.ownerEmail || "");

(async () => {
  if (property && ownerEmail) {
    owner = users.find(user => user.email == ownerEmail) || null;
  }

  if (!owner && ownerEmail) {
    try {
      const res = await fetch(`http://localhost:3000/api/owners/${encodeURIComponent(ownerEmail)}`);
      const data = await res.json();
      if (res.ok && data) {
        owner = { firstName: data.firstName || "", lastName: data.lastName || "", phone: data.phone || "", email: data.email || ownerEmail };
      }
    } catch (e) {
      console.error("Failed to fetch owner info:", e);
    }
  }

    if(owner){
        document.getElementById("ownerName").textContent = `${owner.firstName} ${owner.lastName}`;
        document.getElementById("ownerDescription").textContent = `Owner`;
        document.getElementById("ownerPhone").textContent = `Phone: ${owner.phone || "-"}`;
        document.getElementById("ownerEmail").textContent = `Email: ${owner.email}`;
    }else {
        console.error("Owner not found");
        document.getElementById("ownerName").textContent = "Unknown Owner";
        document.getElementById("ownerDescription").textContent = "No info found.";
        document.getElementById("ownerPhone").textContent = "Phone: -";
        document.getElementById("ownerEmail").textContent = `Email: ${ownerEmail || "-"}`;
    }

    if (workspaceName) {
    const workspaceTitle = document.getElementById("workspaceName");
    if (workspaceTitle) {
      workspaceTitle.textContent = workspaceName;
    }
  
  }
})();

//The btn here once clicked will popup a window to write an email to the owner.

  const contactBtn = document.querySelector(".contact-btn-owner");
  const modal = document.getElementById("contactModal");
  const closeBtn = document.querySelector(".close-btn");
  const sendBtn = document.getElementById("sendBtn");

  //opens modal
  if (contactBtn) {
    contactBtn.addEventListener("click", () => {
      modal.classList.remove("hidden");//keep the popup window hidden until the btn is clicked
    });
  }
//close modal
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.classList.add("hidden");//closing the popup window by the X
    });
  }
//send email
  if (sendBtn) {
    sendBtn.addEventListener("click", () => {
      const email = document.getElementById("popupEmail").value; //gets the user's email value
      const message = document.getElementById("popupMessage").value; //gets the user's message value

      if (email && message) { //then finally if the email and message are typed then it will display message sent
        alert(`Your message has been sent to ${ownerEmail || "the owner"}!`);
        modal.classList.add("hidden");

      } else {//otherwise will ask the coworker to fill both info before send email.
        alert("Please fill in both your email and message.");
      }
    });
  }
