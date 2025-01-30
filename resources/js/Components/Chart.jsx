import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

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
}

export default WeeklyBookingsChart;
