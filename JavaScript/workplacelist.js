// workplaceList.js

export class WorkplaceList {
    constructor() {
        this.selectedPropertyId = (localStorage.getItem("selectedPropertyId") || "").trim();
        this.properties = JSON.parse(localStorage.getItem("properties")) || [];
        this.property =
            this.properties.find(
                p => p.id === parseInt(this.selectedPropertyId, 10) ||
                     (p._id && p._id === this.selectedPropertyId)
            ) || null;

        this.API_BASE = "http://localhost:3000/api";
        this.container = document.getElementById("workspaceContainer");

        this.renderWorkspaces();
    }

    async renderWorkspaces() {
        let workspaces = this.property?.workspaces || [];

        // Try fetching from backend
        if (this.selectedPropertyId) {
            try {
                const res = await fetch(`${this.API_BASE}/properties/${this.selectedPropertyId}/workspaces`);
                const data = await res.json();
                if (res.ok && Array.isArray(data)) {
                    workspaces = data;
                }
            } catch (err) {
                console.error("Failed to fetch workspaces:", err);
            }
        }

        if (!workspaces.length) {
            this.container.innerHTML = "<p>No workspaces available for this property.</p>";
            return;
        }

        // Clear container
        this.container.innerHTML = "";

        // Render each workspace
        workspaces.forEach(ws => {
            const div = document.createElement("div");
            div.className = "workspace-item";
            div.textContent = ws.name || "Workspace";

            // Save selected workspace to localStorage on click
            div.addEventListener("click", () => {
                localStorage.setItem("selectedWorkspaceId", ws.id || ws._id);
                localStorage.setItem("workspaceName", ws.name || "");
                alert(`Workspace "${ws.name}" selected!`);
                window.location.href = "workspaceDetails.html";
            });

            this.container.appendChild(div);
        });
    }
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    new WorkplaceList();
});
