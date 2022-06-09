import { connect } from "http2";
//import { Schema, model, connect } from "mongoose";

var express = require('express');
var hostname= 'localhost';
var port = 3000;

const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost:27017/Gurupu';

//connection a MongoDB
mongoose.connect(mongoDB, {useNewUrlPArser: true, useUnifiedTopology: true});
const db = mongoose.connection;
//connect(db);
db.on('error', console.error.bind(console, 'MongoDB connection error: '));
db.once('open', function() {
    console.log("connecté à Mongoose")
  });

//Création des Schémas
const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: String,
    password: String,
    username: String
});

const actuatorSchema= new Schema({
    type: {type: String, required: true, enum: ['BLINDS', 'LIGHT']},
    designation: String,
    state: Boolean
});

const sensorSchema= new Schema({
    type: {type: String, required: true, enum: ['TEMPERATURE', 'HUMIDITY', 'BARO', 'PROXIMITY']},
    designation: String,
    rawValue: Number 
});

//Définition des modèles
const User = mongoose.model('User', userSchema);
const Actuator = mongoose.model('Actuator', actuatorSchema);
const Sensor = mongoose.model('Sensor', sensorSchema);


module.exports = User
module.exports = Sensor
module.exports = Actuator
