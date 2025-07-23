// Retrieve properties from localStorage
const properties = JSON.parse(localStorage.getItem("properties")) || [];

// Retrieve the property ID to edit
const editingPropertyId = parseInt(localStorage.getItem("editingPropertyId"), 10);
const editingProperty = properties.find(prop => prop.id === editingPropertyId);

// Function to populate the form fields with the property details
function populateForm(property) {
  if (!property) {
    alert("Property not found.");
    window.location.href = "./ownerdashboard.html"; // Redirect to dashboard if property is not found
    return;
  }

  document.getElementById("propertyName").value = property.name;
  document.getElementById("propertyAddress").value = property.address;
  document.getElementById("propertyNeighborhood").value = property.neighborhood;
  document.getElementById("propertySize").value = property.squareFootage;
  document.getElementById("propertyPhoto").value = property.photo;
  document.getElementById("propertyParking").checked = property.parking;
  document.getElementById("propertyPublicTransit").checked = property.publicTransit;
}

// Function to handle form submission
document.getElementById("editPropertyForm").addEventListener("submit", function (event) {
  event.preventDefault();

  // Update property details
  const updatedProperty = {
    ...editingProperty,
    name: document.getElementById("propertyName").value,
    address: document.getElementById("propertyAddress").value,
    neighborhood: document.getElementById("propertyNeighborhood").value,
    squareFootage: parseInt(document.getElementById("propertySize").value, 10),
    photo: document.getElementById("propertyPhoto").value,
    parking: document.getElementById("propertyParking").checked,
    publicTransit: document.getElementById("propertyPublicTransit").checked,
  };

  // Replace the old property with the updated one in the properties array
  const propertyIndex = properties.findIndex(prop => prop.id === editingPropertyId);
  if (propertyIndex !== -1) {
    properties[propertyIndex] = updatedProperty;
  }

  // Method to save the updated properties array to localStorage
  localStorage.setItem("properties", JSON.stringify(properties));

  // Method to redirect back to the property details page
  localStorage.setItem("selectedPropertyId", editingPropertyId);
  alert("Property updated successfully!");
  window.location.href = "./propertydetails.html";
});

// Function call to populate the form with the current property details
populateForm(editingProperty);