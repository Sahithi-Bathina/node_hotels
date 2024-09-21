const express = require('express');
const router = express.Router();
const person = require('./../models/person');

router.post('/', async (req,res)=>{
    try{
      const data = req.body //assumes the req body contains person data
    
      //create a new person doc using the mongoose model
      const newPerson = new person(data);
      //save the new person to the database
      const response = await newPerson.save();
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
        const data = await person.find();
        console.log("data fetched");
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error : "Internal server error"})
    }
})

router.get("/:worktype" , async (req , res) => {
    try{
        const worktype = req.params.worktype;
        if(worktype == 'chef' || worktype == 'manager' ||worktype == 'waiter'){
        const response = await person.find({work: worktype});
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

router.put('/:id', async(req,res)=>
{try{
    const personId = req.params.id;
    const updatedpersondata =req.body;

    const response = await person.findByIdAndUpdate(personId,updatedpersondata,{
        new:true,
        runValidators: true,
    })
    if(!response){
        return res.status(404).json({error:'person not found'});
    }
    console.log('data updated');
    res.status(200).json(response);
}catch(err){
    console.log(err);
    res.status(500).json({error:'internal server error'});
}

})
router.delete('/:id', async(req,res)=>
   {try{
       const personId = req.params.id;
        
    
      const response = await person.findByIdAndDelete(personId);
            
       if(!response){
            return res.status(404).json({error:'person not found'});
       }
        console.log('data deleted');
        res.status(200).json({message: 'person deleted'});
        
    }catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'});
    }
    
    })



module.exports = router;