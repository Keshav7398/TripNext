const Listing = require("../models/listing");
const ExpressError = require("../utils/ExpressError");


// ================= INDEX =================
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};


// ================= NEW FORM =================
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.create = async (req, res) => {

  if (!req.file) {
    throw new Error("FILE NOT RECEIVED");
  }

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;

  newListing.image = {
    url: req.file.path,
    filename: req.file.filename,
  };

  await newListing.save();
  res.redirect(`/listings/${newListing._id}`);
};



// ================= SHOW =================
module.exports.show = async (req, res) => {
  const listing = await Listing.findById(req.params.id)
    .populate("owner")
    .populate({
      path: "reviews",
      populate: { path: "author" }
    });

  if (!listing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", { listing });
};


// ================= EDIT FORM =================
module.exports.renderEditForm = async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) throw new ExpressError(404, "Listing not found");
  res.render("listings/edit.ejs", { listing });
};

// ================= UPDATE =================
module.exports.update = async (req, res) => {
  const { id } = req.params;


  const listing = await Listing.findByIdAndUpdate(
    id,
    req.body.listing,
    { new: true, runValidators: true }
  );

  if (req.file) {
    listing.image = {
      url: req.file.path,
      filename: req.file.filename
    };
    await listing.save();
  }

  req.flash("success", "Listing updated successfully");
  res.redirect(`/listings/${id}`);
};


// ================= DELETE =================
module.exports.delete = async (req, res) => {
  await Listing.findByIdAndDelete(req.params.id);
  req.flash("success", "Listing deleted successfully");
  res.redirect("/listings");
};
