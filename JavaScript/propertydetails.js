// Retrieve properties from localStorage
const properties = JSON.parse(localStorage.getItem("properties")) || [];

// Retrieve the selected property ID
const selectedPropertyId = parseInt(localStorage.getItem("selectedPropertyId"), 10);

// Find the selected property
const selectedProperty = properties.find(prop => prop.id === selectedPropertyId);

// Render the selected property details along with its workspaces
function renderPropertyDetails(property) {
  const detailsContainer = document.getElementById("propertyDetails");

  if (!property) {
    detailsContainer.innerHTML = "<p>Property not found.</p>";
    return;
  }

  detailsContainer.innerHTML = `
    <div class="property-card">
      <div class="property-info">
        <img src="${property.photo}" alt="${property.name}" class="property-photo">
        <div>
          <h2>${property.name}</h2>
          <p><strong>Address:</strong> ${property.address}</p>
          <p><strong>Neighborhood:</strong> ${property.neighborhood}</p>
          <p><strong>Square Footage:</strong> ${property.squareFootage} sq ft</p>
          <p><strong>Parking Available:</strong> ${property.parking ? "Yes" : "No"}</p>
          <p><strong>Reachable by Public Transit:</strong> ${property.publicTransit ? "Yes" : "No"}</p>
          <div class="property-actions">
            <button onclick="editProperty(${property.id})">Edit Property</button>
            <button onclick="deleteProperty(${property.id})">Delete Property</button>
            <button onclick="addWorkspace(${property.id})">Add Workspace</button>
          </div>
        </div>
      </div>
      <div class="workspace-section">
        <h3>Workspaces</h3>
        ${property.workspaces && property.workspaces.length > 0
          ? property.workspaces.map(workspace => `
            <div class="workspace-card">
              <h4>${workspace.name}</h4>
              <p><strong>Type:</strong> ${workspace.type}</p>
              <p><strong>Seats:</strong> ${workspace.seats}</p>
              <p><strong>Smoking Allowed:</strong> ${workspace.smokingAllowed ? "Yes" : "No"}</p>
              <p><strong>Availability:</strong> ${workspace.availability}</p>
              <p><strong>Lease Option:</strong> ${workspace.leaseOption}</p>
              <p><strong>Price:</strong> $${workspace.price}</p>
              <div class="workspace-actions">
                <button onclick="editWorkspace(${property.id}, ${workspace.id})">Edit Workspace</button>
                <button onclick="deleteWorkspace(${property.id}, ${workspace.id})">Delete Workspace</button>
              </div>
            </div>
          `).join("")
          : "<p>No workspaces added yet.</p>"
        }
      </div>
    </div>
  `;
}

// Edit property handler
function editProperty(propertyId) {
  localStorage.setItem("editingPropertyId", propertyId);
  window.location.href = "./editproperty.html";
}

// Delete property handler
function deleteProperty(propertyId) {
  if (confirm("Are you sure you want to delete this property?")) {
    const updatedProperties = properties.filter(prop => prop.id !== propertyId);
    localStorage.setItem("properties", JSON.stringify(updatedProperties));
    alert("Property deleted successfully!");
    window.location.href = "./ownerdashboard.html";
  }
}

// Add workspace handler
function addWorkspace(propertyId) {
  localStorage.setItem("workspacePropertyId", propertyId);
  window.location.href = "./addworkspace.html";
}

// Edit workspace handler
function editWorkspace(propertyId, workspaceId) {
  localStorage.setItem("editingWorkspacePropertyId", propertyId);
  localStorage.setItem("editingWorkspaceId", workspaceId);
  window.location.href = "./editworkspace.html";
}

// Delete workspace handler
function deleteWorkspace(propertyId, workspaceId) {
  if (confirm("Are you sure you want to delete this workspace?")) {
    const property = properties.find(prop => prop.id === propertyId);
    property.workspaces = property.workspaces.filter(workspace => workspace.id !== workspaceId);
    localStorage.setItem("properties", JSON.stringify(properties));
    alert("Workspace deleted successfully!");
    renderPropertyDetails(property);
  }
}

// Function call to render the selected property
renderPropertyDetails(selectedProperty);