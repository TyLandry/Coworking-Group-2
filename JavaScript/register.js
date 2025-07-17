document.getElementById("registration-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.getElementById("role").value;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;

  if (!emailRegex.test(email)) {
    return showMessage("Invalid email format.", true);
  }

  if (!phoneRegex.test(phone)) {
    return showMessage("Phone number must be 10 digits.", true);
  }

  showMessage("Registration successful!", false);
  document.getElementById("registration-form").reset();
});

function showMessage(msg, isError) {
  const messageEl = document.getElementById("formMessage");
  messageEl.textContent = msg;
  messageEl.style.color = isError ? "red" : "green";
}
