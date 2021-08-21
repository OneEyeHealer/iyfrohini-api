const { Offering, validate } = require("../models/offering");
const { Category } = require("../models/category");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
const moment = require("moment");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const offerings = await Offering.find()
    .select("-__v")
    .sort("name");
  res.send(offerings);
});

router.post("/", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send("Invalid category.");

  const date = new Date();
  const offering = new Offering({
      nameBv: req.body.nameBv,
       category: {
           _id: category._id,
           name: category.name,
       },
       noOfRounds: req.body.noOfRounds,
       bookDistribute: req.body.bookDistribute,
       lectureHeard: req.body.lectureHeard,
       slokasLearn: req.body.slokasLearn,
       submitDate: req.body.submitDate,
  });
  await offering.save();

  res.send(offering);
});

router.put("/:id", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send("Invalid category.");

  const offering = await Offering.findByIdAndUpdate(
    req.params.id,{
      nameBv: req.body.nameBv,
      category: {
          _id: category._id,
          name: category.name,
      },
      noOfRounds: req.body.noOfRounds,
      bookDistribute: req.body.bookDistribute,
      lectureHeard: req.body.lectureHeard,
      slokasLearn: req.body.slokasLearn,
      submitDate: req.body.submitDate,
    },
    { new: true }
  );

  if (!offering)
    return res.status(404).send("The offering with the given ID was not found.");

  res.send(offering);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const offering = await Offering.findByIdAndRemove(req.params.id);
  console.log(offering);

  if (!offering)
    return res.status(404).send("The offering with the given ID was not found.");

  res.send(offering);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const offering = await Offering.findById(req.params.id).select("-__v");

  if (!offering)
    return res.status(404).send("The offering with the given ID was not found.");

  res.send(offering);
});

module.exports = router;
