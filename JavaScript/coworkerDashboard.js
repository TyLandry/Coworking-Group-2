// Remove this line
//const properties = JSON.parse(localStorage.getItem("properties")) || [];

let properties = [];// will be fetched from backend

// Fetch properties from backend
async function fetchProperties() {
  try{
    const token = sessionStorage.getItem("token");
    const res = await fetch("http://localhost:3000/api/properties", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    if(!res.ok) throw new Error("Failed to fetch properties from backend");
    properties= await res.json();

    // Fetch workspaces for each property
    const propsWithWorkspaces = await Promise.all(
      properties.map(async (prop) => {
        const wsRes = await fetch(`http://localhost:3000/api/properties/${prop._id}/workspaces`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });
        const workspaces = wsRes.ok ? await wsRes.json() : [];
        return { ...prop, workspaces };
      })
    );

    properties = propsWithWorkspaces;

    console.log("Fetched properties:", properties);

    // Render properties after fetching
    renderProperties(properties);

  }catch (err){
    console.error("Error fetching properties:", err);
    alert("Failed to load properties. Try again later.");
  }  
}

export class coworkerDashboard {
  constructor(galleryId, searchId, sortId, filterId) {
    this.galleryId = galleryId;
    this.searchId = searchId;
    this.sortId = sortId;
    this.filterId = filterId;

    // this.properties = JSON.parse(localStorage.getItem("properties")) || [];
    this.init();
  }

