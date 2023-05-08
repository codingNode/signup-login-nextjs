import {connectToDB} from '@utils/database';
import bcrypt from 'bcrypt';
import User from '@/models/user';


export const POST=async(request)=> 

{
   const req = await request.json() 
    
    try{

        await connectToDB();

        const user = await User.findOne({email: req.email})
        
        if(user)
        {
            const isValid = await bcrypt.compare(req.password, user.password)

            if(isValid) {
                return new Response(JSON.stringify(user), { status: 200 })
            }
            else
            {
                const mess ={ message: "Password is Invalid"}
                return new Response(JSON.stringify(mess), { status: 400 })
            }

        }
        else
        {
                const mess ={ message: "User not found"}
                return new Response(JSON.stringify(mess), { status: 404 })
        }

    }

    catch(err){
        console.log(err.message);
        return new Response(JSON.stringify({message: err.message}), { status: 500 });

    }
}