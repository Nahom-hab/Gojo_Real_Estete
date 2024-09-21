

import mongoose from "mongoose"

const listingSchema = mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   description: {
      type: String,
      required: true,
   }, address: {
      type: String,
      required: true,
   },
   regularPrice: {
      type: String,
      required: true
   },
   discountedPrice: {
      type: String,
      required: true
   },
   bathrooms: {
      type: Number,
      required: true,
   },
   bedrooms: {
      type: Number,
      required: true,
   },
   phoneNumber: {
      type: Number,
      required: true,
   },
   basement: {
      type: Boolean,
      required: true
   },
   parking: {
      type: Number,
      required: true
   },
   RentOrSell: {
      type: String,
      enum: ["rent", "sale", "both"],
      required: true
   },
   HomeType: {
      type: String,
      enum: ["single-family", "condo", "townhouse", "apartment", "bungalow", "duplex", "loft", "villa"],
      required: true,
   },
   imageURLs: {
      type: Array,
      required: true
   },
   userRef: {
      type: String,
      required: true
   },
   lat: {
      type: String,
      required: true
   },
   lon: {
      type: String,
      required: true
   }

}, {
   timestamps: true
})

const Listing = mongoose.model('Listing', listingSchema)

export default Listing