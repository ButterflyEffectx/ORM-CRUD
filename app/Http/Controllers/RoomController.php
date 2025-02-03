<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\Booking;
use App\Models\RoomType;
use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class RoomController extends Controller
{
    public function index(Request $request)
    {
        $query = $request->input('search');
        $booking = DB::table('bookings')->get();
        $bookings = Booking::select(
            'bookings.id as booking_id',
            'rooms.room_number',
            'room_types.name as room_type',
            'customers.name as customer_name',
            'customers.phone as customer_phone',
            'bookings.check_in_date'
        )
            ->join('rooms', 'bookings.room_id', '=', 'rooms.id')
            ->join('room_types', 'rooms.room_type_id', '=', 'room_types.id')
            ->join('customers', 'bookings.customer_id', '=', 'customers.id')
            ->where(function ($q) use ($query) {
                $q->where('customers.name', 'like', '%' . $query . '%')
                    ->orWhere('rooms.room_number', 'like', '%' . $query . '%');
            })
            ->orderBy('bookings.id', 'desc')
            ->paginate(10); // ใช้ paginate(10) เพื่อจำกัดแค่ 10 รายการต่อหน้า

        $bookings->getCollection()->map(function ($booking) {
            $checkInMonth = Carbon::parse($booking->check_in_date)->month;
            $booking->status = $checkInMonth === 1 ? 'Pending' : ($checkInMonth === 2 ? 'Success' : 'Other');
            return $booking;
        }); // ใช้ paginate(10) เพื่อจำกัดแค่ 10 รายการต่อหน้า



        $monthlybooking = DB::table('bookings')
            ->select('id')
            ->whereRaw('MONTH(check_in_date) = ?', [2])
            ->get()
            ->count();
        $totalAmount = DB::table('bookings')
            ->join('rooms', 'bookings.room_id', '=', 'rooms.id') // Join bookings กับ rooms
            ->join('room_types', 'rooms.room_type_id', '=', 'room_types.id') // Join rooms กับ room_types
            ->whereMonth('bookings.check_in_date', '=', 2) // เงื่อนไขเดือนที่ 2
            ->whereMonth('bookings.check_out_date', '=', 2)
            ->select(DB::raw('FORMAT(ROUND(SUM(room_types.price_per_night * DATEDIFF(bookings.check_out_date, bookings.check_in_date))), 0) as total_amount'))
            ->first();
        $month = DB::table('bookings')
            ->selectRaw('DISTINCT(MONTH(check_in_date)) as month')
            ->orderBy('month')
            ->pluck('month')
            ->toJson();
        $CustomerCount = DB::table('customers')
            ->select('id')
            ->get()
            ->count();
        return Inertia::render('Rooms/Index', [
            'query' => $query,
            'booking' => $booking,
            'countbook' => $monthlybooking,
            'totalAmount' => $totalAmount,
            'month' => $month,
            'customerCount' => $CustomerCount,
            'bookings' => $bookings,
            'lastPage' => $bookings->lastPage(),
            'currentPage' => $bookings->currentPage(),
            'flash' => [
                'success' => session('success'),
                'error' => session('error')
            ],
        ]);
    }

    public function show($id)
    {
        return response()->json(Room::with('roomType')->findOrFail($id));
    }

    public function create()
    {
        // ดึงข้อมูลลูกค้า, ประเภทห้อง และห้องที่ว่างจากฐานข้อมูล
        $customers = Customer::all();
        $roomTypes = RoomType::all();
        $rooms = Room::where('is_available', 1)->get();


        return Inertia::render('Rooms/Booking', [
            'customers' => $customers,
            'roomTypes' => $roomTypes,
            'rooms' => $rooms
        ]);
    }

    public function store(Request $request)
    {

        $request->validate([
            'customer_name' => 'required|string',
            'customer_email' => 'required|email|unique:customers,email',
            'customer_phone' => 'required|string',
            'room_id' => 'required|exists:rooms,id|unique:bookings,room_id',
            'check_in_date' => 'required|date',
            'check_out_date' => 'required|date|after:check_in_date',
        ]);

        // สร้างลูกค้าใหม่ถ้ายังไม่มีในระบบ
        $customer = Customer::create([
            'name' => $request->customer_name,
            'email' => $request->customer_email,
            'phone' => $request->customer_phone,
        ]);

        // ทำการเพิ่มข้อมูลการจอง
        $booking = Booking::create([
            'customer_id' => $customer->id,
            'room_id' => $request->room_id,
            'check_in_date' => $request->check_in_date,
            'check_out_date' => $request->check_out_date,
        ]);

        // อัพเดตสถานะห้องให้เป็น "ไม่ว่าง"
        Room::find($request->room_id)->update(['is_available' => 0]);

        return redirect()->route('hotel.index'); // ไปยังหน้ารายการการจอง
    }

    public function update(Request $request, $id)
    {
        // Log ค่าที่ส่งเข้ามา
        Log::info('Incoming request data:', $request->all());

        // ตรวจสอบค่าทีละตัว
        Log::info('Room Number:', [$request->room_number]);
        Log::info('Check-in Date:', [$request->check_in_date]);
        Log::info('Check-out Date:', [$request->check_out_date]);

        // Validate incoming data
        $request->validate([
            'room_number' => 'required|string|exists:rooms,room_number',
            'check_in_date' => 'required|date',
            'check_out_date' => 'required|date|after:check_in_date', // ตรวจสอบว่า check_out_date ต้องมากกว่าหรือเท่ากับ check_in_date
        ]);

        // หาข้อมูลการจองที่ต้องการอัปเดต
        $booking = Booking::findOrFail($id);

        // ค้นหาห้องที่ตรงกับ room_number
        $room = Room::where('room_number', $request->room_number)->pluck('id')->first();

        if ($room) {
            // อัปเดตข้อมูลห้อง
            $booking->room_id = $room;
        }

        // อัปเดตวันที่ check-in และ check-out
        $booking->check_in_date = Carbon::parse($request->check_in_date)->format('Y-m-d H:i:s');
        $booking->check_out_date = Carbon::parse($request->check_out_date)->format('Y-m-d H:i:s');

        // บันทึกข้อมูลการจองที่อัปเดต
        $booking->save();

        // ส่งผลลัพธ์กลับไป
        return redirect()->route('hotel.index')->with('success', 'Room updated successfully.');
    }

    public function destroy($id)
    {

        $booking = Booking::find($id);
        if ($booking) {
            Room::where('id', $booking->room_id)->update(['is_available' => 1]);


            $booking->delete();
            return redirect()->route('hotel.index')->with('success', 'Booking delete successfully.');
        }
        return redirect()->route('hotel.index')->with('error', 'Booking not found.');
    }
    public function edit(Request $request, $id)
    {
        $roomNumber = DB::table(DB::raw('(
            -- ดึงห้องจาก booking ปัจจุบัน
            SELECT rooms.id,
                   rooms.room_number,
                   1 as sort_order
            FROM rooms
            JOIN bookings ON rooms.id = bookings.room_id
            WHERE bookings.id = ?

            UNION ALL

            -- ดึงห้องที่ว่างทั้งหมด
            SELECT rooms.id,
                   rooms.room_number,
                   2 as sort_order
            FROM rooms
            WHERE rooms.is_available = 1
            AND rooms.id NOT IN (
                SELECT room_id
                FROM bookings
                WHERE id = ?
            )
        ) as combined'))
            ->orderBy('sort_order')
            ->orderBy('room_number')
            ->setBindings([$id, $id])
            ->get();
        $roomTypes = DB::table(table: 'room_types')->get();
        $booking = Booking::findOrFail($id); // ค้นหา booking โดยใช้ id
        $bookings = Booking::select(
            'bookings.id as booking_id',
            'customers.name as customer_name',
            'customers.phone as customer_phone',
            'rooms.room_number',
            'room_types.name as room_type',
            'bookings.check_in_date',
            'bookings.check_out_date'
        )
            ->join('rooms', 'bookings.room_id', '=', 'rooms.id')
            ->join('room_types', 'rooms.room_type_id', '=', 'room_types.id')
            ->join('customers', 'bookings.customer_id', '=', 'customers.id')
            ->where('bookings.id', $id)
            ->firstOrFail();
        return Inertia::render('Rooms/EditBooking', [
            'booking' => $booking,
            'bookings' => $bookings,
            'roomTypes' => $roomTypes,
            'roomNumber' => $roomNumber,
        ]);
    }

    public function getRoomPrice($room_id)
    {
        // ดึงราคาห้องจาก room_types ตาม room_type_id
        $room = Room::find($room_id);
        $price = RoomType::find($room->room_type_id)->price_per_night;

        return response()->json(['price' => $price]);
    }


}
