//References
//https://www.freecodecamp.org/news/use-local-storage-in-modern-applications/
//https://www.devcurry.com/2014/01/using-localstorage-in-html5-with.html
//https://www.w3schools.com/howto/howto_js_redirect_webpage.asp

//Arnold Jansen Agcaoili was also very helpful when it came to the local storage



// Retrieve properties from localStorage or initialize an empty array
const properties = JSON.parse(localStorage.getItem("properties")) || [];

// Function to render properties to HTML
function renderProperties(props) {
  const gallery = document.getElementById("propertiesGallery");
  gallery.innerHTML = ""; // Clear existing content

  //Method to define the HTML structure for each property card
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
        <button onclick="selectProperty(${prop.id})">Select</button>
      </div>
    `;
    gallery.appendChild(card);
  });
}

// Function to select property handler
window.selectProperty = function (id) {
  // Method to save the selected property ID to localStorage
  localStorage.setItem("selectedPropertyId", id);
  // Redirect to the property details page
  window.location.href = "propertydetails.html";
};

// Function to add Property button handler
document.getElementById("addPropertyBtn").onclick = function () {
  window.location.href = "./addproperty.html"; // Ensure the path is correct
};

// Function call for initial render
renderProperties(properties);