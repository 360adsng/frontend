"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import avatar from "@public/icons/user.png"
import dash from '@public/icons/dash.svg'


const EditBillboardComponent = () => {
  const [user, setUser] = useState({
    email: 'cayomike@gmail.com',
    phoneNumber: '08140231279',
    firstName: 'Charles',
    lastName: 'Ayomike',
    occupation: 'Web developer',
    residentialAddress: 'Lagos state, Nigeria',
    password: ''
  })

  const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }


  const [editProfile, setEditProfile] = useState(true)
  const [view, setView] = useState('Edit')



  return (
    <>
        <section className="bg-[#E9E9E9] px-4 md:px-10 pt-14">

            <h3 className='text-2xl'>Settings</h3>
            <p className='text-[#8B8B8B] mb-5 mt-3'>Edit or view profile settings</p>

            <div className="">
            <div className="w-full flex text-sm md:text-base md:justify-start space-x-3">
                <button className="relative" onClick={()=>setView('Edit')}>
                    Edit Profile
                    {view === 'Edit' && 
                    <Image
                        height={0}
                        width={0}
                        alt="Billboard Overview selected"
                        src={dash}
                        className="w-2/3 mx-auto absolute top-[20px] left-[17%]"
                    />
                    }
                </button> 


                <button className="relative" onClick={()=>setView('password')}>
                    Change Password
                    {view === 'password' && 
                    <Image
                        height={0}
                        width={0}
                        alt="Billboard Overview selected"
                        src={dash}
                        className="w-2/5 mx-auto absolute top-[20px] left-[17%]"
                    />
                    }
                </button> 

            </div>

            </div>

            </section>
    <section className='min-h-screen bg-ads360-hash px-4 md:px-10 py-14'>
        


                      



        {
            view === 'Edit' ? 
            
        <div className="border border-ads360yellow-100 bg-white rounded-10 my-5 p-2">
            <div className='mt-5 mb-7'>
            <h2 className='my-5 font-bold px-5'>User Details</h2>
            <form>
                <div className='text-center'>
                    <Image
                        height={0}
                        width={0}
                        alt=''
                        src={avatar}
                        className='w-20 h-20 mx-auto bg-[#f1f1f1] rounded-full'
                    />
                    <input type='file' className='border border-[#c5c4c5] text-[#8B8B8B] my-3 w-9/12 md:w-[35%]'/>
                </div>
            </form>
            </div>
        
            <form>
                <div className='md:flex justify-evenly'>
                    <div className='md:w-[40%] px-3'>
                        <div className='my-3'>
                            <label>Email:</label>
                            <br/>
                            <input
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                required
                                className='border border-[#c5c4c5] text-[#8B8B8B] focus:outline-none w-full  p-2 rounded-10'
                            />
                        </div>
                        
                        <div className='my-3'>
                            <label>Phone Number:</label>
                            <br/>
                            <input
                            type="tel"
                            name="phoneNumber"
                            value={user.phoneNumber}
                            onChange={handleChange}
                            required
                            className='border border-[#c5c4c5] text-[#8B8B8B] focus:outline-none w-full p-2 rounded-10'
                            />
                        </div>
                        
                        <div className='my-3'>
                            <label>First Name:</label>
                            <br/>
                            <input
                            type="text"
                            name="firstName"
                            value={user.firstName}
                            onChange={handleChange}
                            required
                            className='border border-[#c5c4c5] text-[#8B8B8B] focus:outline-none w-full p-2 rounded-10'
                            />
                        </div>
                        
                        <div className='my-3'>
                            <label>Last Name:</label>
                            <br/>
                            <input
                            type="text"
                            name="lastName"
                            value={user.lastName}
                            onChange={handleChange}
                            required
                            className='border border-[#c5c4c5] text-[#8B8B8B] focus:outline-none w-full p-2 rounded-10'
                            />
                        </div>
                    </div>



                    <div className='md:w-[40%] px-3'>

                        <div className='my-3'>
                            <label>Occupation:</label>
                            <br/>
                            <input
                                type="text"
                                name="occupation"
                                value={user.occupation}
                                onChange={handleChange}
                                required
                                className='border border-[#c5c4c5] text-[#8B8B8B] focus:outline-none w-full p-2 rounded-10'
                            />
                        </div>
                        

                        <div className='my-3'>
                            <label>Residential Address:</label>
                            <br/>
                            <textarea
                            name="residentialAddress"
                            value={user.residentialAddress}
                            onChange={handleChange}
                            required
                            className='border border-[#c5c4c5] text-[#8B8B8B] focus:outline-none w-full p-2 rounded-10'
                            />
                        </div>
                        

                        <div className='my-3'>
                            <label>Password:</label>
                            <br/>
                            <input
                                type="password"
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                                required
                                className='border border-[#c5c4c5] text-[#8B8B8B] focus:outline-none w-full p-2 rounded-10'
                            />
                        </div>

                    </div>
                </div>
                

                
                <div className='text-center my-7'>
                    <button type="submit" className="group rounded-10 hover:animate-changeColor hover:text-white border bg-ads360yellow-100 py-2 px-4">
                        Save
                    </button>
                </div>
            </form>
        </div>
        :

        <div className='border border-ads360yellow-100 bg-white rounded-10 my-5 p-2'>

            <div className='mx-auto w-full md:w-1/2'>
            <h2 className='my-5 font-bold'>Change Password</h2>
                <div className='my-3'>
                    <label>Old Password:</label>
                            <br/>
                            <input
                                type="password"
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                                required
                                className='border border-[#c5c4c5] text-[#8B8B8B] focus:outline-none w-full p-2 rounded-10'
                            />
                        </div>


                        <div className='my-3'>
                        <label>New Password:</label>
                            <br/>
                            <input
                                type="password"
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                                required
                                className='border border-[#c5c4c5] text-[#8B8B8B] focus:outline-none w-full p-2 rounded-10'
                            />
                        </div>


                        <div className='my-3'>
                        <label>Confirm Password:</label>
                            <br/>
                            <input
                                type="password"
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                                required
                                className='border border-[#c5c4c5] text-[#8B8B8B] focus:outline-none w-full p-2 rounded-10'
                            />
                        </div>

                
                        <div className='text-center my-7'>
                            <button type="submit" className="group rounded-10 hover:animate-changeColor hover:text-white border bg-ads360yellow-100 py-2 px-4">
                                Save
                            </button>
                        </div>
                
            </div>

        </div>

    }
    </section>
    </>

  );
};

export default EditBillboardComponent;
