// import { index } from "../../controllers/listing";

// const allListing = await Listing.find({index});

let searchInput = document.querySelector('input');
    searchInput.addEventListener("input", e=>{
      const value = e.target.value;
      console.log(value);
    //   allListing.filter(listing =>{
    //   const isvisibile = listing.title.toLowerCase().includes(value) || listing.location.toLowerCase().includes(value)
    //   listing.element.classList.toggle("hide", !isvisibile);
    // })
})