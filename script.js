fetch("http://localhost:3000/props")
  .then((res) => {
    return res.json();
  })
  .then((properties) => {
    let property_card = "";
    console.log("Properties: ", JSON.stringify(properties));
    properties.map((property) => {
      console.log("Property is:", JSON.stringify(property, null, 2));
      // prev code commented
      // const { description, id, image, name, location } = property;
      const {
        id,
        name,
        description,
        berRating,
        price,
        location,
        bedrooms,
        bathrooms,
        type,
        category,
        featuredImage,
        otherMedia,
      } = property;
      console.log(`Property ID is : ${id}`);
      property_card =
        property_card +
        `<div class="prop-card-class" card-id="${id}">
      <img src="${featuredImage}" alt="${featuredImage}" />
      <h2>${name}</h2>
      <p>${location}</p>
      <p>${price}</p>
      </div>`;
    });
    const home_link_a = document.querySelector("#home-link-a");
    home_link_a.style.display = "none";
    document.querySelector("#main-container").innerHTML = property_card;
    const all_property_cards = document.querySelectorAll(".prop-card-class");

    //Search functionality
    document
      .querySelector("#search-button")
      .addEventListener("click", searchProperty);

    function searchProperty() {
      let property_card = "";
      console.log(`Search Clicked`);
      const searchValue = document
        .querySelector("#search-input")
        .value.trim()
        .toLowerCase();
      console.log(`Search Value : ${searchValue}`);
      console.log("Type of search value is : ", typeof searchValue);
      let lcProperty = "";
      const properties_returned = properties.filter((property) => {
        lcProperty = property.location.toLowerCase();
        return lcProperty.includes(searchValue);
      });

      properties_returned.map((property) => {
        console.log("Property is:", JSON.stringify(property, null, 2));
        const { description, id, featuredImage, name, location, otherMedia } =
          property;
        console.log(`Property ID is : ${id}`);
        property_card =
          property_card +
          `<div class="prop-card-class" card-id="${id}">
        <img src="${featuredImage}" alt="${featuredImage}" />
        <h2>${name}</h2>
        <p>${location}</p>
        </div>`;
      });
      document.querySelector("#main-container").innerHTML = property_card;

      console.log("Properties returned :", properties_returned);
      const searched_props = document.querySelectorAll(".prop-card-class");
      //After searching the property click on the property card to go to details page
      searched_props.forEach((prop_card) => {
        console.log("card inside search clicked!!!");
        console.log("Prop Card inside search is: ", JSON.stringify(prop_card));
        prop_card.addEventListener("click", () => {
          let property_id = prop_card.getAttribute("card-id");
          console.log(`property id ${property_id} clicked`);
          const main_container = document.getElementById("main-container");
          main_container.style.display = "none";
          const propertyDetail = properties_returned.find(
            (prop) => prop.id == Number(property_id)
          );
          home_link_a.style.display = "inline-block";
          home_link_a.style.height = "45px";
          home_link_a.style.width = "45px";
          search_div = document.querySelector("#search-div");
          search_div.style.display = "none";
          console.log("Property Detail :", JSON.stringify(propertyDetail));
          showPropertyDetails(propertyDetail);
        });
      });
    }

    //Implemented click event on each card
    all_property_cards.forEach((prop_card) => {
      prop_card.addEventListener("click", () => {
        let property_id = prop_card.getAttribute("card-id");
        console.log(`property id ${property_id} clicked`);
        const main_container = document.getElementById("main-container");
        main_container.style.display = "none";
        const propertyDetail = properties.find(
          (prop) => prop.id == Number(property_id)
        );
        home_link_a.style.display = "inline-block";
        home_link_a.style.height = "45px";
        home_link_a.style.width = "45px";
        search_div = document.querySelector("#search-div");
        search_div.style.display = "none";
        console.log("Property Detail :", JSON.stringify(propertyDetail));
        showPropertyDetails(propertyDetail);
      });
    });
    console.log(all_property_cards);
  });

