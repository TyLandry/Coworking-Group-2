// Example property data
const properties = [
  {
    id: 1,
    name: "Downtown Loft",
    address: "123 Main St",
    neighborhood: "Downtown",
    squareFootage: 1500,
    parking: true,
    publicTransit: false,
    photo: "images/property1.jpg"
  },
  {
    id: 2,
    name: "City Apartment",
    address: "456 Oak Ave",
    neighborhood: "Midtown",
    squareFootage: 900,
    parking: false,
    publicTransit: true,
    photo: "images/property2.jpg"
  },
];

// Render properties to HTML
function renderProperties(props) {
  const gallery = document.getElementById("propertiesGallery");
  gallery.innerHTML = "";

  props.forEach(prop => {
    const card = document.createElement("div");
    card.className = "property-card";
    card.innerHTML = `
      <img src="${prop.photo}" alt="${prop.name}" />
      <h3>${prop.name}</h3>
      <p><strong>Address:</strong> ${prop.address}</p>
      <p><strong>Neighborhood:</strong> ${prop.neighborhood}</p>
      <p><strong>Square Footage:</strong> ${prop.squareFootage} sq ft</p>
      <div class="checkbox-group">
        <label>
          <input type="checkbox" disabled ${prop.parking ? "checked" : ""} />
          Parking Available
        </label>
        <label>
          <input type="checkbox" disabled ${prop.publicTransit ? "checked" : ""} />
          Reachable by Public Transit
        </label>
      </div>
      <div class="property-actions">
        <button onclick="editProperty(${prop.id})">Edit</button>
        <button onclick="deleteProperty(${prop.id})">Delete</button>
      </div>
    `;
    gallery.appendChild(card);
  });
}

// Example handlers for edit and delete buttons
window.editProperty = function(id) {
  window.location.href = 'editproperty.html';
};

window.deleteProperty = function(id) {
  if (confirm("Are you sure you want to delete this property?")) {
    // Remove property from array
    const idx = properties.findIndex(p => p.id === id);
    if (idx !== -1) {
      properties.splice(idx, 1);
      updateGallery();
    }
  }
};

document.getElementById("addPropertyBtn").onclick = function() {
  window.location.href = "addproperty.html";
};
document.getElementById("addWorkspaceBtn").onclick = function() {
  window.location.href = "addworkspace.html";
};

// Search, sort, and filter logic
function updateGallery() {
  let filtered = [...properties];
  const search = document.getElementById("searchBar").value.toLowerCase();
  const sortBy = document.getElementById("sortDropdown").value;

  if (search) {
    filtered = filtered.filter(p => p.name.toLowerCase().includes(search));
  }
  switch (sortBy) {
    case "Name":
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "Neighborhood":
      filtered.sort((a, b) => a.neighborhood.localeCompare(b.neighborhood));
      break;
    case "Square Footage":
      filtered.sort((a, b) => a.squareFootage - b.squareFootage);
      break;
    default:
      break;
  }
  renderProperties(filtered);
}

// Attach events for search and sort
document.getElementById("searchBar").oninput = updateGallery;
document.getElementById("sortDropdown").onchange = updateGallery;

// Initial render
renderProperties(properties);