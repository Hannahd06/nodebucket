"use strict";

const { MongoClient } = require('mongodb');

// Crete a variable to hold link to connect to MongoDB collection
const MONGO_URL = 'mongodb+srv://nodebucket_user:s3cret@bellevueuniversity.ozktyyu.mongodb.net/nodebucketDB?retryWrites=true&w=majority';

// Connect to mongoDB
const mongo = async(operations, next) => {
  try {
    console.log('connecting to db...');

    const client = await MongoClient.connect(MONGO_URL, {
      useNewURLParser: true,
      useUnifiedTopology: true
    });

    const db = client.db('nodebucketDB');
    console.log('Connected to db');

    await operations(db);
    console.log('Operation was successful');

    client.close();
    console.log("Connection to db closed");

  } catch(err) {
    const error =  new Error('Error connecting to db:', err);
    error.status = 500;

    console.log('Error connecting to db', err);
    next(error);
  }
};

module.exports = { mongo };