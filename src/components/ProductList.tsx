import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import axios from "axios";
import { IProduct } from '../interface/product';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["PRODUCT_KEY"],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:3000/products`);
      return data;
    }
  });

  const { mutate } = useMutation({
    mutationFn: async (id: number | string) => {
      window.confirm('Are you sure you want to delete this product') && await axios.delete(`http://localhost:3000/products/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['PRODUCT_KEY'],
      })
    }
  })

  return (
    <div className="container">
      <div className="w-50 mt-4">
        <h2>Quan li san pham</h2>
        <Link to="/admin/products/add" className="btn btn-primary">
          ADD Product
        </Link>
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
            {data?.map((product: IProduct, index: number) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <img src={product.image} width={50} alt="" />
                </td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.description}</td>
                <td>
                  <Link
                    to={`/admin/products/${product.id}/edit`}
                    className="btn btn-primary"
                  >
                    update
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => mutate(product.id!)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductList