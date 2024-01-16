const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../model/UserModel");


const protect = asyncHandler(async (req, res, next) => {
   try {
      const token = req.cookies.token;

      if (!token) {
         res.status(401);
         throw new Error("User is not authorized: Token not found");
      }

      // Verify the token
      const verified = jwt.verify(token, process.env.JWT_SECRET);

      // Get user ID from the token
      const user = await User.findById(verified.id).select("-password");

      if (!user) {
         res.status(401);
         throw new Error("User is not authorized: User not found");
      }

      req.user = user;
      next();
   } catch (error) {
      console.error(error); // Log the actual error for debugging
      res.status(401);
      throw new Error("User is not authorized: Invalid token");
   }
});
//admin middleware
const adminOnly=(req, res, next)=>{
   if(req.user && req.user.role === "admin")
   { next()

   }
   else{
      res.status(401);
      throw new Error("Not Authorized as an Admin.")
   }

}

module.exports = {
   protect,
   adminOnly,
};
