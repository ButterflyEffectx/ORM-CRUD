import React from 'react';
import { Link } from '@inertiajs/react';

function Index({ data }) {


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Product Code</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Amount</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="text-center">
              <td className="border border-gray-300 p-2">{item.product_code}</td>
              <td className="border border-gray-300 p-2">{item.name}</td>
              <td className="border border-gray-300 p-2">{item.amount}</td>
              <td className="border border-gray-300 p-2">
                <Link
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-700"
                  href = {`/products/${item.product_code}/edit`}
                >
                  Edit
                </Link>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Index;
