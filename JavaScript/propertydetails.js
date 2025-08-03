//Converted the functions to a class and put the multiple functions
//inside of class to convert them to methods
export class PropertyDetails {
  constructor() {
    //Retrieve properties and selected property ID from localStorage
    this.properties = JSON.parse(localStorage.getItem("properties")) || [];
    this.selectedPropertyId = parseInt(localStorage.getItem("selectedPropertyId"), 10);
    this.selectedProperty = this.properties.find(prop => prop.id === this.selectedPropertyId);
    //Call the render function to show the property details
    this.renderPropertyDetails();
  }

  //Render the selected property details along with its workspaces
  renderPropertyDetails() {
    const detailsContainer = document.getElementById("propertyDetails");

    if (!this.selectedProperty) {
      detailsContainer.innerHTML = "<p>Property not found.</p>";
      return;
    }

    if (this.selectedProperty.ownerEmail) {
      localStorage.setItem("selectedOwnerEmail", this.selectedProperty.ownerEmail);
    }

    detailsContainer.innerHTML = `
      <div class="property-card">
        <div class="property-info">
          <img src="${this.selectedProperty.photo}" alt="${this.selectedProperty.name}" class="property-photo">
          <div>
            <h2>${this.selectedProperty.name}</h2>
            <p><strong>Address:</strong> ${this.selectedProperty.address}</p>
            <p><strong>Neighborhood:</strong> ${this.selectedProperty.neighborhood}</p>
            <p><strong>Square Footage:</strong> ${this.selectedProperty.squareFootage} sq ft</p>
            <p><strong>Parking Available:</strong> ${this.selectedProperty.parking ? "Yes" : "No"}</p>
            <p><strong>Reachable by Public Transit:</strong> ${this.selectedProperty.publicTransit ? "Yes" : "No"}</p>
            <div class="property-actions">
              <button class="edit-property" data-id="${this.selectedProperty.id}">Edit Property</button>
              <button class="delete-property" data-id="${this.selectedProperty.id}">Delete Property</button>
              <button class="add-workspace" data-id="${this.selectedProperty.id}">Add Workspace</button>
            </div>
          </div>
        </div>
        <div class="workspace-section">
          <h3>Workspaces</h3>
          ${this.selectedProperty.workspaces && this.selectedProperty.workspaces.length > 0
            ? this.selectedProperty.workspaces.map(workspace => `
              <div class="workspace-card">
                <h4>${workspace.name}</h4>
                <p><strong>Type:</strong> ${workspace.type}</p>
                <p><strong>Seats:</strong> ${workspace.seats}</p>
                <p><strong>Smoking Allowed:</strong> ${workspace.smokingAllowed ? "Yes" : "No"}</p>
                <p><strong>Availability:</strong> ${workspace.availability}</p>
                <p><strong>Lease Option:</strong> ${workspace.leaseOption}</p>
                <p><strong>Price:</strong> $${workspace.price}</p>
                <div class="workspace-actions">
                  <button class="edit-workspace" data-property-id="${this.selectedProperty.id}" data-workspace-id="${workspace.id}">Edit Workspace</button>
                  <button class="delete-workspace" data-property-id="${this.selectedProperty.id}" data-workspace-id="${workspace.id}">Delete Workspace</button>
                </div>
              </div>
            `).join("")
            : "<p>No workspaces added yet.</p>"
          }
        </div>
      </div>
    `;

    //Add event listeners for property actions
    document.querySelector('.edit-property').addEventListener('click', this.editProperty.bind(this));
    document.querySelector('.delete-property').addEventListener('click', this.deleteProperty.bind(this));
    document.querySelector('.add-workspace').addEventListener('click', this.addWorkspace.bind(this));

    //Add event listeners for workspace actions
    const editWorkspaceButtons = document.querySelectorAll('.edit-workspace');
    editWorkspaceButtons.forEach(button => {
      button.addEventListener('click', (e) => this.editWorkspace(e));
    });

    const deleteWorkspaceButtons = document.querySelectorAll('.delete-workspace');
    deleteWorkspaceButtons.forEach(button => {
      button.addEventListener('click', (e) => this.deleteWorkspace(e));
    });
  }

  //Edit property handler
  editProperty(e) {
    const propertyId = e.target.getAttribute('data-id');
    localStorage.setItem("editingPropertyId", propertyId);
    window.location.href = "./editproperty.html";
  }

  //Delete property handler
  deleteProperty(e) {
    const propertyId = e.target.getAttribute('data-id');
    if (confirm("Are you sure you want to delete this property?")) {
      //Forcefully convert the value to int in order to prevent mismatch
      const updatedProperties = this.properties.filter(prop => prop.id !== parseInt(propertyId, 10));
      localStorage.setItem("properties", JSON.stringify(updatedProperties));
      alert("Property deleted successfully!");
      window.location.href = "./ownerdashboard.html";
    }
  }

  //Add workspace handler
  addWorkspace(e) {
    const propertyId = e.target.getAttribute('data-id');
    localStorage.setItem("workspacePropertyId", propertyId);
    window.location.href = "./addworkspace.html";
  }

