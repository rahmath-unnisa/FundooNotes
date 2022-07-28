import { client } from "../config/redisdatabase";
import HttpStatus from 'http-status-codes'

export const redisAuth = async(req,res,next) =>{
    const result = await client.get('AddNote');
    console.log(result)
    if(result){
        const data = JSON.parse(result)
        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            data:data,
            message:"Fetched all notes from Redis"
        })
    }else{
        next();
    }
};