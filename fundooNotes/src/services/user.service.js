import { Console } from 'winston/lib/winston/transports';
import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { sendMail } from '../utils/helper';
import { producer } from '../utils/rabbitmq';

//------->User registration

export const userRegistration = async (body) => {
 console.log("Body before hashing", body)
  const saltRounds =10
  const hashpassword=await bcrypt.hash(body.password, saltRounds)
  console.log("Hashed password", hashpassword);
  body.password = hashpassword
  console.log("After hashing ",body)
  const data = await User.create(body);
  producer(data);
  return data;
};
//------->Login

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

//--------> Forget password
export const  forgetPassword = async (body) => {
  const data = await User.findOne({ "email": body.email });
  
  if (data != null) {
    const token = await jwt.sign({ email: data.email,_id:data._id }, process.env.PASSWORDKEY);
    const mailsend = await sendMail(data.email, token);
    return mailsend;
  } else {
    throw new Error("Email not found");
  }
}

export const resetPassword = async (token, body) => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password,saltRounds);
  body.password = passwordHash; 
  const data = User.findOneAndUpdate(
    {
      email: body.email
    },
    {
      password: body.password
    },
    {
      new: true
    })
  return data;
};