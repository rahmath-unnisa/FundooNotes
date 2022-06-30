import { Console } from 'winston/lib/winston/transports';
import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
//create new user
export const userRegistration = async (body) => {
 console.log("Body before hashing", body)
  const saltRounds =10
  const hashpassword=await bcrypt.hash(body.password, saltRounds)
  console.log("Hashed password", hashpassword);
  body.password = hashpassword
  console.log("After hashing ",body)
  const data = await User.create(body);
  return data;
};

export const Login = async (body) => {
  
  const result = await User.findOne({email:body.email});
  console.log(result)
  if (result != null)

    {
      const Pass = await bcrypt.compare(body.password,result.password);
    
    if(Pass){
      var token = jwt.sign({id: result._id, email :result.email},process.env.SECRETKEY);
      return token
    
    }
    else {
    throw new Error("Password is incorrect");
    }
  }
  else 
  throw new Error("Email does not exist");

}
//update single user
//export const updateUser = async (_id, body) => {
  //const data = await User.findByIdAndUpdate(
    //{
      //_id
    //},
    //body,
   // {
     // new: true
    //}
  //);
  //return data;
//};

//delete single user
//export const deleteUser = async (id) => {
 // await User.findByIdAndDelete(id);
  //return '';
//};

//get single user
//export const getUser = async (id) => {

  //const hashpassword=bcrypt.hash(myPlaintextPassword, saltRounds)
    // const data = await User.findById(id);
  //return data;
//};
