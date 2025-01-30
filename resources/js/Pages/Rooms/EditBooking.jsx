import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import axios from 'axios';

const EditBooking = ({ booking, bookings, roomTypes, roomNumber }) => {

    const { data, setData, patch, errors } = useForm({
        room_number: bookings?.room_number || '',
        check_in_date: bookings?.check_in_date ? new Date(bookings.check_in_date) : null,
        check_out_date: bookings?.check_out_date ? new Date(bookings.check_out_date) : null,
    });






    const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        const day = d.getDate().toString().padStart(2, '0');
        const month = (d.getMonth() + 1).toString().padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const formatDateForMySQL = (date) => {
        if (!date) return null;
        const d = new Date(date);
        const year = d.getFullYear();
        const month = (d.getMonth() + 1).toString().padStart(2, '0');
        const day = d.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleSubmit = (e) => {
        e.preventDefault();


        patch(route('booking.update', bookings.booking_id), {
            room_number: data.room_number,
            check_in_date: formatDateForMySQL(data.check_in_date),
            check_out_date: formatDateForMySQL(data.check_out_date),
        });
    };

    console.log({ booking, bookings, roomTypes, roomNumber })

    return (
        <div className="container mx-auto p-6 max-w-2xl">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Edit Booking</CardTitle>
                    <CardDescription>Please fill in the information you wish to edit completely.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="room_number">Room Number - <span className='text-right text-gray-500'>Current : *{bookings.room_number}*</span></Label>
                                <select
                                    id="room_number"
                                    name="room_number"
                                    value={data.room_number}  // ✅ กำหนดค่าที่เลือกที่นี่
                                    onChange={(e) => setData('room_number', e.target.value)}  // ✅ ควบคุมค่า
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                >
                                    <option value="">Select Room</option>
                                    {roomNumber.map((room) => (
                                        <option key={room.id} value={room.room_number}>
                                            {room.room_number}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="room_type">Room Type - <span className='text-right text-gray-500'>Current : *{bookings.room_type}*</span></Label>
                                <select
                                    id="room_type"
                                    name="room_type"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                >
                                    {roomTypes.map((roomType) => (
                                        <option key={roomType.id} value={roomType.id}>
                                            {roomType.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="customer_name">Customer Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder={bookings.customer_name}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="customer_phone">Customer Phone</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    placeholder={bookings.customer_phone}
                                />
                            </div>

                            <div className="space-y-2 text-left flex flex-col">
                                <Label>Checked-in date</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start text-left font-normal"
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {data.check_in_date ? (
                                                formatDate(data.check_in_date)
                                            ) : (
                                                <span>Select Checkin</span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={data.check_in_date}
                                            onSelect={(date) => setData(prev => ({
                                                ...prev,
                                                check_in_date: date
                                            }))}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>

                            <div className="space-y-2 text-left flex flex-col">
                                <Label>Checked-out date</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start text-left font-normal"
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {data.check_out_date ? (
                                                formatDate(data.check_out_date)
                                            ) : (
                                                <span>Select Checkout</span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={data.check_out_date}
                                            onSelect={(date) => setData(prev => ({
                                                ...prev,
                                                check_out_date: date
                                            }))}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4">
                            <Button variant="outline" type="button">
                                Cancel
                            </Button>
                            <Button type="submit">
                                Submit
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default EditBooking;
