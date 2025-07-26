// Handle form submission for adding a new property
document.getElementById("addPropertyForm").onsubmit = function (e) {
  e.preventDefault(); // Prevent the default form submission behavior

  // Retrieve form inputs
  const photo = document.getElementById("propertyPhoto").value;
  const address = document.getElementById("propertyAddress").value;
  const name = document.getElementById("propertyName").value;
  const neighborhood = document.getElementById("propertyNeighborhood").value;
  const squareFootage = parseInt(document.getElementById("propertySquareFootage").value, 10);
  const parking = document.getElementById("propertyParking").checked;
  const publicTransit = document.getElementById("propertyPublicTransit").checked;

  // Create a new property object
  const newProperty = {
    id: Date.now(), //Method to enerate a unique ID
    name: name,
    address: address,
    neighborhood: neighborhood,
    squareFootage: squareFootage,
    parking: parking,
    publicTransit: publicTransit,
    photo: photo,
    workspace: []
  };

  // Retrieve existing properties from localStorage or initialize an empty array
  const properties = JSON.parse(localStorage.getItem("properties")) || [];

  // Method to add the new property to the array
  properties.push(newProperty);

  // Method to save the updated properties array back to localStorage
  localStorage.setItem("properties", JSON.stringify(properties));

  // Show a success alert
  alert("Property added successfully!");

  // Redirect to the Owner Dashboard
  
  window.location.href = "./ownerdashboard.html";
};

