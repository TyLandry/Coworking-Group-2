// Retrieve properties and selected property ID from localStorage
const properties = JSON.parse(localStorage.getItem("properties")) || [];
const workspacePropertyId = parseInt(localStorage.getItem("workspacePropertyId"), 10);
const selectedProperty = properties.find(prop => prop.id === workspacePropertyId);

// Ensure the selected property exists
if (!selectedProperty) {
  alert("Property not found. Redirecting to dashboard.");
  window.location.href = "./ownerdashboard.html";
}

// Function to handle form submission
document.getElementById("addWorkspaceForm").addEventListener("submit", function (event) {
  event.preventDefault();

  // Retrieve form values
  const workspaceName = document.getElementById("workspaceName").value;
  const workspaceType = document.getElementById("workspaceType").value;
  const workspaceSeats = parseInt(document.getElementById("workspaceSeats").value, 10);
  const workspaceSmoking = document.getElementById("workspaceSmoking").checked;
  const workspaceAvailability = document.getElementById("workspaceAvailability").value;
  const workspaceLease = document.getElementById("workspaceLease").value;
  const workspacePrice = parseFloat(document.getElementById("workspacePrice").value);

  // Create a new workspace object
  const newWorkspace = {
    id: selectedProperty.workspaces ? selectedProperty.workspaces.length + 1 : 1,
    name: workspaceName,
    type: workspaceType,
    seats: workspaceSeats,
    smokingAllowed: workspaceSmoking,
    availability: workspaceAvailability,
    leaseOption: workspaceLease,
    price: workspacePrice,
  };

  // Add the workspace to the selected property's workspaces
  if (!selectedProperty.workspaces) {
    selectedProperty.workspaces = [];
  }
  selectedProperty.workspaces.push(newWorkspace);

  // Method to save the updated properties array to localStorage
  localStorage.setItem("properties", JSON.stringify(properties));

  // Method to redirect back to the property details page
  localStorage.setItem("selectedPropertyId", workspacePropertyId);
  alert("Workspace added successfully!");
  window.location.href = "./propertydetails.html";
});