//wrapper function using promises
const asyncHandler = (requestHandler) => {
    return (req , res , next) => {
        Promise.resolve(requestHandler(req , res , next)).catch((err) => {
            next(err)
        })
    }
}

export {asyncHandler}


















// const asyncHandler = () => {() => {}}
// const asyncHandler = () => () => {}
// const asyncHandler = () => async () => {}


// //wrapper function using try catch    
// const ayncHandler = (fn) => async (req , res , next) => {
//     try{
//         await(req , res , next)
//     }
//     catch(error){
//         res.status(error.code || 500 ).json({
//             success : false,
//             message : error.message
//         })
//     }
// } 