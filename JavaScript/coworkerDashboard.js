//Corworker Dashboard followed by the Owner Dashboard with modified functions

const properties = [
  {
    id: 1,
    name: "Downtown Loft",
    address: "123 Main St",
    neighborhood: "Downtown",
    squareFootage: 1500,
    capacity: 8,
    price: 1455,
    dateAdded: "2024-05-07",
    available: true,
    parking: true,
    publicTransit: false,
    photo: "images/workplace1.jpg"
  },
  {
    id: 2,
    name: "City Apartment",
    address: "456 Oak Ave",
    neighborhood: "Midtown",
    squareFootage: 900,
    capacity: 5,
    price: 1200,
    dateAdded: "2024-07-01",
    available: false,
    parking: false,
    publicTransit: true,
    photo: "images/workplace2.jpg"
  },
];
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
  <button class="select-btn blue">Select</button>
</div>

    `;
    gallery.appendChild(card);
  });
}

function filterAndSearch() {
  const search = document.getElementById("searchBar").value.toLowerCase();
  const sort = document.getElementById("sortDropdown").value;
  const filter = document.getElementById("filterDropdown").value;

  let result = properties.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search);
    const matchesFilter =
      filter === "All Workspaces" ||
      (filter === "Available" && item.available) ||
      (filter === "Unavailable" && !item.available);

    return matchesSearch && matchesFilter;
  });


  if (sort === "Name") {
    result.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === "Date Added") {
    result.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
  } else if (sort === "Capacity") {
    result.sort((a, b) => b.capacity - a.capacity);
  } else if (sort === "Price") {
    result.sort((a, b) => a.price - b.price);
  }

  renderProperties(result);
}


renderProperties(properties);

document.getElementById("searchWorkspace").addEventListener("click", filterAndSearch);
document.getElementById("sortDropdown").addEventListener("click", filterAndSearch);
document.getElementById("filterDropdown").addEventListener("click", filterAndSearch);
// document.getElementById("searchWork").addEventListener("click", filterAndSearch); // Not sure about this line of code, couldnt find searchWork in the html file

