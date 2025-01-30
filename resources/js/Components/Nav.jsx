import React from 'react'

function Nav() {
  return (
    <>
        <div className="py-7 bg-white">
            <div className="px-12 mx-auto">
                <div className="flex justify-between items-center">
                    <div className="text-3xl font-bold">
                        <h1 className='text-4xl'><span className='text-red-400'>Egoist</span> Hotel</h1>
                    </div>
                    <div className="space-x-6 text-xl">
                        <input type="text"
                        placeholder='Search...'
                        className=' border-none bg-slate-100 rounded-lg text-xl'/>
                        <button className='text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Search</button>
                    </div>
                    <ul className='flex items-center space-x-6 text-xl font-bold '>
                        <li className='cursor-pointer bg-gradient-to-r from-cyan-300 to-cyan-400 p-4 rounded-3xl shadow-md'>Dashboard</li>
                        <li className='cursor-pointer'>Roombook</li>
                        <img src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                         alt=""
                         className="w-14 h-14 object-cover object-center rounded-lg"
                        />
                    </ul>
                </div>
            </div>
        </div>
    </>
  )
}

export default Nav
