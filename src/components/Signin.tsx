import React from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { IProduct } from "../interface/product";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";


// const ProductSchema = Joi.object({
//   name: Joi.string().required().min(3),
//   price : Joi.number().required(),
// })
const Signin = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // resolver: joiResolver(ProductSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (user) => {
      const { data } = await axios.post(`http://localhost:3000/signin`, user);
      localStorage.setItem("user", data)
      return data
    },
  });
  const onSubmit = (user) => {
    console.log(user);
    mutate(user);
    navigate("/signin");
  };
  return (
    <div>
      <div className="container">
        <div className="w-50 mt-5">
          <h2>SIGNUP</h2>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="name"
                {...register("email", { required: true, minLength: 3 })}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                PASSWORD
              </label>
              <input
                type="password"
                className="form-control"
                id="price"
                {...register("password", { required: true, minLength: 3 })}
              />
            </div>

            <button className="btn btn-primary">LOGIN</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
