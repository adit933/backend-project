import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const userRegister = asyncHandler( async ( req , res ) => {
   //get user details from frontend
   //validation - not empty     
   //check if user already exist: username or email
   //check for images
   //check for avatar 
   //if there then upload to cloudinary
   //create user objects - creation of entry in db
   //remove password and refresh token field from response
   //check for user creation
   //return res




   const {fullName , email , username , password} = req.body

   if(fullName === "")
   {
      throw new ApiError(400 , "fullName is required!!!!")
   }
   if(email === "")
   {
      throw new ApiError(400 , "email is required!!!!")
   }

   if(username === "")
   {
         throw new ApiError(400 , "username is required!!!!")
   }

   if(password === "")
   {
      throw new ApiError(400 , "password is required!!!!")
   }



   /*
   another method of doing the same

   if(
      [fullName , password , username , email].some( (fields) => fields.trim() === "")
   )
   */


   const existedUser =  User.findOne({
      $or : [{ username } , { email }]
   })
   // console.log(existedUser);

   if(existedUser)
   {
      throw new ApiError(409 , "user with username or email already exist")
   }

   const avatarLocalPath = req.files?.avatar[0]?.path
   const coverImageLocalPath = req.files?.coverImage[0]?.path

   if(!avatarLocalPath)
   {
      throw new ApiError(400 , "avatar file is required")
   }

   const avatar = await uploadOnCloudinary(avatarLocalPath)
   const coverImage = await uploadOnCloudinary(coverImageLocalPath)

   if(!avatar){
      throw new ApiError(400 , "avatar file is required")
   }


   //making entry in the database
   const user = await User.create({
      avatar : avatar.url,
      coverImage : coverImage?.url || "", // making a check for coverimage beacuse it is not mandatory therefore previous checks have not benn initialized
      email : email,
      password : password,
      username : username.toLowerCase()
      

   })

   const createdUser = await User.findById(user._id).select(//the following is used for removing the field mentioned in the ""with -sign infront of it
      "-password -refreshToken"
   )

   if(!createdUser)
   {
      throw new ApiError(500 , "something went wrong while registering")
   }

   return res.status(201).json(
      new ApiResponse(200 , createdUser , "user registered successfully")
   )

} )

export { userRegister }