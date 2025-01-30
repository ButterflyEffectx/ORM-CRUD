import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';

function CreateBooking({ roomTypes, rooms }) {
    const [selectedRoomId, setSelectedRoomId] = useState(null);
    const [roomPrice, setRoomPrice] = useState(null);

    console.log({ roomTypes, rooms })

    const { data, setData, post, processing, errors } = useForm({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        room_id: '',
        check_in_date: '',
        check_out_date: '',
    });

    useEffect(() => {
        // เมื่อ selectedRoomId เปลี่ยน, ดึงข้อมูลราคาจาก backend
        if (selectedRoomId) {
            fetch(`/booking-create/${selectedRoomId}/price`)
                .then(response => response.json())
                .then(data => setRoomPrice(data.price))
                .catch(error => console.error('Error fetching price:', error));
        }
    }, [selectedRoomId]);

    // ตัวแปรสำหรับการคำนวณราคาห้องและรายละเอียดบิล
    const bookingCharge = 10;
    const tax = 15;
    const service = 5;
    const totalPrice = bookingCharge + tax + service + roomPrice;

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/hotel');
    };

    const handleRoomChange = (e) => {
        const selectedRoomId = e.target.value;
        setData('room_id', selectedRoomId); // setData เพื่ออัปเดตค่าห้องที่เลือก
        setSelectedRoomId(e.target.value)
    };

    return (
        <div className="flex gap-8">
            {/* ฟอร์มกรอกข้อมูลลูกค้า */}
            <form onSubmit={handleSubmit} className="max-w-lg bg-white p-8 rounded-lg shadow-lg flex-1">
                <div className="mb-4">
                    <label htmlFor="customer_name" className="block text-gray-700 font-semibold">Customer Name</label>
                    <input
                        type="text"
                        name="customer_name"
                        value={data.customer_name}
                        onChange={(e) => setData('customer_name', e.target.value)}
                        className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    {errors.customer_name && <div className="text-red-500 text-sm mt-2">{errors.customer_name}</div>}
                </div>

                <div className="mb-4">
                    <label htmlFor="customer_email" className="block text-gray-700 font-semibold">Email</label>
                    <input
                        type="email"
                        name="customer_email"
                        value={data.customer_email}
                        onChange={(e) => setData('customer_email', e.target.value)}
                        className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    {errors.customer_email && <div className="text-red-500 text-sm mt-2">{errors.customer_email}</div>}
                </div>

                <div className="mb-4">
                    <label htmlFor="customer_phone" className="block text-gray-700 font-semibold">Phone</label>
                    <input
                        type="text"
                        name="customer_phone"
                        value={data.customer_phone}
                        onChange={(e) => setData('customer_phone', e.target.value)}
                        className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    {errors.customer_phone && <div className="text-red-500 text-sm mt-2">{errors.customer_phone}</div>}
                </div>

                {/* ฟอร์มเลือกห้อง */}
                <div className="mb-4">
                    <label htmlFor="room_id" className="block text-gray-700 font-semibold">Room</label>
                    <select
                        name="room_id"
                        value={data.room_id}
                        onChange={handleRoomChange}
                        className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        <option value="">Select Room</option>
                        {rooms.map((room) => {
                            // ค้นหาประเภทห้องที่ตรงกับ room.id
                            const roomType = roomTypes.find((type) => type.id === room.room_type_id);

                            return (
                                <option key={room.id} value={room.id}>
                                    {room.room_number} - {roomType ? roomType.name : 'Unknown'}
                                </option>
                            );
                        })}
                    </select>
                    {errors.room_id && <div className="text-red-500 text-sm mt-2">{errors.room_id}</div>}
                </div>

                {/* ฟอร์มกรอกวันที่เข้าพักและวันที่ออก */}
                <div className="mb-4">
                    <label htmlFor="check_in_date" className="block text-gray-700 font-semibold">Check-in Date</label>
                    <input
                        type="date"
                        name="check_in_date"
                        value={data.check_in_date}
                        onChange={(e) => setData('check_in_date', e.target.value)}
                        className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    {errors.check_in_date && <div className="text-red-500 text-sm mt-2">{errors.check_in_date}</div>}
                </div>

                <div className="mb-6">
                    <label htmlFor="check_out_date" className="block text-gray-700 font-semibold">Check-out Date</label>
                    <input
                        type="date"
                        name="check_out_date"
                        value={data.check_out_date}
                        onChange={(e) => setData('check_out_date', e.target.value)}
                        className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    {errors.check_out_date && <div className="text-red-500 text-sm mt-2">{errors.check_out_date}</div>}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                    {processing ? 'Booking...' : 'Book Now'}
                </button>
            </form>

            {/* แถบสรุปบิล */}
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h2 className="text-xl font-semibold text-gray-700 mb-6">Bill Details</h2>
                <div className="mb-4 flex justify-between">
                    <span>Booking Charge</span>
                    <span>${bookingCharge}</span>
                </div>
                <div className="mb-4 flex justify-between">
                    <span>Tax</span>
                    <span>${tax}</span>
                </div>
                <div className="mb-4 flex justify-between">
                    <span>Service</span>
                    <span>${service}</span>
                </div>
                <div className="mb-4 flex justify-between">
                    <span>Room Price</span>
                    <span>${roomPrice}</span>
                </div>
                <div className="mb-6 flex justify-between font-semibold">
                    <span>Total Price</span>
                    <span>${totalPrice}</span>
                </div>
            </div>
        </div>
    );
}

export default CreateBooking;
