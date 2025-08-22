export class WorkspaceDetails {
  constructor() {
    // IDs from localStorage
    this.selectedPropertyId = (localStorage.getItem("selectedPropertyId") || "").trim();
    this.selectedWorkspaceId = (localStorage.getItem("selectedWorkspaceId") || "").trim();

    // Local fallback
    this.properties = JSON.parse(localStorage.getItem("properties")) || [];

    // Find property/workspace locally first
    this.property =
      this.properties.find(
        p => p.id === parseInt(this.selectedPropertyId, 10) ||
             (p._id && p._id === this.selectedPropertyId)
      ) || null;

    this.workspace =
      this.property?.workspaces?.find(
        ws => ws.id === parseInt(this.selectedWorkspaceId, 10) ||
              (ws._id && ws._id === this.selectedWorkspaceId)
      ) || null;

    this.API_BASE = "http://localhost:3000/api";

    this.renderWorkspaceDetails();
  }

  async renderWorkspaceDetails() {
    const detailsContainer = document.querySelector(".workspace-info");

    let workspace = this.workspace;

    // Try backend fetch if we have an ID
    if (this.selectedWorkspaceId) {
      try {
        const res = await fetch(`${this.API_BASE}/workspaces/${this.selectedWorkspaceId}`);
        const data = await res.json();
        if (res.ok && data && (data._id || data.id)) {
          workspace = data;
        }
      } catch (err) {
        console.error("Failed to fetch workspace:", err);
      }
    }

    if (!workspace) {
      detailsContainer.innerHTML = "<p>Workspace not found.</p>";
      return;
    }

    // Fill workspace details
    const title = workspace.name || "Workspace";
    const price = workspace.price ?? "—";
    const type = workspace.type || "—";
    const seats = workspace.seats ?? "—";
    const smoking = workspace.smokingAllowed ? "Yes" : "No";
    const availability = workspace.availability ?? "—";
    const lease = workspace.leaseOption || "—";
    const description = workspace.description || "";
    const photo = workspace.photo || "https://via.placeholder.com/640x360?text=Workspace";

    detailsContainer.innerHTML = `
      <h2 id="workspace-title">${title}</h2>
      <img id="workspace-image" src="${photo}" alt="${title}">
      <p><strong>Price:</strong> $<span id="workspace-price">${price}</span></p>
      <p><strong>Type:</strong> <span id="workspace-type">${type}</span></p>
      <p><strong>Seats:</strong> <span id="workspace-seats">${seats}</span></p>
      <p><strong>Smoking Allowed:</strong> <span id="workspace-smoking">${smoking}</span></p>
      <p><strong>Availability:</strong> <span id="workspace-availability">${availability}</span></p>
      <p><strong>Lease Option:</strong> <span id="workspace-lease">${lease}</span></p>
      <p><strong>Description:</strong> <span id="workspace-description">${description}</span></p>
      <div class="workspace-actions">
        <button class="rent-btn">Rent</button>
        <button class="contact-btn">Contact Owner</button>
      </div>
    `;

    // Handle rent button
    const rentBtn = document.querySelector(".rent-btn");
    if (rentBtn) {
      rentBtn.addEventListener("click", () => {
        alert("Rented successfully!");
      });
    }

    // Handle contact button
    const contactBtn = document.querySelector(".contact-btn");
    if (contactBtn) {
      contactBtn.addEventListener("click", () => {
        if (this.property && this.property.ownerEmail) {
          localStorage.setItem("selectedOwnerEmail", this.property.ownerEmail);
        }
        if (workspace && workspace.name) {
          localStorage.setItem("workspaceName", workspace.name);
        }
        window.location.href = "contactInfo.html";
      });
    }
  }
}

// Boot it up on the DOM load
document.addEventListener("DOMContentLoaded", () => {
  new WorkspaceDetails();
})