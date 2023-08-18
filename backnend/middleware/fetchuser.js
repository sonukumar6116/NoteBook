var jwt = require('jsonwebtoken');
const JWT_SECRECT = "iamgoodboy%";

const fetchuser=(req,res,next)=>{
      const token = req.header('auth-token');
      if(!token){
            res.status(401).send({err:"please authenticate"})
      }

      try{
            const data = jwt.verify(token,JWT_SECRECT);
            req.user=data.user;
            next();

      }catch(err){
            res.status(401).send({err:"please authenticate"})

      }
}

module.exports=fetchuser;