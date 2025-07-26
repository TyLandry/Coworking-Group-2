//References
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax


document.addEventListener("DOMContentLoaded", function () {
  // Get IDs from localStorage
  const editingPropertyId = parseInt(localStorage.getItem("editingWorkspacePropertyId"), 10);
  const editingWorkspaceId = parseInt(localStorage.getItem("editingWorkspaceId"), 10);

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
  function populateWorkspaceForm(workspace) {
    document.getElementById("workspaceName").value = workspace.name;
    document.getElementById("workspaceType").value = workspace.type;
    document.getElementById("workspaceSeats").value = workspace.seats;
    document.getElementById("workspaceSmoking").checked = !!workspace.smokingAllowed;
    document.getElementById("workspaceAvailability").value = workspace.availability;
    document.getElementById("workspaceLease").value = workspace.leaseOption;
    document.getElementById("workspacePrice").value = workspace.price;
  }
  // Call this on page load
  populateWorkspaceForm(property.workspaces[workspaceIndex]);

  // Handle form submission
  document.getElementById("editWorkspaceForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Update workspace details
    property.workspaces[workspaceIndex] = {
      ...property.workspaces[workspaceIndex],
      name: document.getElementById("workspaceName").value,
      type: document.getElementById("workspaceType").value,
      seats: parseInt(document.getElementById("workspaceSeats").value, 10),
      smoking: document.getElementById("workspaceSmoking").checked,
      availability: document.getElementById("workspaceAvailability").value,
      lease: document.getElementById("workspaceLease").value,
      price: parseFloat(document.getElementById("workspacePrice").value)
    };

    // Save full updated properties array back to localStorage
    localStorage.setItem("properties", JSON.stringify(properties));

    alert("Workspace updated successfully!");
    
    window.location.href = "./propertydetails.html";
  });
});