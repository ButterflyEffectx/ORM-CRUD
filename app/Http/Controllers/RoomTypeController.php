<?php

namespace App\Http\Controllers;

use App\Models\RoomType;
use Illuminate\Http\Request;

class RoomTypeController extends Controller
{
    public function index()
    {
        // ดึงข้อมูล RoomType ทั้งหมด
        return response()->json(RoomType::all());
    }

    public function show($id)
    {
        // ดึงข้อมูล RoomType ตาม ID
        return response()->json(RoomType::findOrFail($id));
    }

    public function store(Request $request)
    {
        // สร้าง RoomType ใหม่
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
        ]);

        $roomType = RoomType::create($validatedData);

        return response()->json($roomType, 201);
    }

    public function update(Request $request, $id)
    {
        // อัปเดตข้อมูล RoomType
        $roomType = RoomType::findOrFail($id);

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
        ]);

        $roomType->update($validatedData);

        return response()->json($roomType);
    }

    public function destroy($id)
    {
        // ลบ RoomType
        RoomType::destroy($id);

        return response()->json(['message' => 'Room type deleted successfully']);
    }
}
