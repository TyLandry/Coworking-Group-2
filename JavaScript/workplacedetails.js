document.addEventListener("DOMContentLoaded", () => {
  const selectedPropertyId = parseInt(localStorage.getItem("selectedPropertyId"), 10);
  const selectedWorkspaceId = parseInt(localStorage.getItem("selectedWorkspaceId"), 10);

  const properties = JSON.parse(localStorage.getItem("properties")) || [];
  const property = properties.find(p => p.id === selectedPropertyId);
  let workspace;
  if (property && property.workspaces) {
    workspace = property.workspaces.find(ws => ws.id === selectedWorkspaceId);
  }

  if (workspace) {
    document.getElementById("workspace-title").textContent = workspace.name || "Workspace";
    document.getElementById("workspace-price").textContent = `$${workspace.price}`;
    document.getElementById("workspace-type").textContent = workspace.type || "";
    document.getElementById("workspace-seats").textContent = workspace.seats || "";
    document.getElementById("workspace-smoking").textContent = workspace.smokingAllowed ? "Yes" : "No";
    document.getElementById("workspace-availability").textContent = workspace.availability || "";
    document.getElementById("workspace-lease").textContent = workspace.leaseOption || "";
    document.getElementById("workspace-description").textContent = workspace.description || "";
    const workspaceImg = document.getElementById("workspace-image");
    if (workspace.photo) {
      workspaceImg.src = workspace.photo;
      workspaceImg.alt = workspace.name;
    }
  } else {
    document.querySelector(".workspace-info").innerHTML = "<p>Workspace not found.</p>";
  }

  const rentBtn = document.querySelector(".rent-btn");
  const contactBtn = document.querySelector(".contact-btn");
  if (rentBtn) {
    rentBtn.addEventListener("click", () => {
      alert("Rented successfully!");
    });
  }

    // Lizzy update because need to show info on contact info page
  if (contactBtn) {
    contactBtn.addEventListener("click", () => {
      if(property && property.ownerEmail) {
        localStorage.setItem("selectedOwnerEmail", property.ownerEmail);
      }

      if(workspace && workspace.name) {
        localStorage.setItem("workspaceName", workspace.name);
      }
      
      window.location.href = "contactInfo.html";
    });
  }
});