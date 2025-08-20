//Created AddProperty class and encapsulate sensitive variables and functions 
//For better security
//Created AddProperty class and encapsulate sensitive variables and functions 
//For better security
export class AddProperty {
  constructor(formId) {
    this.form = document.getElementById(formId);
    // NOTE: properties in localStorage are no longer used for DB flow; keeping this line to preserve your comment/history
    this.properties = JSON.parse(localStorage.getItem("properties")) || [];
    this.init();
  }

  init() {
    //Attach event listener to the form
    // NOTE: make the handler async so we can use await
    this.form.onsubmit = this.handleSubmit.bind(this);
  }

  //Handle form submission for adding a new property
  // NOTE: async because we await fetch
  async handleSubmit(e) {
    e.preventDefault();
    
    const token = sessionStorage.getItem("token");
    const currentUser = JSON.parse(sessionStorage.getItem("user"));
    // const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

    //Check if currentUser exists and has an email
    // (Also ensure role is owner, since backend requires it via ensureOwner)
    if (!currentUser || !currentUser.email || currentUser.role !== "owner") {
      alert("You must be logged in as an owner to add a property.");
      return;
    }

    //Retrieve form inputs
    const photo = document.getElementById("propertyPhoto").value;
    const address = document.getElementById("propertyAddress").value;
    const name = document.getElementById("propertyName").value;
    const neighborhood = document.getElementById("propertyNeighborhood").value;
    const squareFootage = parseInt(document.getElementById("propertySquareFootage").value, 10);
    const parking = document.getElementById("propertyParking").checked;
    const publicTransit = document.getElementById("propertyPublicTransit").checked;

    //Create a new property object
    const newProperty = {
      // id: Date.now(),
      name: name,
      address: address,
      neighborhood: neighborhood,
      sqft: Number.isFinite(squareFootage) ? squareFootage : 0,
      parking: !!parking,
      publicTransportation: !!publicTransit,
      photo: photo
      // ownerEmail: currentUser.email.trim().toLowerCase(),
      // workspaces: [] 
    };

    // Add the new property to the properties array (deprecated with DB; kept for history)
    // this.properties.push(newProperty);

    // // Save the updated properties array back to localStorage (deprecated with DB; kept for history)
    // localStorage.setItem("properties", JSON.stringify(this.properties));

    try {
      const res = await fetch("http://localhost:3000/api/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // attach JWT for authentication
        },
        body: JSON.stringify(newProperty),
      });

      const data = await res.json();

      if (!res.ok){
        // use backticks for template string
        alert(data?.message || `Failed to add property (status ${res.status})`);
        return;
      }

      //Show a success alert
      alert("Property added successfully!");

      //Redirect to the Owner Dashboard
      window.location.href = "./ownerdashboard.html";

    } catch (err) {
      console.error("Error adding property:", err);
      alert("Network or server error.");
    }
  }
}



// // Handle form submission for adding a new property
// document.getElementById("addPropertyForm").onsubmit = function (e) {
//   e.preventDefault(); // Prevent the default form submission behavior

//   // Retrieve form inputs
//   const photo = document.getElementById("propertyPhoto").value;
//   const address = document.getElementById("propertyAddress").value;
//   const name = document.getElementById("propertyName").value;
//   const neighborhood = document.getElementById("propertyNeighborhood").value;
//   const squareFootage = parseInt(document.getElementById("propertySquareFootage").value, 10);
//   const parking = document.getElementById("propertyParking").checked;
//   const publicTransit = document.getElementById("propertyPublicTransit").checked;

//   // Create a new property object
//   const newProperty = {
//     id: Date.now(), //Method to enerate a unique ID
//     name: name,
//     address: address,
//     neighborhood: neighborhood,
//     squareFootage: squareFootage,
//     parking: parking,
//     publicTransit: publicTransit,
//     photo: photo,
//   };

//   // Retrieve existing properties from localStorage or initialize an empty array
//   const properties = JSON.parse(localStorage.getItem("properties")) || [];

//   // Method to add the new property to the array
//   properties.push(newProperty);

//   // Method to save the updated properties array back to localStorage
//   localStorage.setItem("properties", JSON.stringify(properties));

//   // Show a success alert
//   alert("Property added successfully!");

//   // Redirect to the Owner Dashboard
  
//   window.location.href = "./ownerdashboard.html";
// };

