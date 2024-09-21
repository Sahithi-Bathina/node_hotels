const express = require('express');
const router = express.Router();
const menu = require('./../models/menu');

router.post('/', async (req,res)=>{
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
    //GET method to fetch person data
router.get("/" , async (req , res) => {
    try{
        const data = await menu.find();
        console.log("data fetched");
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error : "Internal server error"})
    }
})

router.get("/:taste" , async (req , res) => {
    try{
        const taste = req.params.taste;
        if(taste == 'sweet' || worktype == 'spice' ||worktype == 'sour'){
        const response = await menu.find({work: taste});
        console.log('response fetched');
        res.status(200).json(response);
        }else{
            res.status(404).json({error: 'invalid workType'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error : "Internal server error"})
    }
})

module.exports = router;