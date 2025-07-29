// const express = require('express');
// const colors=require('colors')
import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import connectDb from './config/db.js';
import morgan from 'morgan';



const app = express();

// env configration
dotenv.config()

// database configration
connectDb();

function greet(nmae) {
    return nmae;
}

//middleware
app.use(morgan("dev"))
app.use(express.json());

// rest api
app.get('/', (req, res) => {
    const name = greet("Vivek");
    res.send({
        name: name,
        meassage: " Hello we are starting ecommerce app developmet",
    })
})
const PORT = process.env.PoRT || 8080;
app.listen(PORT, () => {
    console.log(`App is  listening in : ${PORT}`.bgBlack)
})