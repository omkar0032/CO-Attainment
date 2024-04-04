const jwt=require("jsonwebtoken");

function setUser(id,user){
    // sessioIdUserMap.set(id,user);
}

function getUser(token){
    if(!token){
        return null;
    }
   try{
    return jwt.verify(token,"suyash");
   }catch(error){
    return null;
   }
}

module.exports={setUser,getUser}