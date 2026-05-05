import mongoose , {Schema} from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        username : {
            type : String,
            required : true,
            unique : true,
            lowercase : true,
            trim : true,
            index : true // basically used for searching to enable searching field on any field
        },

        email : {
            type : String,
            required : true,
            unique : true,
            lowercase : true,
            trim : true,
            
        },

        fullName : {
            type : String,
            required : true,
            trim : true,
            index : true // basically used for searching to enable searching field on any field
        },

        avatar : {
            type : String, // cloudinary 
            required : true

        },

        coverImage : {
            type : String, // cloudinary 

        },

        watchHistory : [
            {
                type : Schema.Types.ObjectId,
                ref : "Video"
            }
        ],

        password : {
            type: String,
            required : [true , "some password is required"]
        },

        refreshToken : {
            type : String
        }
    },
    {
        timestamps : true
    }
)

//====================== password encryption ========================================================================


userSchema.pre("save" , async function(next)//it is a time taking process therefore async
    {
        if(!this.isModified("password")) next()//if password is specifically modified then only excrypt it otherwise leave it as it was

        this.password = await bcrypt.hash(this.password , 10)
        next()
    }
)//avoid using () => {} beacuse of the absence of this reference


userSchema.methods.isPasswordCorrect = async function(password)
{
    return await bcrypt.compare(password , this.password)//used for comparing actual vs encrypted password
}



//============================================================================================================================



//====================== TOKEN GENERATOR ========================================================================


userSchema.methods.generateAccessToken = async function(){
    return jwt.sign(
        {
            _id : this.id,
            email : this.email,
            username : this.username,
            fullName : this.fullName
        },

        process.env.ACCESS_TOKEN_SECRET,

        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}


userSchema.methods.refreshTokenGenerator = async function(){

    jwt.sign(
        {
            _id : this.id
        },

        process.env.REFRESH_TOKEN_SECRET,

        {
            expiresIn : REFRESH_TOKEN_EXPIRY
        }


    )
}

export const User = mongoose.model("User" , userSchema)