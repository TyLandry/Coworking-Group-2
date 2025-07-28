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
// this function filters properties based on search input and selected filters and renders the filtered properties.
// the if statement checks if the search input is empty.
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime

function filterAndSearch() {
  
  const input = document.getElementById("searchBar").value.toLowerCase().trim();
//split the input into keywords.
  const keywords = input.split(/\s+/); 
//starts filtering properties based on the keywords.
  const filtered = properties.filter(prop => {
// every term in keywords must match at least one property attribute. used multipe if statements to keep search flexible. example, can search a property by name, address and square footage together.
    return keywords.every(term => {
      if (prop.name.toLowerCase().includes(term)) return true;
      if (prop.address.toLowerCase().includes(term)) return true;
      if (prop.neighborhood.toLowerCase().includes(term)) return true;
      if (prop.squareFootage && String(prop.squareFootage).includes(term)) return true;
      if (prop.capacity && String(prop.capacity).includes(term)) return true;
      if (term === "parking" && prop.parking) return true;
      if (term === "transit" && prop.publicTransit) return true;
      if (term === "smoking" && prop.smoking) return true;
      if ((term === "non-smoking" || term === "nosmoking") && !prop.smoking) return true;
      if (prop.leaseTerm && prop.leaseTerm.toLowerCase().includes(term)) return true;
      if (term.includes("price")) {
        const priceValue = parseInt(term.replace(/\D/g, ""));
        if (!isNaN(priceValue) && prop.price <= priceValue) return true;
      }
      if (term.match(/\d{4}-\d{2}-\d{2}/)) { // Check for date format YYYY-MM-DD
        const searchDate = new Date(term);
        const available = new Date(prop.availabilityDate);
        if (!isNaN(searchDate.getTime()) && available <= searchDate) return true;
      }

      return false;
    });
  });

  renderProperties(filtered);
}


renderProperties(properties);



document.getElementById("searchWorkspace").addEventListener("click", filterAndSearch);
document.getElementById("sortDropdown").addEventListener("click", filterAndSearch);
document.getElementById("filterDropdown").addEventListener("click", filterAndSearch);