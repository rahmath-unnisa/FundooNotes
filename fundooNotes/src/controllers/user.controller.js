import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

/**
 * Controller to get all users available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
//export const getAllUsers = async (req, res, next) => {
  //try {
    //const data = await UserService.getAllUsers();
    //res.status(HttpStatus.OK).json({
      //code: HttpStatus.OK,
      //data: data,
      //message: 'All users fetched successfully'
    //});
  //} catch (error) {
   // next(error);
  //}
//};

/**
 * Controller to get a single user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
//export const getUser = async (req, res, next) => {
  //try {
    //const data = await UserService.getUser(req.params._id);
    //res.status(HttpStatus.OK).json({
      //code: HttpStatus.OK,
      //data: data,
      //message: 'User fetched successfully'
    //});
  //} catch (error) {
    //next(error);
  //}
//};

/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const userRegistration = async (req, res, next) => {
  try {
    const data = await UserService.userRegistration(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Account created successfully'
    });
  } catch (error) {
    next(error);
  }
};
export const Login= async(req,res,next) => {
  try{
    const data = await UserService.Login(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Login Successfull'
    });
  } catch (error) {
    
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
     
      message: `${error}`
    });
    
  }
 };

 export const forgetPassword = async (req, res, next) => {
  try {
    const data = await UserService.forgetPassword(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Email sent successfully'
    });
  } catch (error) {
    res.status(HttpStatus.NOT_FOUND).json({
      code: HttpStatus.NOT_FOUND,
      message: `Email not found`

    });
  }
};

export const resetPassword =async(req,res,next)=>{
  try{
    const data = await UserService.resetPassword(req.params.token,req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
          data: data,
          message: 'Password Updated Succesfully'
    });
  }catch(error){
    next(error);
      }
    };