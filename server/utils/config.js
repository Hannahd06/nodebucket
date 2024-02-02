/**
 * Title: config.js
 * Author: Professor Krasso
 * Modified by: Hannah Del Real
 * Date: 01/29/34
 */
"use strict";

const db = {
  username: 'nodebucket_user',
  password: 's3cret',
  name: 'nodebucketDB'

};

const config = {
  port: 3000,
  dbURL: `mongodb+srv://${db.username}:${db.password}@bellevueuniversity.ozktyyu.mongodb.net/${db.name}?retryWrites=true&w=majority`,
  dbname: db.name

};

module.exports = config;