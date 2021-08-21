const Joi = require('joi');
const mongoose = require('mongoose');
const {categorySchema} = require('./category');

const Offering = mongoose.model('Offerings', new mongoose.Schema({
    nameBv:{
      type: String,
      required: true,   
      trim: true,
      minlength: 2,
      maxlength: 255
  },
  category:{
      type: categorySchema,
      required: true
  },
  noOfRounds:{
      type: Number,
      required: true,
      min: 0,
      max: 255
  },
  bookDistribute:{
      type: Number,
      required: true,
      min: 0,
      max: 2000,
  },  
  lectureHeard:{
      type: Number,
      required: true,
      min: 0,
      max: 2000,
  },  
  slokasLearn:{
      type: Number,
      required: true,
      min: 0,
      max: 2000,
  },
    submitDate:{
        type: Date,
        required: true,
    }
}));

function validateOffering(offering) {
  const schema = {
    nameBv: Joi.string().min(2).max(50).required(),
    categoryId: Joi.objectId().required(),
    noOfRounds: Joi.number().min(0).required(),
    bookDistribute: Joi.number().min(0).required(),
    lectureHeard: Joi.number().min(0).required(),
    slokasLearn: Joi.number().min(0).required(),
    submitDate: Joi.date(),
  };

  return Joi.validate(offering, schema);
}

exports.Offering = Offering; 
exports.validate = validateOffering;
