document.addEventListener("DOMContentLoaded", function () {
  // Get selected property ID from localStorage
  const selectedPropertyId = parseInt(localStorage.getItem("selectedPropertyId"), 10);
  const properties = JSON.parse(localStorage.getItem("properties")) || [];
  const property = properties.find(p => p.id === selectedPropertyId);

  // Reference to property card div
  const detailsDiv = document.querySelector("#propertyDetails .property-card");
  if (!property) {
    detailsDiv.innerHTML = "<p>Property not found.</p>";
    return;
  }

  // Render property info (NO owner buttons)
  detailsDiv.innerHTML = `
    <img src="${property.photo}" alt="${property.name}" />
    <h2>${property.name}</h2>
    <p><strong>Address:</strong> ${property.address}</p>
    <p><strong>Neighborhood:</strong> ${property.neighborhood}</p>
    <p><strong>Square Footage:</strong> ${property.squareFootage} sq ft</p>
    <p><strong>Parking Available:</strong> ${property.parking ? "Yes" : "No"}</p>
    <p><strong>Reachable by Public Transit:</strong> ${property.publicTransit ? "Yes" : "No"}</p>
  `;

  // Render workspaces (ONLY Select Workspace button)
  const workspacesDiv = document.getElementById("workspaces");
  workspacesDiv.innerHTML = "<h3>Workspaces</h3>";

  if (!property.workspaces || property.workspaces.length === 0) {
    workspacesDiv.innerHTML += "<p>No workspaces for this property.</p>";
    return;
  }

  property.workspaces.forEach(ws => {
    const workspaceCard = document.createElement("div");
    workspaceCard.className = "workspace-card";
    workspaceCard.innerHTML = `
      <h4>${ws.name}</h4>
      <p><strong>Type:</strong> ${ws.type}</p>
      <p><strong>Seats:</strong> ${ws.seats}</p>
      <p><strong>Smoking Allowed:</strong> ${ws.smokingAllowed ? "Yes" : "No"}</p>
      <p><strong>Availability:</strong> ${ws.availability}</p>
      <p><strong>Lease Option:</strong> ${ws.leaseOption}</p>
      <p><strong>Price:</strong> $${ws.price}</p>
      <button class="select-workspace-btn" data-wsid="${ws.id}">Select Workspace</button>
    `;
    workspacesDiv.appendChild(workspaceCard);
  });

  // Select Workspace button handler
  document.querySelectorAll(".select-workspace-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      const wsId = btn.getAttribute("data-wsid");
      localStorage.setItem("selectedWorkspaceId", wsId);
      window.location.href = "workplacedetails.html";
    });
  });
});