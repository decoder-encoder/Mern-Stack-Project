const UserModel = require("../Models/User");

const addExpenses=async (req,res)=>{
   const body =req.body;
   const {_id} = req.user;
  try{
     const userData=await UserModel.findByIdAndUpdate(_id,{
        $push:{expenses:body}
    },
{new: true});
return res.status(200).json({
    message:"Expense Added Successfully",
    success:true,
    data:userData?.expenses
});
  }catch(err){
    return res.status(500).json({
        message:"Something went wrong",
        error:err,
        success:false
    })
  }
}
const fetchExpenses =(req,res)=>{
    res.send('fetchExpense');
}
const deleteExpenses =(req,res)=>{
    res.send('deleteExpense');
}
module.exports={
    addExpenses,fetchExpenses,deleteExpenses
}