
document.addEventListener("DOMContentLoaded", () => {
  const selectButtons = document.querySelectorAll(".select-btn");

  selectButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      window.location.href = "workplacedetails.html";
    });
  });
});
