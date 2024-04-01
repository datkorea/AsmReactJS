import { useQuery } from '@tanstack/react-query'
import React from 'react'
import axios from "axios";
import { IProduct } from '../interface/product';

const ProductList = () => {
  const { data } = useQuery({
    queryKey: ["PRODUCT_KEY"],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:3000/products`);
      return data;
    }
  });

  return (
    <div className="container">
      <div className="w-50 mt-4">
        <h2>Quan li san pham</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>IMG</th>
              <th>Name</th>
              <th>Price</th>
              <th>Desc</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {data?.map((product: IProduct,index: number) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td><img src={ product.image} width={50} alt="" /></td>
                <td>{ product.name}</td>
                <td>{ product.price }</td>
                <td>{ product.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductList