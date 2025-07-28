const properties = JSON.parse(localStorage.getItem("properties")) || [];

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
        <button class="select-btn blue" data-id="${prop.id}">Select</button>
      </div>
    `;
    gallery.appendChild(card);
  });

  // Add event listeners for "Select" buttons
  const selectButtons = gallery.querySelectorAll('.select-btn');
  selectButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const propertyId = e.target.getAttribute('data-id');
      localStorage.setItem("selectedPropertyId", propertyId);
      window.location.href = "coworkerpropertydetails.html";
    });
  });
}

function filterAndSearch() {
  // ... Your filter/sort logic, using the properties array ...
}

renderProperties(properties);

document.getElementById("searchWorkspace").addEventListener("click", filterAndSearch);
document.getElementById("sortDropdown").addEventListener("click", filterAndSearch);
document.getElementById("filterDropdown").addEventListener("click", filterAndSearch);