
document.addEventListener("DOMContentLoaded", () => {
  const rentBtn = document.querySelector(".rent-btn");
  const contactBtn = document.querySelector(".contact-btn");


  contactBtn.addEventListener("click", () => {
    window.location.href = "contactInfo.html";
  });
});
