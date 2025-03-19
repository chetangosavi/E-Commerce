import Form from "@/components/common/Form";
import { registerFormControlls } from "@/config/config";
import { useState } from "react";
import { Link } from "react-router-dom";

const initialState = {
  name:'',
  email:'',
  password:''
}

const Register = () => {

  const [formData, setFormData] = useState(initialState);
  console.log(formData)
  
  function onSubmit (){

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