function showPropertyDetails(property) {
  console.log("Inside show property details");
  console.log("Property is :", JSON.stringify(property));
  property_details_container = document.querySelector(
    ".property-details-container"
  );
  property_details_container.style.display = "flex";
  console.log("other media is :", JSON.stringify(property.otherMedia));
  property_details_container.innerHTML = `
    <div class="property-details-card">
      <div class="slider">
        <div class="pictures" id="pictures">
            <img src="${property.otherMedia[0].src}" class="photo" id ="photo1" alt="photo-1">
            <img src="${property.otherMedia[1].src}" class="photo" id="photo2" alt="photo-2">
            <img src="${property.otherMedia[2].src}" class="photo" id="photo3" alt="photo-3">
            <img src="${property.otherMedia[3].src}" class="photo" id="photo4" alt="photo-4">
        </div>
    </div>
      <h2 id="details-property-name">${property.name}</h2>
      <p>${property.location}</p>
      <p id="details-description">${property.description}</p>
      <button id ="book-viewing">BOOK VIEWING</button>
    </div>`;
  document
    .querySelector("#home-link-a")
    .addEventListener("click", displayHomePage);
  const book_viewing_button = document.getElementById("book-viewing");
  book_viewing_button.addEventListener("click", () => {
    property_details_container.style.display = "none";
    let booking = document.querySelector(".booking");

    booking.style.display = "flex";

    let booking_form = `<div class="booking-card-class">
      <div class="name-class">
      <label for="name" id="name-label">Name : </label>
      <input type="text" id="name"></input>
      </div>
      <div class="email-class">
      <label for="email" id="email-label">Email : </label>
      <input type="email" id="email"></input>
      </div>
      <div class="date-class">
      <label for="date" id="date-label">Date : </label>
      <input type="date" id="date-input"></input>
      </div>
      <div>
      <button id="book" disabled>SUBMIT</button>
      </div>
    </div>`;
    booking.innerHTML = booking_form;

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const dateInput = document.getElementById("date-input");
    const submitButton = document.getElementById("book");

    function checkAllInputs() {
      if (nameInput.value && emailInput.value && dateInput.value) {
        submitButton.disabled = false;
      } else {
        submitButton.disabled = true;
      }
    }

    //Call checkInputs function to enable or disable the submit button
    nameInput.addEventListener("input", checkAllInputs);
    emailInput.addEventListener("input", checkAllInputs);
    dateInput.addEventListener("input", checkAllInputs);

    //Create appointment heading
    const appt_heading = document.createElement("h2");
    appt_heading.setAttribute("id", "appt-heading");
    const appt_heading_node = document.createTextNode(
      "Fill the form below to book a viewing"
    );
    appt_heading.appendChild(appt_heading_node);
    booking.appendChild(appt_heading);
    booking.insertBefore(appt_heading, booking.firstChild);
    //Return to home page when clicked on the home icon
    document
      .querySelector("#home-link-a")
      .addEventListener("click", displayHomePage);

    //const submitButton = document.querySelector("#book");
    submitButton.addEventListener("click", appendApptBookedDiv);
  });

  function appendApptBookedDiv() {
    //Create appointment div
    const appt_booked_div = document.createElement("div");
    appt_booked_div.setAttribute("id", "appointment-booked-div");

    //Create appointment span
    const appt_span = document.createElement("span");
    appt_span.setAttribute("id", "appointment-booked-span");

    //add span inside the div
    appt_booked_div.appendChild(appt_span);

    //Create textnode
    const node = document.createTextNode("Appointment Booked!");

    appt_span.appendChild(node);
    console.log(`span : ${appt_span}`);

    const booking_class = document.querySelector(".booking");
    booking_class.appendChild(appt_booked_div);
    appt_booked_div.style.display = "block";

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("date-input").value = "";
    document
      .querySelector("#home-link-a")
      .addEventListener("click", displayHomePage);
  }

  function displayHomePage() {
    document.querySelector(".property-details-container").style.display =
      "none";
    document.querySelector(".booking").style.display = "none";
    document.querySelector("#main-container").style.display = "flex";
    document.querySelector("#home-link-a").style.display = "none";
    document.querySelector("#search-div").style.display = "block";
  }
}
