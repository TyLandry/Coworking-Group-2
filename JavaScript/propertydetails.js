//Converted the functions to a class and put the multiple functions
//inside of class to convert them to methods
export class PropertyDetails {
  constructor() {
    //Retrieve properties and selected property ID from localStorage
    this.properties = JSON.parse(localStorage.getItem("properties")) || [];
    //NOTE: selectedPropertyId may now be a MongoDB string (_id). Keep your original parseInt,
    this.selectedPropertyId =
      (localStorage.getItem("selectedPropertyId") || "").trim();
    this.selectedProperty =
      this.properties.find(
        prop =>
          // original numeric localStorage logic preserved:
          prop.id === parseInt(this.selectedPropertyId, 10) ||
          // DB mode: match Mongo _id stored as string
          (prop._id && prop._id === this.selectedPropertyId)
      ) || null;

    //NEW: base API url for backend
    this.API_BASE = "http://localhost:3000/api";

    //Call the render function to show the property details
    //NOTE: render now needs async data from API
    this.renderPropertyDetails();
  }

  //Render the selected property details along with its workspaces
  async renderPropertyDetails() {
    const detailsContainer = document.getElementById("propertyDetails");
    let property = this.selectedProperty;

    //Try to fetch from API if we have an id (string) and either no local copy or we want fresh data.
    if (this.selectedPropertyId) {
      try {
        const res = await fetch(`${this.API_BASE}/properties/${this.selectedPropertyId}`);
        const fetched = await res.json();
        if (res.ok && fetched && fetched._id) {
          property = fetched;
        }
      } catch (err) {
        console.error("Failed to fetch property from API:", err);
      }
    }

    const details = property;

    const detailsContainerExists = !!detailsContainer;
    if (detailsContainerExists && !details) {
      detailsContainer.innerHTML = "<p>Property not found.</p>";
      return;
    }

    //Keep your ownerEmail storage behavior; in DB mode this will be present on the doc
    if (details && details.ownerEmail) {
      localStorage.setItem("selectedOwnerEmail", details.ownerEmail);
    }

    //Pull workspaces from backend (DB mode). Fallback to any local workspaces if API fails.
    let workspaces = [];
    try {
      if (this.selectedPropertyId) {
        const wsRes = await fetch(`${this.API_BASE}/properties/${this.selectedPropertyId}/workspaces`);
        const wsData = await wsRes.json();
        if (wsRes.ok && Array.isArray(wsData)) {
          workspaces = wsData;
        }
      }
    } catch (err) {
      console.error("Failed to fetch workspaces:", err);
    }
    if ((!workspaces || workspaces.length === 0) && details?.workspaces?.length) {
      //fallback to local if API empty
      workspaces = details.workspaces;
    }

    const title = details?.name || details?.address || "Property";
    const sqft = details?.sqft ?? details?.squareFootage ?? 0;
    const parking = !!details?.parking;
    const publicTransit = (details?.publicTransportation ?? details?.publicTransit) ? "Yes" : "No";
    const photo = details?.photo || "https://via.placeholder.com/640x360?text=Property";
    const address = details?.address || "—";
    const neighborhood = details?.neighborhood || "—";

    if (detailsContainerExists) {
      detailsContainer.innerHTML = `
        <div class="property-card">
          <div class="property-info">
            <img src="${photo}" alt="${title}" class="property-photo">
            <div>
              <h2>${title}</h2>
              <p><strong>Address:</strong> ${address}</p>
              <p><strong>Neighborhood:</strong> ${neighborhood}</p>
              <p><strong>Square Footage:</strong> ${sqft} sq ft</p>
              <p><strong>Parking Available:</strong> ${parking ? "Yes" : "No"}</p>
              <p><strong>Reachable by Public Transit:</strong> ${publicTransit}</p>
              <div class="property-actions">
                <button class="edit-property" data-id="${details?._id || details?.id}">Edit Property</button>
                <button class="delete-property" data-id="${details?._id || details?.id}">Delete Property</button>
                <button class="add-workspace" data-id="${details?._id || details?.id}">Add Workspace</button>
              </div>
            </div>
          </div>
          <div class="workspace-section">
            <h3>Workspaces</h3>
            ${
              workspaces && workspaces.length > 0 
              ? workspaces.map(ws => `
                <div class="workspace-card-details">    
                  <h4>${ws.name || "Workspace"}</h4>
                  <p><strong>Type:</strong> ${ws.type || "—"}</p>
                  <p><strong>Seats:</strong> ${ws.seats ?? "—"}</p>
                  <p><strong>Smoking Allowed:</strong> ${ws.smokingAllowed ? "Yes" : "No"}</p>
                  <p><strong>Availability:</strong> ${String(ws.availability ?? "—")}</p>
                  <p><strong>Lease Option:</strong> ${ws.leaseOption || "—"}</p>
                  <p><strong>Price:</strong> $${ws.price ?? "—"}</p>
                  <div class="workspace-actions">
                    <button class="edit-workspace" data-property-id="${details?._id || details?.id}" data-workspace-id="${ws._id || ws.id}">Edit Workspace</button>
                    <button class="delete-workspace" data-property-id="${details?._id || details?.id}" data-workspace-id="${ws._id || ws.id}">Delete Workspace</button>
                  </div>
                </div>
              `).join("")
              : "<p>No workspaces added yet.</p>"
            }
          </div>
        </div>
      `;
    }
 //Above Changed name from workspace-card to workspace-card-details inorder to avoid styling overlap

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
  async deleteProperty(e) {
    const propertyId = e.target.getAttribute('data-id');
    if (confirm("Are you sure you want to delete this property?")) {
      //Forcefully convert the value to int in order to prevent mismatch
      //(DB mode uses string _id; we’ll try API first, then fall back to localStorage delete)
      const token = sessionStorage.getItem("token");

      try {
        const res = await fetch(`${this.API_BASE}/properties/${propertyId}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (res.ok) {
          alert("Property deleted successfully!");
          window.location.href = "./ownerdashboard.html";
          return;
        } else {
          //If API deletion fails, continue to fallback local removal below
          console.warn("API delete failed:", data?.message || res.status);
        }
      } catch (err) {
        console.error("API delete error:", err);
      }

      //Fallback to old localStorage delete (preserved behavior)
      const updatedProperties = this.properties.filter(prop =>
        prop.id !== parseInt(propertyId, 10)
      );
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
  async deleteWorkspace(e) {
    const propertyId = e.target.getAttribute('data-property-id');
    const workspaceId = e.target.getAttribute('data-workspace-id');
    if (confirm("Are you sure you want to delete this workspace?")) {
      //Try backend deletion first (DB mode)
      const token = sessionStorage.getItem("token");
      try {
        const res = await fetch(`${this.API_BASE}/workspaces/${workspaceId}`, {
          method: "DELETE",
          headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) {
          alert("Workspace deleted successfully!");
          //Re-render to reflect changes
          this.renderPropertyDetails();
          return;
        } else {
          console.warn("API workspace delete failed:", data?.message || res.status);
        }
      } catch (err) {
        console.error("API workspace delete error:", err);
      }

      //original localStorage fallback (preserved)
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
