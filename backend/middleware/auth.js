const {getUser}=require("../service/auth");

async function checkForAuthentication(req, res, next) {
    const tokenCookie = req.cookies?.token;
    req.user = null;

    if (!tokenCookie ) {
        return next();
    }

        const token = tokenCookie;
        const user =getUser(token);
       
        req.user = user;
       
        next();
 
}

function restrictTo(roles = []) {
    return function (req, res, next) {
        console.log(req.user);
        try {
            if (!req.user) {
                return res.redirect("/login");
            }

            if (!roles.includes(req.user.role)) {
                return res.end("Unauthorized");
            }

            return next();
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    };
}


const checkAuth=async(req,res,next)=>{
    const token=req.cookies?.token;
    console.log(token);
    if(!token){
        return res.redirect("/login");
    }
    const user=getUser(token);
    if(!user){
        return res.redirect("/login");
    }
    next();
}

module.exports={checkAuth}