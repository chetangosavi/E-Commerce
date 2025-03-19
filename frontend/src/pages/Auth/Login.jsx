
import Form from "@/components/common/Form";
import { loginFormControlls } from "@/config/config";
import React, { useState } from "react";
import { Link } from "react-router-dom";


const initialState = {
  email:'',
  password:''
}

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  console.log(formData)
    function onSubmit (){
  
    }
  return (
    <div className="mx-auto w-full max-w-md space-y-6 shadow-2xl p-10 rounded-2xl">
      <div className="">
        <h1 className=" text-center text-2xl font-bold tracking-tight text-foreground ">
          Login
        </h1>
        <hr className="mt-2 border-dashed"/>
      </div>
      <div>
        <Form 
        key={loginFormControlls.name}
          formControls={loginFormControlls}
          buttonText={'Signup'}
          formData={formData} 
          setFormData={setFormData}
          onSubmit={onSubmit}
          />
      </div>
      <div className="w-full text-center">
        <p>
          Don't have an account ?<Link to='/auth/register' className="font-medium  ml-2 text-blue-500 hover:underline">Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
