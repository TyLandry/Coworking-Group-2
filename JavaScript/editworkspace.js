//References
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax


document.addEventListener("DOMContentLoaded", function () {
  // Get IDs from localStorage
  const editingPropertyId = parseInt(localStorage.getItem("editingWorkspacePropertyId"), 10);
  const editingWorkspaceId = parseInt(localStorage.getItem("editingWorkspaceId"), 10);


  // Function to populate form with workspace details
  async function populateWorkspaceForm() {
    try {
      const res = await fetch (`http://localhost:3000/api/workspaces/${editingWorkspaceId}`);
      const data = await res.json();
      if (res.ok) {
        editingWorkspace = data;
      } else {
        console.warn("Backend fetch failed:", data?.message);
      }
    } catch (err) {
      console.error("Failed to fetch workspace:", err);
    }
  }

  // Get all properties from localStorage
  const properties = JSON.parse(localStorage.getItem("properties")) || [];

  // Find the property
  const property = properties.find(p => p.id === editingPropertyId);
  if (!property) {
    alert("Property not found!");
    window.location.href = "./ownerdashboard.html";
    return;
  }

  // Find the workspace
  const workspaceIndex = property.workspaces.findIndex(ws => ws.id === editingWorkspaceId);
  if (workspaceIndex === -1) {
    alert("Workspace not found!");
    window.location.href = "./ownerdashboard.html";
    return;
  }

  // Populate form fields (call this on page load)
  function fillWorkspaceForm(workspace) {
    document.getElementById("workspaceName").value = workspace.name || "";
    document.getElementById("workspaceType").value = workspace.type || "";
    document.getElementById("workspaceSeats").value = workspace.seats || 0;
    document.getElementById("workspaceSmoking").checked = !!workspace.smoking;
    document.getElementById("workspaceAvailability").value = workspace.availability || "";
    document.getElementById("workspaceLease").value = workspace.lease || "";
    document.getElementById("workspacePrice").value = workspace.price || 0;
  }
  // Call this on page load
  fillWorkspaceForm(property.workspaces[workspaceIndex]);

  // Handle form submission
  document.getElementById("editWorkspaceForm").addEventListener("submit", async function (event) {
    event.preventDefault();

  let editingWorkspace = property.workspaces[workspaceIndex];


    // Update workspace details
    const updatedWorkspace = {
      ...editingWorkspace,
      name: document.getElementById("workspaceName").value,
      type: document.getElementById("workspaceType").value,
      seats: parseInt(document.getElementById("workspaceSeats").value, 10),
      smoking: document.getElementById("workspaceSmoking").checked,
      availability: document.getElementById("workspaceAvailability").value,
      lease: document.getElementById("workspaceLease").value,
      price: parseFloat(document.getElementById("workspacePrice").value)
    };

    //Try API update with JWT
     const token = sessionStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:3000/api/workspaces/${editingWorkspaceId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(updatedWorkspace)
      });
      const data = await res.json();
      if (res.ok) {
        alert("Workspace updated successfully!");
        localStorage.setItem("selectedPropertyId", editingPropertyId);
        window.location.href = "./propertydetails.html";
        return;
      } else {
        console.warn("API update failed:", data?.message);
      }
    } catch (err) {
      console.error("API update error:", err);
    }

    // Save full updated properties array back to localStorage
    localStorage.setItem("properties", JSON.stringify(properties));

    alert("Workspace updated successfully!");
    
    window.location.href = "./propertydetails.html";
  });
});