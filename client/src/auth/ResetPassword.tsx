import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const loading= false;
   return (
       <div className="flex items-center justify-center min-h-screen-full">
           <form className="flex flex-col gap-5 md:border md:p-8w-full max-w-md rounded-lg mx-4">
               <div className="text-center">
                   <h1 className="font-extrabold text-2xl mb-2">Forgot Password</h1>
                   <p className="text-sm text-gray-600">Enter your new Password</p>
               </div>
               <div>
                   <Input
                       type="password"
                       value={newPassword}
                       onChange={(e) => setNewPassword(e.target.value)}
                   placeholder="Enter your New Password"/>
               </div>
               {
                   loading?<Button disabled><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please wait</Button>:<Button > Send Reset Link</Button>
               }
               <div>
                   <span>Back to 
                       <Link to="/login" className="text-blue-500 ml-1">Login</Link>
                   </span>
               </div>
           </form>
     </div>
   )
 }
 
export default ResetPassword;