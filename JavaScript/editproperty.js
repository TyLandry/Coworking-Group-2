//Retrieve properties from localStorage
const properties = JSON.parse(localStorage.getItem("properties")) || [];

//Retrieve the property ID to edit
// NOTE: in DB mode this may be a MongoDB string _id, so keep as string
const editingPropertyId = localStorage.getItem("editingPropertyId");
let editingProperty = properties.find(
  prop => prop.id === parseInt(editingPropertyId, 10) || prop._id === editingPropertyId
);

// Function to populate the form fields with the property details
async function populateForm(propertyId) {
  // Try fetching from backend if possible
  let property = editingProperty;
  try {
    const res = await fetch(`http://localhost:3000/api/properties/${propertyId}`);
    const data = await res.json();
    if (res.ok) {
      property = data;
      editingProperty = data;
    }
  } catch (err) {
    console.error("Failed to fetch property:", err);
  }

  if (!property) {
    alert("Property not found.");
    window.location.href = "./ownerdashboard.html"; // Redirect to dashboard if property is not found
    return;
  }

  document.getElementById("propertyName").value = property.name || "";
  document.getElementById("propertyAddress").value = property.address || "";
  document.getElementById("propertyNeighborhood").value = property.neighborhood || "";
  document.getElementById("propertySquareFootage").value = property.sqft ?? property.squareFootage ?? 0;
  document.getElementById("propertyPhoto").value = property.photo || "";
  document.getElementById("propertyParking").checked = property.parking || false;
  document.getElementById("propertyPublicTransit").checked = property.publicTransportation ?? property.publicTransit ?? false;
}

//Function to handle form submission
document.getElementById("editPropertyForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  //Update property details
  const updatedProperty = {
    ...editingProperty,
    name: document.getElementById("propertyName").value,
    address: document.getElementById("propertyAddress").value,
    neighborhood: document.getElementById("propertyNeighborhood").value,
    sqft: parseInt(document.getElementById("propertySquareFootage").value, 10),
    photo: document.getElementById("propertyPhoto").value,
    parking: document.getElementById("propertyParking").checked,
    publicTransportation: document.getElementById("propertyPublicTransit").checked,
  };

  //Try API update first
  const token = sessionStorage.getItem("token");
  try {
    const res = await fetch(`http://localhost:3000/api/properties/${editingPropertyId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(updatedProperty)
    });
    const data = await res.json();
    if (res.ok) {
      alert("Property updated successfully!");
      localStorage.setItem("selectedPropertyId", editingPropertyId);
      window.location.href = "./propertydetails.html";
      return;
    } else {
      console.warn("API update failed:", data?.message);
    }
  } catch (err) {
    console.error("API update error:", err);
  }

  //Replace the old property with the updated one in the properties array (fallback localStorage)
  const propertyIndex = properties.findIndex(
    prop => prop.id === parseInt(editingPropertyId, 10)
  );
  if (propertyIndex !== -1) {
    properties[propertyIndex] = updatedProperty;
  }

  //Method to save the updated properties array to localStorage
  localStorage.setItem("properties", JSON.stringify(properties));

  //Method to redirect back to the property details page
  localStorage.setItem("selectedPropertyId", editingPropertyId);
  alert("Property updated successfully!");
  window.location.href = "./propertydetails.html";
});

//Function call to populate the form with the current property details
populateForm(editingPropertyId);
