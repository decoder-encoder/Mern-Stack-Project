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
const fetchExpenses =async (req,res)=>{
   const body =req.body;
   const {_id} = req.user;
  try{
     const userData=await UserModel.findById(_id).select('expenses');
return res.status(200).json({
    message:"Fetch Expenses Successfully",
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
const deleteExpenses =async (req,res)=>{
  
   const {_id} = req.user;
   const {expenseId} =req.params;
  try{
     const userData=await UserModel.findByIdAndUpdate(_id,{
        $pull:{expenses:{_id:expenseId}}
    },
{new: true});
return res.status(200).json({
    message:"Expense Deleted Successfully",
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
module.exports={
    addExpenses,fetchExpenses,deleteExpenses
}