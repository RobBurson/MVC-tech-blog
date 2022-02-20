// import the db connection and the model you're seeding up here
const sequelize = require('../config/connection');
const { Post } = require('../models');
const { User } = require('../models');


// create an array of rows that you want to seed the model with
const postData = [
  {
    title: 'Gandalf',
    post_text: 'Fool of a Took! Throw yourself in next time and rid us of your stupidity!',
    user_id: 1
  },
  {
    title: 'Gollum',
    post_text: 'The Precious! We wants it!',
    user_id: 1
  },
  {
    title: 'Aragorn',
    post_text: 'The Beacons of Minas Tirith! The Beacons are lit! Gondor calls for aid! ',
    user_id: 2
  },
  {
      title: 'Theoden',
      post_text: 'And Rohan will answer. Muster the Rohirrim!',
      user_id: 2
  }
];

// create an array of rows that you want to seed the model with
const users = [
  {
    username: 'samwise',
    password: 'gaffergamgee123'
  },
  {
    username: 'aragon',
    password: 'dunedain1337'
  },
  {
    username: 'gollum',
    password: 'myprecious1234'
  }
];

// create an asynchronous seeding script
const seedPosts = async () => {

  console.log('Seeding data now...');
  console.log('\n=================\n');

  try {
    // use await to handle the async sequelize method
    // call the bulk create method on the model you want to seed
    // pass in the array of objects you want to seed the table with
    await User.bulkCreate(users);
    await Post.bulkCreate(postData);
    

    // catch: handle any errors that might pop up
  } catch (err) {
    console.log(err);
    return;
  }

  console.log('\n=================\n');
  console.log('Seeding successful.');
};

// call the seeding script to seed the table
seedPosts();

module.exports = { seedPosts };