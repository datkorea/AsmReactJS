import React from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { IProduct } from "../interface/product";
import { useMutation, useQuery, QueryClient, useQueryClient } from '@tanstack/react-query';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

// const ProductSchema = Joi.object({
//   name: Joi.string().required().min(3),
//   price : Joi.number().required(),
// })
const ProductEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    // resolver: joiResolver(ProductSchema),
    defaultValues: {
      name: "",
      price: 0,
      image: "",
      description: "",
    },
  });

  useQuery({
    queryKey: ["PRODUCT_KEY", id],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:3000/products/${id}`);
      reset(data);
      return data;
    
    }
  })
  const { mutate } = useMutation({
    mutationFn: async (product: IProduct) => {
      return await axios.put(`http://localhost:3000/products/${product.id}`, product);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["PRODUCT_KEY"]
      })
    }
  });
  const onSubmit = (product: IProduct) => {
    mutate(product);
    navigate("/admin");
  };
  return (
    <div>
      <div className="container">
        <div className="w-50 mt-5">
          <h2>Update product</h2>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name Product
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                {...register("name", { required: true, minLength: 3 })}
              />
              {errors?.name?.message && (
                <span className="text-danger">{errors?.name.message}</span>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="text"
                className="form-control"
                id="price"
                {...register("price", { required: true, minLength: 3 })}
              />
              {errors?.price?.message && (
                <span className="text-danger">{errors?.price.message}</span>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Image
              </label>
              <input type="text" className="form-control" id="image" />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Desc
              </label>
              <textarea
                name=""
                id="description"
                cols={30}
                rows={10}
                className="form-control"
              ></textarea>
            </div>
            <button className="btn btn-primary">Update PRODUCT</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductEdit;
