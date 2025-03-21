import Form from "@/components/common/Form";
import { loginFormControlls } from "@/config/config";
import { loginUser } from "@/store/authSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  console.log(formData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      console.log(data?.payload?.user?.role);
      if (data.payload.success === true) {
        toast(data?.payload?.message);
        if (data?.payload?.user?.role === "admin") {
          navigate("/admin/dashboard");
        }
        else{
          navigate("/client/home");
        }
      } else {
        toast(data?.payload?.message, {
          variant: "destructive",
        });
      }
    });
  }
  return (
    <div className="mx-auto w-full max-w-md space-y-6 shadow-2xl p-10 rounded-2xl">
      <div className="">
        <h1 className=" text-center text-2xl font-bold tracking-tight text-foreground ">
          Login
        </h1>
        <hr className="mt-2 border-dashed" />
      </div>
      <div>
        <Form
          key={loginFormControlls.name}
          formControls={loginFormControlls}
          buttonText={"Signup"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
      </div>
      <div className="w-full text-center">
        <p>
          Don't have an account ?
          <Link
            to="/auth/register"
            className="font-medium  ml-2 text-blue-500 hover:underline"
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