  init() {
    //this.renderProperties(this.properties);
    fetchProperties();

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

  renderProperties(props) {
    renderProperties(props);
  }

  filterAndSearch() {
    filterAndSearch();
  }
}

function renderProperties(props) {
  const gallery = document.getElementById("propertiesGallery");
  gallery.innerHTML = "";

  props.forEach(prop => {
    // Backend sends `sqft` and `publicTransportation`
    // Old localStorage version used `squareFootage` and `publicTransit`
    const title = prop.name || prop.address || "—"; 
    const sqft = prop.sqft ?? prop.squareFootage ?? "—"; 
    const reachablePublic = prop.publicTransportation ?? prop.publicTransit ?? false; 
    const photo = prop.photo || "https://via.placeholder.com/400x240?text=Property";

    const card = document.createElement("div");
    card.className = "property-card";
    card.innerHTML = `
      <img src="${photo}" alt="${title}" />
      <h3>${title}</h3>
      <p><strong>Address:</strong> ${prop.address || "—"}</p>
      <p><strong>Neighborhood:</strong> ${prop.neighborhood || "—"}</p>
      <p><strong>Square Footage:</strong> ${sqft} sq ft</p>
      <div class="checkbox-group">
        <label>
          <input type="checkbox" disabled ${prop.parking ? "checked" : ""} />
          Parking Available
        </label>
        <label>
          <input type="checkbox" disabled ${reachablePublic ? "checked" : ""} />
          Reachable by Public Transit
        </label>
      </div>
      <div class="property-actions">
        <button class="select-btn blue" data-id="${prop._id || prop.id}">Select</button>
      </div>
    `;
    gallery.appendChild(card);
  });

  // Add event listeners for "Select" buttons
  gallery.querySelectorAll('.select-btn').forEach(button => {
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

  //price fixed
  const minPrice = parseInt(document.getElementById("minPrice").value.replace(/[^\d]/g, "")) || 0;
  const maxPrice = parseInt(document.getElementById("maxPrice").value.replace(/[^\d]/g, "")) || Infinity;;
  const minSeats = parseInt(document.getElementById("minSeats").value)|| 0;
  const maxSeats = parseInt(document.getElementById("maxSeats").value) || Infinity;;
  const minSquareFootage = parseInt(document.getElementById("minSquareFootage").value) ||0;
  const maxSquareFootage = parseInt(document.getElementById("maxSquareFootage").value) || Infinity;;
  const availableDate = new Date(document.getElementById("availableDate").value);
  const leaseOption = document.getElementById("leaseOption").value.toLowerCase();
  const parking = document.getElementById("parkingFilter").value;
  const transit = document.getElementById("transitFilter").value;
  const smoking =document.getElementById("smokingFilter").value;



  const filtered = properties.filter(prop => {
    // Filter by keywords
    const keywordMatch = keywords.every(term => {
      if (!term) return true;
      if (prop.name.toLowerCase().includes(term)) return true;
      if (prop.address.toLowerCase().includes(term)) return true;
      if (prop.neighborhood.toLowerCase().includes(term)) return true;
      if (String(prop.squareFootage).includes(term)) return true;
     

      // //for square foot search to work
      // const squareFootageMatch = term.match(/^(\d+)s*(sq\s*ft)?$/);
      // if(squareFootageMatch) {
      //   const termNumber = parseInt(squareFootageMatch[1]);
      //   if(prop.squareFootage === termNumber) return true;
      // }

      
      if (prop.workspaces) {
        return prop.workspaces.some(ws => {
          if (ws.name?.toLowerCase().includes(term)) return true;
          if (ws.type?.toLowerCase().includes(term)) return true;
          if (String(ws.seats).includes(term)) return true;
          if (String(ws.price).includes(term)) return true;

          if (term === "parking" && prop.parking) return true;
          if (term === "no parking" && !prop.parking) return true;

          if (term === "transit" && prop.publicTransit) return true;
          if (term === "no transit" && !prop.publicTransit) return true;

          if (term === "smoking" && ws.smokingAllowed) return true;
          if ((term === "non-smoking" || term === "nosmoking") && !ws.smokingAllowed) return true;

          if (ws.leaseOption?.toLowerCase().includes(term)) return true;
      

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

    });
  
  //   (isNaN(minSquareFootage) || prop.squareFootage >= minSquareFootage)&&
  //   (isNaN(maxSquareFootage) || prop.squareFootage <= maxSquareFootage) &&
 
  //   (parking === "" || (parking === "yes" && prop.parking) || (parking === "no" && !prop.parking)) &&
  //   (transit === "" || (transit === "yes" && prop.publicTransit) || (transit === "no" && !prop.publicTransit)) &&
    
    
  //   prop.workspaces.some(ws => {
  //     return(
  //       (smoking === "" || (smoking === "yes" && ws.smokingAllowed) || (smoking === "no" && !ws.smokingAllowed)) &&
  //       (isNaN(minPrice) || ws.price >= minPrice) &&
  //       (isNaN(maxPrice) || ws.price <= maxPrice) &&
  //       (isNaN(minSeats) || ws.seats >= minSeats) &&
  //       (isNaN(maxSeats) || ws.seats <= maxSeats) &&
  //       // (isNaN(minSquareFootage) || (ws.squareFootage && ws.squareFootage >= minSquareFootage)) &&
  //       // (isNaN(maxSquareFootage) || (ws.squareFootage && ws.squareFootage <= maxSquareFootage))&&
  //       (leaseOption === "" || (ws.leaseOption && ws.leaseOption.toLowerCase() === leaseOption)) &&
  //       (isNaN(availableDate.getTime()) || new Date(ws.availability) <= availableDate)
  //     );
      
      
  //   });
  
  // });
  if (!keywordMatch) 
    return false;

    // Property-level filters
    if (parking === "yes" && !prop.parking) return false;
    if (parking === "no" && prop.parking) return false;
    if (transit === "yes" && !prop.publicTransit) return false;
    if (transit === "no" && prop.publicTransit) return false;
    if (prop.squareFootage < minSquareFootage || prop.squareFootage > maxSquareFootage) return false;

    // Workspace-level filters
    const wsMatch = prop.workspaces.some(ws => {
      if (smoking === "yes" && !ws.smokingAllowed) return false;
      if (smoking === "no" && ws.smokingAllowed) return false;
      if (ws.seats < minSeats || ws.seats > maxSeats) return false;
      if (ws.price < minPrice || ws.price > maxPrice) return false;
      if (leaseOption && ws.leaseOption?.toLowerCase() !== leaseOption) return false;
      if (!isNaN(availableDate.getTime()) && new Date(ws.availability) > availableDate) return false;
      return true;
    });

    return wsMatch;
  });

  console.log("Filtered properties:", filtered);
  renderProperties(filtered);
}

// Event listeners
document.getElementById("searchWorkspace").addEventListener("click", filterAndSearch);
// document.getElementById("sortDropdown").addEventListener("click", filterAndSearch);
document.getElementById("filterDropdown").addEventListener("click", filterAndSearch);

// Start by fetching properties from backend
fetchProperties();

// Create dashboard instance
new coworkerDashboard('propertiesGallery', 'searchWorkspace', null, 'filterDropdown');