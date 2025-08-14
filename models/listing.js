// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// const Review = require("./review.js");
// const { required } = require("joi");

// const listingSchema = new Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   description: String,
//   image: {
//     url: String,
//     filename: String,
//   },
//   price: Number,
//   location: String,
//   country: String,
//   category: {
//     type: String,
//     enum: ["Tranding", "Rooms", "Iconic Cities", "Mountains", "Castles", "Amazing Pools", "Camping", "Farms", "Artic", "Domes", "Boats"],
//   },
//   reviews: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: "Review",
//     },
//   ],
//   owner: {
//     type: Schema.Types.ObjectId,
//     ref: "User",
//   },
//      geometry : {
//         type: {
//           type: String, // Don't do `{ location: { type: String } }`
//           enum: ['Point'], // 'location.type' must be 'Point'
//           required: true
//         },
//         coordinates: {
//           type: [Number],
//           required: true
//       },
//     },
// });

// listingSchema.post("findOneAndDelete", async (listing) => {
//   if(listing) {
//     await Review.deleteMany({_id : {$in: listing.reviews}});
//   }
// });

// const Listing = mongoose.model("Listing", listingSchema);
// module.exports = Listing;




const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
  category: {
    type: String,
    enum: [
      "Tranding",
      "Rooms",
      "Iconic Cities",
      "Mountains",
      "Castles",
      "Amazing Pools",
      "Camping",
      "Farms",
      "Artic",
      "Domes",
      "Boats",
    ],
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  geometry: {
    type: {
      type: String,
      enum: ["Point"], // Only 'Point' is allowed
      default: "Point", // Auto-set this
      required: true,
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