  //Edit workspace handler
  editWorkspace(e) {
    const propertyId = e.target.getAttribute('data-property-id');
    const workspaceId = e.target.getAttribute('data-workspace-id');
    localStorage.setItem("editingWorkspacePropertyId", propertyId);
    localStorage.setItem("editingWorkspaceId", workspaceId);
    window.location.href = "./editworkspace.html";
  }
 //Delete workspace handler
  deleteWorkspace(e) {
    const propertyId = e.target.getAttribute('data-property-id');
    const workspaceId = e.target.getAttribute('data-workspace-id');
    if (confirm("Are you sure you want to delete this workspace?")) {
      const property = this.properties.find(prop => prop.id === parseInt(propertyId));
      if (property) {
        property.workspaces = property.workspaces.filter(workspace => workspace.id !== parseInt(workspaceId));
        localStorage.setItem("properties", JSON.stringify(this.properties));
        alert("Workspace deleted successfully!");
        this.renderPropertyDetails();
      }
    }
  }
}

// // Retrieve properties from localStorage
// const properties = JSON.parse(localStorage.getItem("properties")) || [];

// // Retrieve the selected property ID
// const selectedPropertyId = parseInt(localStorage.getItem("selectedPropertyId"), 10);

// // Find the selected property
// const selectedProperty = properties.find(prop => prop.id === selectedPropertyId);

// // Render the selected property details along with its workspaces
// function renderPropertyDetails(property) {
//   const detailsContainer = document.getElementById("propertyDetails");

//   if (!property) {
//     detailsContainer.innerHTML = "<p>Property not found.</p>";
//     return;
//   }

//   detailsContainer.innerHTML = `
//     <div class="property-card">
//       <div class="property-info">
//         <img src="${property.photo}" alt="${property.name}" class="property-photo">
//         <div>
//           <h2>${property.name}</h2>
//           <p><strong>Address:</strong> ${property.address}</p>
//           <p><strong>Neighborhood:</strong> ${property.neighborhood}</p>
//           <p><strong>Square Footage:</strong> ${property.squareFootage} sq ft</p>
//           <p><strong>Parking Available:</strong> ${property.parking ? "Yes" : "No"}</p>
//           <p><strong>Reachable by Public Transit:</strong> ${property.publicTransit ? "Yes" : "No"}</p>
//           <div class="property-actions">
//             <button onclick="editProperty(${property.id})">Edit Property</button>
//             <button onclick="deleteProperty(${property.id})">Delete Property</button>
//             <button onclick="addWorkspace(${property.id})">Add Workspace</button>
//           </div>
//         </div>
//       </div>
//       <div class="workspace-section">
//         <h3>Workspaces</h3>
//         ${property.workspaces && property.workspaces.length > 0
//           ? property.workspaces.map(workspace => `
//             <div class="workspace-card">
//               <h4>${workspace.name}</h4>
//               <p><strong>Type:</strong> ${workspace.type}</p>
//               <p><strong>Seats:</strong> ${workspace.seats}</p>
//               <p><strong>Smoking Allowed:</strong> ${workspace.smokingAllowed ? "Yes" : "No"}</p>
//               <p><strong>Availability:</strong> ${workspace.availability}</p>
//               <p><strong>Lease Option:</strong> ${workspace.leaseOption}</p>
//               <p><strong>Price:</strong> $${workspace.price}</p>
//               <div class="workspace-actions">
//                 <button onclick="editWorkspace(${property.id}, ${workspace.id})">Edit Workspace</button>
//                 <button onclick="deleteWorkspace(${property.id}, ${workspace.id})">Delete Workspace</button>
//               </div>
//             </div>
//           `).join("")
//           : "<p>No workspaces added yet.</p>"
//         }
//       </div>
//     </div>
//   `;
// }

// // Edit property handler
// function editProperty(propertyId) {
//   localStorage.setItem("editingPropertyId", propertyId);
//   window.location.href = "./editproperty.html";
// }

// // Delete property handler
// function deleteProperty(propertyId) {
//   if (confirm("Are you sure you want to delete this property?")) {
//     const updatedProperties = properties.filter(prop => prop.id !== propertyId);
//     localStorage.setItem("properties", JSON.stringify(updatedProperties));
//     alert("Property deleted successfully!");
//     window.location.href = "./ownerdashboard.html";
//   }
// }

// // Add workspace handler
// function addWorkspace(propertyId) {
//   localStorage.setItem("workspacePropertyId", propertyId);
//   window.location.href = "./addworkspace.html";
// }

// // Edit workspace handler
// function editWorkspace(propertyId, workspaceId) {
//   localStorage.setItem("editingWorkspacePropertyId", propertyId);
//   localStorage.setItem("editingWorkspaceId", workspaceId);
//   window.location.href = "./editworkspace.html";
// }

// // Delete workspace handler
// function deleteWorkspace(propertyId, workspaceId) {
//   if (confirm("Are you sure you want to delete this workspace?")) {
//     const property = properties.find(prop => prop.id === propertyId);
//     property.workspaces = property.workspaces.filter(workspace => workspace.id !== workspaceId);
//     localStorage.setItem("properties", JSON.stringify(properties));
//     alert("Workspace deleted successfully!");
//     renderPropertyDetails(property);
//   }
// }

// // Function call to render the selected property
// renderPropertyDetails(selectedProperty);
