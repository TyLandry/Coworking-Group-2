document.addEventListener("DOMContentLoaded", async function () {
  //parsing selectedPropertyId incorrectly IDs from mongodb are strings parseInt will return NaN 
  // so commented this  line
  // const selectedPropertyId = parseInt(localStorage.getItem("selectedPropertyId"), 10);
  // Get selected property ID from localStorage
  const selectedPropertyId = localStorage.getItem("selectedPropertyId");
  if (!selectedPropertyId) {
    alert("No property selected.");
    return;
  }

  try {
    const token = sessionStorage.getItem("token"); // if your backend requires JWT
    // Fetch property details from backend
    const res = await fetch(`http://localhost:3000/api/properties/${selectedPropertyId}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    if (!res.ok) throw new Error("Property not found.");
    const property = await res.json();

    // Reference to property card div
    const detailsDiv = document.querySelector("#propertyDetails .property-card");
    if (!property) {
      detailsDiv.innerHTML = "<p>Property not found.</p>";
      return;
    }

    // map backend -> UI (important)
    const title = property.name || property.address || "—";
    const photo = property.photo || "https://via.placeholder.com/640x360?text=Property";
    const sqft = property.sqft ?? property.squareFootage ?? "—";
    const reachablePublic = property.publicTransportation ?? property.publicTransit ?? false;

    // Render property info (NO owner buttons)
    detailsDiv.innerHTML = `
      <img src="${photo}" alt="${title}" />
      <h2>${title}</h2>
      <p><strong>Address:</strong> ${property.address || "—"}</p>
      <p><strong>Neighborhood:</strong> ${property.neighborhood || "—"}</p>
      <p><strong>Square Footage:</strong> ${sqft} sq ft</p>
      <p><strong>Parking Available:</strong> ${property.parking ? "Yes" : "No"}</p>
      <p><strong>Reachable by Public Transit:</strong> ${reachablePublic ? "Yes" : "No"}</p>
    `;

    // Fetch workspace for this property
    const wsres = await fetch(`http://localhost:3000/api/properties/${selectedPropertyId}/workspaces`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    if (!wsres.ok) throw new Error("Failed to fetch workspaces");
    const workspaces = await wsres.json();

    // Render workspaces 
    const workspacesDiv = document.getElementById("workspaces");
    workspacesDiv.innerHTML = "<h3>Workspaces</h3>";
    
    // property.workspaces replaced with the backend workspaces array
    if (!workspaces || workspaces.length === 0) {
      workspacesDiv.innerHTML += "<p>No workspaces for this property.</p>";
      return;
    }

    workspaces.forEach(ws => {
      const availabilityText = ws.availability ? String(ws.availability).slice(0,10) : "—";
      const priceText = typeof ws.price === "number" ? `$${ws.price.toFixed(2)}` : "—";
      const workspaceCard = document.createElement("div");
      workspaceCard.className = "workspace-card";
      workspaceCard.innerHTML = `
        <h4>${ws.name || "Workspace"}</h4>
        <p><strong>Type:</strong> ${ws.type || "—"}</p>
        <p><strong>Seats:</strong> ${ws.seats ?? "—"}</p>
        <p><strong>Smoking Allowed:</strong> ${ws.smokingAllowed ? "Yes" : "No"}</p>
        <p><strong>Availability:</strong> ${availabilityText}</p>
        <p><strong>Lease Option:</strong> ${ws.leaseOption || "—"}</p>
        <p><strong>Price:</strong> ${priceText}</p>
        <button class="select-workspace-btn" data-wsid="${ws._id}">Select Workspace</button>
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

  } catch (err) {
    console.error(err);
    alert("Error loading property details. Please try again later.");
  }
});
