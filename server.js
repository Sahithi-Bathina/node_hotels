const express = require('express')
const app = express()
const db = require('./db')

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const menu = require('./models/menu');

app.get('/', function (req, res) {
  res.send('welocme to my hotel... How can i help you')
})

//post route to add a person
app.post('/menu', async (req,res)=>{
try{
  const data = req.body //assumes the req body contains person data

  //create a new person doc using the mongoose model
  const newMenu = new menu(data);
  //save the new person to the database
  const response = await newMenu.save();
  console.log('data saved');
      res.status(200).json(response);
  }
    catch(err){
      console.log(err);
      res.status(500).json({error: 'inetrnal serevr Error'});
    }
      
    })

app.get('/menu', async (req,res)=>{
  try{
    const data = await menu.find();
    console.log('data fetched');
    res.status(200).json(data);
  }catch(err){
    console.log(err);
      res.status(500).json({error: 'inetrnal serevr Error'});
  }
})

const personRoutes = require('./Routes/personRoutes');
const menuRoutes = require('./Routes/menuRoutes');

app.use('/person', personRoutes);
app.listen(3000 , () => {
    console.log("listening on port 3000")
})