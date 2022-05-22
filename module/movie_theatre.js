const movie_theatre = require('../models/movie_theatre')

exports.createMovie_Theatre = async(req,res,next)=>{
    const Data = new movie_theatre({...req.body})
        try{
            var response = await Data.save();
            res.send(response);
            console.log('Database connected')
        }
        catch(error)
        {console.log(error)}
   
}

exports.getMovie_Theatre = async(req,res,next)=>{
    try{
           var data = await movie_theatre.find();
           res.send(data);
       }
       catch(error)
       {console.log(error)}
  
}

exports.deleteMovie_Theatre = async(req,res,next)=>{
    try{
           var response = await movie_theatre.findByIdAndRemove(req.params.movieid)
           res.send(response);
       }
       catch(error){console.log(error)}
  
}
