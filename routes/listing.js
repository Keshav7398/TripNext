const express = require("express");
const router = express.Router();

const {upload}=require("../cloudConfig.js");


const listingController = require("../controllers/listings");
const { isLogin, isOwner, validateListing } = require("../middleware");
const wrapAsync = require("../utils/wrapAsync");


// ================= INDEX =================
router.get(
  "/",
  wrapAsync(listingController.index)
);


// ================= NEW =================
router.get(
  "/new",
  isLogin,
  listingController.renderNewForm
);
router.post(
  "/",
  isLogin,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.create)
);




// ================= SHOW / UPDATE / DELETE =================
router.route("/:id")
  .get(
    wrapAsync(listingController.show)
  )
  .put(
    isLogin,
    isOwner,
     upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.update)
  )
  .delete(
    isLogin,
    isOwner,
    wrapAsync(listingController.delete)
  );


// ================= EDIT =================
router.get(
  "/:id/edit",
  isLogin,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
