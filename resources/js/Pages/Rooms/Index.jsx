import React from 'react';
import Nav from '@/Components/Nav';
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import moment from "moment";
import { Inertia } from "@inertiajs/inertia";

const DashboardCard = ({ title, value, percentage, description, color }) => {
    return (
        <div className="p-4 border rounded-xl shadow-md bg-white">
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-2xl font-bold">{value}</p>
            <div className="flex items-center gap-2 mt-2">
                <span
                    className={`px-2 py-1 text-sm font-medium rounded-full text-white ${color}`}
                >
                    {percentage}
                </span>
                <span className="text-gray-500">{description}</span>
            </div>
        </div>
    );
};

function WeeklyBookingsChart({ booking }) {
    // เตรียมข้อมูลกราฟ (แบ่งเป็นรายสัปดาห์)
    const weeklyData = Array(7).fill(0); // Array เก็บจำนวนการจอง 7 วัน (วันอาทิตย์ถึงเสาร์)
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    booking.forEach((item) => {
        const checkInDay = new Date(item.check_in_date).getDay(); // หาวันที่เช็คอิน (0-6)
        weeklyData[checkInDay] += 1; // เพิ่มจำนวนในวันที่ตรงกัน
    });

    // กำหนดข้อมูลของ Chart.js
    const data = {
        labels: daysOfWeek,
        datasets: [
            {
                label: "Bookings per Day",
                data: weeklyData,
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                    "#FF9F40",
                    "#FF5733",
                ],
                borderWidth: 2,
                borderRadius: 8,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: "top",
            },
        },
        scales: {
            x: {
                ticks: { color: "#555" },
            },
            y: {
                beginAtZero: true,
                ticks: { color: "#555" },
            },
        },
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg font-bold mb-4 text-gray-700">Weekly Bookings Overview</h2>
            <div className="h-96">
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};

function Index({ booking, countbook, totalAmount, customerCount, bookings, currentPage, lastPage }) {
    const handlePageChange = (url) => {
        if (url) {
            Inertia.get(url); // ใช้ Inertia โหลดเฉพาะข้อมูลใหม่
        }
    };
    const data = [
        {
            title: 'Monthly Booking',
            value: countbook,
            percentage: '+11%',
            description: 'From previous period',
            color: 'bg-purple-600',
        },
        {
            title: 'Monthly Amount',
            value: `$${totalAmount.total_amount}`,
            percentage: '+05%',
            description: 'New income',
            color: 'bg-cyan-500',
        },
        {
            title: 'Monthly Customer',
            value: customerCount,
            percentage: '+11%',
            description: 'From previous period',
            color: 'bg-yellow-500',
        },
        {
            title: 'Monthly Revenue',
            value: '$45,300',
            percentage: '+21%',
            description: 'From previous period',
            color: 'bg-green-500',
        },
    ];



    console.log({ booking, countbook, totalAmount, customerCount, bookings, currentPage, lastPage });


    return (
        <>
            <div className="h-full bg-gray-100">
                <Nav />
                <div className="py-12 p-6">
                    <div className="container mx-auto px-16">
                        <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {data.map((item, index) => (
                                <DashboardCard key={index} {...item} />
                            ))}
                        </div>

                        <div className="mt-10">
                            <WeeklyBookingsChart booking={booking} />
                        </div>

                        <h1 className="mt-10 text-2xl font-bold mb-4">Booking List</h1>
                        <table className="min-w-full bg-white rounded-lg shadow-md">
                            <thead>
                                <tr className="bg-gray-200 text-left">
                                    <th className="px-6 py-3">Room Number</th>
                                    <th className="px-6 py-3">Room Type</th>
                                    <th className="px-6 py-3">Customer Name</th>
                                    <th className="px-6 py-3">Customer Phone</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.data.map((booking) => {
                                    const month = moment(booking.check_in_date).month() + 1; // ดึงเดือน (0-based index)
                                    const status = month === 1 ? "Pending" : month === 2 ? "Success" : "Other";

                                    return (
                                        <tr key={booking.booking_id} className="border-b hover:bg-gray-100 transition">
                                            <td className="px-6 py-4">Room No.{booking.room_number}</td>
                                            <td className="px-6 py-4">{booking.room_type}</td>
                                            <td className="px-6 py-4">{booking.customer_name}</td>
                                            <td className="px-6 py-4">{booking.customer_phone}</td>
                                            <td className={`px-6 py-4 font-semibold ${status === "Pending" ? "text-yellow-500" : "text-green-500"}`}>
                                                {status}
                                            </td>
                                            <td className="px-6 py-4 space-x-1">
                                                <button className='bg-gradient-to-r from-orange-300 to-orange-400 px-4 py-2 rounded-xl shadow-lg hover:bg-gradient-to-l hover:from-blue-300 hover:to-blue-400'
                                                    onClick={() => Inertia.get(`/edit-booking/${booking.booking_id}`)}>
                                                    Edit
                                                </button>
                                                <button className='bg-gradient-to-r from-red-300 to-red-400 p-2 rounded-xl shadow-lg hover:bg-gradient-to-l hover:from-blue-300 hover:to-blue-400'
                                                    onClick={() => Inertia.delete(`/hotel/${booking.booking_id}`)}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        <div className="mt-6 flex justify-end items-center">
                            <p className="text-sm text-gray-600">
                                Page: {currentPage} of {lastPage}
                            </p>
                            <div className="flex space-x-2">
                                {currentPage > 1 && (
                                    <a href={`?page=${currentPage - 1}`} className="px-4 py-2 ml-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
                                        Previous
                                    </a>
                                )}
                                {currentPage < lastPage && (
                                    <a href={`?page=${currentPage + 1}`} className="px-4 py-2 ml-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
                                        Next
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Index;
