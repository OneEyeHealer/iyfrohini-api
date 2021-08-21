const { Category } = require("./models/category");
const { Offering } = require("./models/offering");
const mongoose = require("mongoose");
const config = require("config");

const data = [
  {
      name: "Preacher",
      offerings: [
          { nameBv: "Rasprayana Das", noOfRounds: 16, bookDistribute: 4, lectureHeard: 9, slokasLearn: 101, submitDate: new Date() },
          { nameBv: "Vaykund Das", noOfRounds: 25, bookDistribute: 4, lectureHeard: 13, slokasLearn: 151, submitDate: new Date() },
          { nameBv: "Mohit Das", noOfRounds: 16, bookDistribute: 2, lectureHeard: 23, slokasLearn: 91, submitDate: new Date() },

      ]
  },
  {
     name: "Student",
     offerings:   [
      { nameBv: "Mukund", noOfRounds: 6, bookDistribute: 0, lectureHeard: 21, slokasLearn: 5, submitDate: new Date() },
      { nameBv: "Gaurav Kumar", noOfRounds: 2, bookDistribute: 0, lectureHeard: 18, slokasLearn: 3, submitDate: new Date() },
      { nameBv: "Gaurav Gujjar", noOfRounds: 2, bookDistribute: 0, lectureHeard: 18, slokasLearn: 3, submitDate: new Date() },
      { nameBv: "Harsh Arora", noOfRounds: 2, bookDistribute: 0, lectureHeard: 18, slokasLearn: 3, submitDate: new Date() },
      { nameBv: "Vivek Goel", noOfRounds: 2, bookDistribute: 0, lectureHeard: 18, slokasLearn: 3, submitDate: new Date() },
      { nameBv: "Vivek Shrivastav", noOfRounds: 2, bookDistribute: 0, lectureHeard: 18, slokasLearn: 3, submitDate: new Date() },
      { nameBv: "Kartik Panday", noOfRounds: 2, bookDistribute: 0, lectureHeard: 18, slokasLearn: 3, submitDate: new Date() },
      { nameBv: "Lokesh Mina", noOfRounds: 2, bookDistribute: 0, lectureHeard: 18, slokasLearn: 3, submitDate: new Date() },
      { nameBv: "Ashutosh Yadav", noOfRounds: 2, bookDistribute: 0, lectureHeard: 18, slokasLearn: 3, submitDate: new Date() },
     ]
  },{
        name: "Other",
        offerings: [
            { nameBv: "Govinda", noOfRounds: 16, bookDistribute: 4, lectureHeard: 9, slokasLearn: 101, submitDate: new Date() },
        ]
    }
];

async function seed() {
  await mongoose.connect(config.get("db"), {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false});

  await Offering.deleteMany({});
  await Category.deleteMany({});

  for (let category of data) {
    const { _id: categoryId } = await new Category({ name: category.name }).save();
    const offerings = category.offerings.map(offering => ({
      ...offering,
      category: { _id: categoryId, name: category.name }
    }));
    await Offering.insertMany(offerings);
  }

  mongoose.disconnect();

  console.info("Done!");
}

seed();
