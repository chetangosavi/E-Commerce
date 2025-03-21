
import Form from "@/components/common/Form";
import { registerFormControlls } from "@/config/config";
import { registerUser } from "@/store/authSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner"


const initialState = {
  name:'',
  email:'',
  password:''
}

const Register = () => {

  const [formData, setFormData] = useState(initialState);
  // console.log(formData)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmit(e){
    e.preventDefault();
    dispatch(registerUser(formData)).then((data)=> {
      if(data.payload.success === true){
        toast(data?.payload?.message)
        navigate('/auth/login')
      }
      else{
        toast(data?.payload?.message,{
          variant:'destructive',
        })
      }
    }
    );
  }
  return (
    <div className="mx-auto w-full max-w-md space-y-6 shadow-2xl p-10 rounded-2xl">
      <div className="">
        <h1 className="text-center text-2xl font-bold tracking-tight text-foreground">
          Welcome To UrbanCart
        </h1>
        <hr className="mt-2 border-dashed"/>
        <p className="text-sm text-center mt-1">Create a new account</p>
      </div>
      <div>
        <Form 
          formControls={registerFormControlls}
          buttonText={'Signup'}
          formData={formData} 
          setFormData={setFormData}
          onSubmit={onSubmit}
          />
      </div>
      <div className="w-full text-center">
        <p>
          Already have account ?<Link to='/auth/login' className="font-medium  ml-2 text-blue-500 hover:underline">Signin</Link>
        </p>
      </div>
    </div>
  )
}

export default Register