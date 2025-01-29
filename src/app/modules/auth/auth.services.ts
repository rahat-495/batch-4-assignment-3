
import { TUser } from "../user/user.interfaces"
import { usersModel } from "../user/user.model";

const registerUserIntoDb = async (paylaod : TUser) => {
    const isUserAlreadyAxist = await usersModel.findOne({email : paylaod.email}) ;
    if(isUserAlreadyAxist){
        throw new Error("This user is already exist !") ;
    }
    const user = await usersModel.create(paylaod) ;
    if(user){
        const result = { _id : user?._id , name : user?.name , email : user?.email } ;
        return result ;
    }
}

export const authServices = {
    registerUserIntoDb ,
}
