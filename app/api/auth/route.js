import {connectToDB} from '@utils/database';
import bcrypt from 'bcrypt';
import User from '@/models/user';


// export default async function handler(req, res) {
//     // if (req.method === 'POST') {
//     //     console.log(req)
//     //     res.status(200).json({ message: 'Success' });
//     // }
  
   
//     res.status(200).json({ text: 'Hello' });

//     // Do something with the name and email data (e.g. save to database)
  
    
//   }

export const GET=async(request)=> 
{
  return new Response(JSON.stringify({message: "Hello"}), { status: 500 });
}


export const POST=async(request)=> 

{
   const req = await request.json()

    const saltRounds = 12;
    const password = req.password;

    try{

        await connectToDB();

        const hashed_password = await bcrypt.hash(password,saltRounds)
        req.password = hashed_password
        console.log("=>",req)

        const user = new User(req);
        console.log("user created: ", user)

        await user.save()

        return new Response(JSON.stringify(user), { status: 200 })


    }

    catch(err){
        console.log(err.message);
        return new Response(JSON.stringify({message: err.message}), { status: 500 });

    }
}
 
