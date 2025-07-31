const properties = JSON.parse(localStorage.getItem("properties")) || [];

export class coworkerDashboard {
  constructor(galleryId, searchId, sortId, filterId) {
    this.galleryId = galleryId;
    this.searchId = searchId;
    this.sortId = sortId;
    this.filterId = filterId;

    this.properties = JSON.parse(localStorage.getItem("properties")) || [];

    this.init();
  }

  init() {
    this.renderProperties(this.properties);

    document.getElementById(this.searchId)?.addEventListener("click", () => {
      this.filterAndSearch();
    });

    document.getElementById(this.sortId)?.addEventListener("change", () => {
      this.filterAndSearch();
    });

    document.getElementById(this.filterId)?.addEventListener("change", () => {
      this.filterAndSearch();
    });
  }
}

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
/* by address, (works)
neighborhood, (works)
with/without smoking, (works)
transit (works)
parking (works)
no parking not working.
no transit not working.
how would i search square feet? ex: 500 sq ft not working just putting the numner (500) does.
how would i search lease term? searching day, week or month works for leasing.
how would i search availability date? this format yyyy-mm-dd, but its not working.
how would i search number of individuals it can seat? not currently working.
how would i search price? price is including all prices, not working.
*/

function filterAndSearch() {
  const input = document.getElementById("searchBar").value.toLowerCase().trim();
  const keywords = input.split(/\s+/);

  const minPrice = parseInt(document.getElementById("minPrice").value);
  const maxPrice = parseInt(document.getElementById("maxPrice").value);
  const minSeats = parseInt(document.getElementById("minSeats").value);
  const maxSeats = parseInt(document.getElementById("maxSeats").value);
  const minSquareFootage = parseInt(document.getElementById("minSquareFootage").value);
  const maxSquareFootage = parseInt(document.getElementById("maxSquareFootage").value);
  const availableDate = new Date(document.getElementById("availableDate").value);
  const leaseOption = document.getElementById("leaseOption").value.toLowerCase();
  const parking = document.getElementById("parkingFilter").value;
  const transit = document.getElementById("transitFilter").value;
  const smoking =document.getElementById("smokingFilter").value;





  const filtered = properties.filter(prop => {
    return keywords.every(term => {
      
      if (prop.name.toLowerCase().includes(term)) return true;
      if (prop.address.toLowerCase().includes(term)) return true;
      if (prop.neighborhood.toLowerCase().includes(term)) return true;
      if (prop.squareFootage && String(prop.squareFootage).includes(term)) return true;

      
      if (prop.workspaces && Array.isArray(prop.workspaces)) {
        return prop.workspaces.some(ws => {
          if (ws.name && ws.name.toLowerCase().includes(term)) return true;
          if (ws.type && ws.type.toLowerCase().includes(term)) return true;
          if (ws.seats && String(ws.seats).includes(term)) return true;

          if (term === "parking" && prop.parking) return true;
          if (term === "no parking" && !prop.parking) return true;

          if (term === "transit" && prop.publicTransit) return true;
          if (term === "no transit" && !prop.publicTransit) return true;

          if (term === "smoking" && ws.smokingAllowed) return true;
          if ((term === "non-smoking" || term === "nosmoking") && !ws.smokingAllowed) return true;

          if (ws.leaseOption && ws.leaseOption.toLowerCase().includes(term)) return true;

          if (term.includes("price")) {
            const priceValue = parseInt(term.replace(/\D/g, ""));
            if (!isNaN(priceValue) && ws.price <= priceValue) return true;
          }
          // Check for date format (YYYY-MM-DD) in the search term
          if (term.match(/\d{4}-\d{2}-\d{2}/)) {
            const searchDate = new Date(term);
            const availability = new Date(ws.availability);
            if (!isNaN(searchDate.getTime()) && availability <= searchDate) return true;
          }

          return false;
        });
      }

      return false;

    }) &&

    (parking === "" || (parking === "yes" && prop.parking) || (parking === "no" && !prop.parking)) &&
    (transit === "" || (transit === "yes" && prop.publicTransit) || (transit === "no" && !prop.publicTransit)) &&
    (isNaN(minSquareFootage) || prop.squareFootage >= minSquareFootage)&&
    (isNaN(maxSquareFootage) || prop.squareFootage <= maxSquareFootage) &&
    prop.workspaces.some(ws => {
      return(
        (smoking === "" || (smoking === "yes" && ws.smokingAllowed) || (smoking === "no" && !ws.smokingAllowed)) &&
        (isNaN(minPrice) || ws.price >= minPrice) &&
        (isNaN(maxPrice) || ws.price <= maxPrice) &&
        (isNaN(minSeats) || ws.seats >= minSeats) &&
        (isNaN(maxSeats) || ws.seats <= maxSeats) &&
        (isNaN(minSquareFootage) || ws.squareFootage >= minSquareFootage) &&
        (isNaN(maxSquareFootage) || ws.squareFootage <= maxSquareFootage)&&
        (leaseOption === "" || (ws.leaseOption && ws.leaseOption.toLowerCase() === leaseOption)) &&
        (isNaN(availableDate.getTime()) || new Date(ws.availability) <= availableDate)
      );
      
      
    });
  
  });

  renderProperties(filtered);
}



renderProperties(properties);



document.getElementById("searchWorkspace").addEventListener("click", filterAndSearch);
document.getElementById("sortDropdown").addEventListener("click", filterAndSearch);
document.getElementById("filterDropdown").addEventListener("click", filterAndSearch);

