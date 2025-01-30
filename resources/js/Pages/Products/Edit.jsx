import React from 'react';
import { useForm } from '@inertiajs/react';

function Edit({ product, productTypes }) {
    const { data, setData, put, errors } = useForm({
        name: product.name,
        photo_path: product.photo_path,
        product_type: product.product_type,
        confirmed: product.confirmed,
        amount: product.amount,
        votes: product.votes,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/products/${product.product_code}`);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Edit Product
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Product Name
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Amount
                        </label>
                        <input
                            type="number"
                            value={data.amount}
                            onChange={(e) => setData('amount', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.amount && (
                            <p className="text-sm text-red-500 mt-1">{errors.amount}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Product Type
                        </label>
                        <select
                            value={data.product_type}
                            onChange={(e) => setData('product_type', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {/* วนลูป productTypes เพื่อแสดงชื่อ */}
                            {productTypes.map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                        {errors.product_type && (
                            <p className="text-sm text-red-500 mt-1">{errors.product_type}</p>
                        )}
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={data.confirmed}
                            onChange={(e) => setData('confirmed', e.target.checked)}
                            className="w-5 h-5 border-gray-300 focus:ring-2 focus:ring-blue-500"
                        />
                        <label className="ml-2 text-gray-700 font-medium">
                            Confirmed
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Edit;
