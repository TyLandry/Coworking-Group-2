//Retrieve properties and selected property ID from localStorage
const properties = JSON.parse(localStorage.getItem("properties")) || [];
// keep as string to support MongoDB _id
const workspacePropertyId = (localStorage.getItem("workspacePropertyId") || "").trim();
const selectedProperty = properties.find(prop => prop.id === parseInt(workspacePropertyId, 10) || prop._id === workspacePropertyId);

//Ensure the selected property exists
// only require the id; in DB mode we won't have the property in localStorage
if (!workspacePropertyId) {
  alert("Property not found. Redirecting to dashboard.");
  window.location.href = "./ownerdashboard.html";
}

//Function to handle form submission
//Add async to use await
document.getElementById("addWorkspaceForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  //Retrieve form values
  const workspaceName = document.getElementById("workspaceName").value;
  const workspaceType = document.getElementById("workspaceType").value;
  const workspaceSeats = parseInt(document.getElementById("workspaceSeats").value, 10);
  const workspaceSmoking = document.getElementById("workspaceSmoking").checked;
  const workspaceAvailability = document.getElementById("workspaceAvailability").value;
  const workspaceLease = document.getElementById("workspaceLease").value;
  const workspacePrice = parseFloat(document.getElementById("workspacePrice").value);

  //Create a new workspace object
  const newWorkspace = {
    id: selectedProperty?.workspaces ? selectedProperty.workspaces.length + 1 : 1,
    name: workspaceName,
    type: workspaceType,
    seats: workspaceSeats,
    smokingAllowed: workspaceSmoking,
    availability: workspaceAvailability,
    leaseOption: workspaceLease,
    price: workspacePrice,
  };

  //Add the workspace to the selected property's workspaces
  if (selectedProperty) {
    if (!selectedProperty.workspaces) {
      selectedProperty.workspaces = [];
    }
    selectedProperty.workspaces.push(newWorkspace);
  }

  //Method to save the updated properties array to localStorage
  localStorage.setItem("properties", JSON.stringify(properties));

  //Try API
  try {
    const token = sessionStorage.getItem("token");
    const res = await fetch(`http://localhost:3000/api/properties/${encodeURIComponent(workspacePropertyId)}/workspaces`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        name: workspaceName,
        type: workspaceType,
        seats: workspaceSeats,
        smokingAllowed: workspaceSmoking,
        availability: workspaceAvailability,
        leaseOption: workspaceLease,
        price: workspacePrice
      })
    });
    const data = await res.json();

    // *** Only proceed if the API succeeded ***
    if (!res.ok) {
      alert(data?.message || `Failed to add workspace (status ${res.status})`);
      return;
    }

    //Method to redirect back to the property details page
    localStorage.setItem("selectedPropertyId", workspacePropertyId);
    alert("Workspace added successfully!");
    window.location.href = "./propertydetails.html";

  } catch (err) {
    console.error("API add workspace error:", err);
    alert("Network or server error.");
  }
});
