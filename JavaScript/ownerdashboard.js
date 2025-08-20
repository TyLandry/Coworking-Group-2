//References
//https://www.freecodecamp.org/news/use-local-storage-in-modern-applications/
//https://www.devcurry.com/2014/01/using-localstorage-in-html5-with.html
//https://www.w3schools.com/howto/howto_js_redirect_webpage.asp

//Arnold Jansen Agcaoili was also very helpful when it came to the local storage


//Convert the existing function/s to a class.
//Add existing functions inside of the Class to make them methods
//References
//https://www.freecodecamp.org/news/use-local-storage-in-modern-applications/
//https://www.devcurry.com/2014/01/using-localstorage-in-html5-with.html
//https://www.w3schools.com/howto/howto_js_redirect_webpage.asp

//Arnold Jansen Agcaoili was also very helpful when it came to the local storage


//Convert the existing function/s to a class.
//Add existing functions inside of the Class to make them methods
export class Property {
  constructor(galleryId, addButtonId) {
    this.galleryId = galleryId;
    this.addButtonId = addButtonId;
    //Retrieve properties from localStorage or initialize an empty array
    // NOTE: Local copy kept for history; actual source is now the backend API.
    this.properties = JSON.parse(localStorage.getItem("properties")) || [];
    this.init();
  }

  //Put existing methods into one method to call them
  init() {
    //Render properties on initialization
    // this.renderProperties(this.properties); // (old localStorage render)
    // NEW: load from API then render
    this.loadAndRenderFromAPI();

    //Bind event listener for the add property button
    const addBtn = document.getElementById(this.addButtonId);
    if (addBtn) {
      addBtn.addEventListener('click', this.addProperty.bind(this));
    }
  }

  // NEW: Fetch properties from backend API instead of localStorage
  async loadAndRenderFromAPI() {
    try {
      const res = await fetch("http://localhost:3000/api/properties"); // public GET
      if (!res.ok) throw new Error(`Failed to load properties (${res.status})`);
      const data = await res.json();
      // Store a copy locally (optional) to preserve your original pattern
      this.properties = Array.isArray(data) ? data : [];
      //Render properties to HTML
      this.renderProperties(this.properties);
    } catch (err) {
      console.error("Error fetching properties:", err);
      // Fallback to whatever is in localStorage if API fails
      this.renderProperties(this.properties);
    }
  }

  //Function to render properties to HTML
  renderProperties(props) {
    const gallery = document.getElementById(this.galleryId);
    if (!gallery) return;
    gallery.innerHTML = ""; // Clear existing content

    //Method to define the HTML structure
    props.forEach(prop => {
      //Backend schema fields:
      const title = prop.name || prop.address; // show name if you store it; otherwise address
      const sqft = prop.sqft ?? prop.squareFootage ?? 0; // support your old field just in case
      const reachablePublic = prop.publicTransportation ?? prop.publicTransit ?? false;
      const photo = prop.photo || "https://via.placeholder.com/400x240?text=Property"; // fallback image
      //Card for the property
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
          <button class="select-property" data-id="${prop._id || prop.id}">Select</button>
        </div>
      `;
      gallery.appendChild(card);
    });

    // Add event listeners for all "Select" buttons dynamically
    const selectButtons = gallery.querySelectorAll('.select-property');
    selectButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const propertyId = e.target.getAttribute('data-id');
        this.selectProperty(propertyId);
      });
    });
  }

  //Function to add Property button handler
  addProperty() {
    window.location.href = "./addproperty.html"; 
  }

  //Function to select property handler
  selectProperty(id) {
    // Method to save the selected property ID to localStorage
    localStorage.setItem("selectedPropertyId", id);
    // Redirect to the property details page
    window.location.href = "propertydetails.html";
  }
}




// // Retrieve properties from localStorage or initialize an empty array
// const properties = JSON.parse(localStorage.getItem("properties")) || [];

// // Function to render properties to HTML
// function renderProperties(props) {
//   const gallery = document.getElementById("propertiesGallery");
//   gallery.innerHTML = ""; // Clear existing content

//   //Method to define the HTML structure for each property card
//   props.forEach(prop => {
//     const card = document.createElement("div");
//     card.className = "property-card";
//     card.innerHTML = `
//       <img src="${prop.photo}" alt="${prop.name}" />
//       <h3>${prop.name}</h3>
//       <p><strong>Address:</strong> ${prop.address}</p>
//       <p><strong>Neighborhood:</strong> ${prop.neighborhood}</p>
//       <p><strong>Square Footage:</strong> ${prop.squareFootage} sq ft</p>
//       <div class="checkbox-group">
//         <label>
//           <input type="checkbox" disabled ${prop.parking ? "checked" : ""} />
//           Parking Available
//         </label>
//         <label>
//           <input type="checkbox" disabled ${prop.publicTransit ? "checked" : ""} />
//           Reachable by Public Transit
//         </label>
//       </div>
//       <div class="property-actions">
//         <button onclick="selectProperty(${prop.id})">Select</button>
//       </div>
//     `;
//     gallery.appendChild(card);
//   });
// }

// // Function to select property handler
// window.selectProperty = function (id) {
//   // Method to save the selected property ID to localStorage
//   localStorage.setItem("selectedPropertyId", id);
//   // Redirect to the property details page
//   window.location.href = "propertydetails.html";
// };

// // Function to add Property button handler
// document.getElementById("addPropertyBtn").onclick = function () {
//   window.location.href = "./addproperty.html"; // Ensure the path is correct
// };

// // Function call for initial render
// renderProperties(properties);