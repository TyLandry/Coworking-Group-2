//References
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax


document.addEventListener("DOMContentLoaded", function () {
  // Get IDs from localStorage
  // NOTE: keep as strings to support MongoDB ObjectId
  const editingPropertyId = (localStorage.getItem("editingWorkspacePropertyId") || "").trim();
  const editingWorkspaceId = (localStorage.getItem("editingWorkspaceId") || "").trim();

  // Get all properties from localStorage
  const properties = JSON.parse(localStorage.getItem("properties")) || [];

  // Find the property
  // NOTE: localStorage may not have it in DB mode; do not block if not found
  const property = properties.find(p => p.id === parseInt(editingPropertyId, 10) || p._id === editingPropertyId);
  if (!editingPropertyId && !editingWorkspaceId) {
    alert("Property not found!");
    window.location.href = "./ownerdashboard.html";
    return;
  }

  // Find the workspace
  // NOTE: local copy may not exist; API fetch below will be the source of truth
  const workspaceIndex = property?.workspaces?.findIndex(ws => ws.id === parseInt(editingWorkspaceId, 10) || ws._id === editingWorkspaceId) ?? -1;
  if (!editingWorkspaceId && workspaceIndex === -1) {
    alert("Workspace not found!");
    window.location.href = "./ownerdashboard.html";
    return;
  }

  let editingWorkspace = (workspaceIndex >= 0 && property) ? property.workspaces[workspaceIndex] : {};

  // Function to populate form with workspace details
  async function populateWorkspaceForm() {
    try {
      const res = await fetch (`http://localhost:3000/api/workspaces/${editingWorkspaceId}`);
      const data = await res.json();
      if (res.ok) {
        editingWorkspace = data;
        // NOTE: ensure property id is available for redirect later
        if (data.property && !editingPropertyId) {
          localStorage.setItem("editingWorkspacePropertyId", data.property);
        }
      } else {
        console.warn("Backend fetch failed:", data?.message);
      }
    } catch (err) {
      console.error("Failed to fetch workspace:", err);
    }

    fillWorkspaceForm(editingWorkspace);
  }

  // Populate form fields (call this on page load)
  function fillWorkspaceForm(workspace) {
    document.getElementById("workspaceName").value = workspace.name || "";
    document.getElementById("workspaceType").value = workspace.type || "";
    document.getElementById("workspaceSeats").value = workspace.seats || 0;
    document.getElementById("workspaceSmoking").checked = !!(workspace.smokingAllowed ?? workspace.smoking);
    document.getElementById("workspaceAvailability").value = workspace.availability ? String(workspace.availability).slice(0,10) : "";
    document.getElementById("workspaceLease").value = workspace.leaseOption || workspace.lease || "";
    document.getElementById("workspacePrice").value = workspace.price || 0;
  }
  // Call this on page load
  populateWorkspaceForm();

  // Handle form submission
  document.getElementById("editWorkspaceForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    // Update workspace details
    const updatedWorkspace = {
      ...editingWorkspace,
      name: document.getElementById("workspaceName").value,
      type: document.getElementById("workspaceType").value,
      seats: parseInt(document.getElementById("workspaceSeats").value, 10),
      smokingAllowed: document.getElementById("workspaceSmoking").checked,
      availability: document.getElementById("workspaceAvailability").value, // Date string if your schema is Date
      leaseOption: document.getElementById("workspaceLease").value,
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
        // Method to redirect back to the property details page
        const pid = editingPropertyId || editingWorkspace.property || localStorage.getItem("editingWorkspacePropertyId");
        localStorage.setItem("selectedPropertyId", pid);
        setTimeout(() => { window.location.href = "./propertydetails.html"; }, 1200);
        return;
      } else {
        console.warn("API update failed:", data?.message);
      }
    } catch (err) {
      console.error("API update error:", err);
    }

    // Save full updated properties array back to localStorage
    // NOTE: local fallback
    if (property && workspaceIndex >= 0) {
      property.workspaces[workspaceIndex] = updatedWorkspace;
      localStorage.setItem("properties", JSON.stringify(properties));
    }

    alert("Workspace updated successfully!");
    const pid = editingPropertyId || editingWorkspace.property || localStorage.getItem("editingWorkspacePropertyId");
    localStorage.setItem("selectedPropertyId", pid);
    window.location.href = "./propertydetails.html";
  });
});
