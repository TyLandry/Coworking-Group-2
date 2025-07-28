
document.addEventListener("DOMContentLoaded", () => {
  const rentBtn = document.querySelector(".rent-btn");
  const contactBtn = document.querySelector(".contact-btn");
  // this if statement checks if the buttons exist before adding event listeners
  if (rentBtn) {
    rentBtn.addEventListener("click", () => {
      alert("Rented successfully!");

    });
  }
 
  if (contactBtn) {
    contactBtn.addEventListener("click", () => {
      window.location.href = "contactInfo.html";
    });
  }
});
