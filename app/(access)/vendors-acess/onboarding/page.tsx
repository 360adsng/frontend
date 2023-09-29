import BlackButtons from '@components/buttons/BlackButton'
import BlackLogo from '@components/logo/BlackLogo'
import Link from 'next/link'
import React from 'react'

const VendorsOnboarding = () => {
  return (
    <section className='min-h-screen bg-ads360-hash'>
        <div className='p-10'>
        <BlackLogo/>

        </div>
      <div className='mx-auto w-11/12 md:w-6/12 py-12'>
        <h2 className='text-center text-4xl'>Apply as a vendor</h2>
        <p className='text-center text-ads360yellow-100 font-light my-3'>Please complete to create your account.</p>
        <div className=''>
                            <form>
                                <div>
                             
                                    <div className='lg:basis-1/2 lg:pr-2'>
                                        <label htmlFor='firstname'>Name</label>
                                        <br/>
                                        <input type='text' id='firstname' className='bg-[#E4E4E4] focus:outline-none px-2 w-full rounded h-[38px] md:h-[45px]'/>
                                    </div>

            
                                    <div className='my-3'>
                                        <label htmlFor='email'>Email</label>
                                        <br/>
                                        <input type='text' id='email' className='bg-[#E4E4E4] focus:outline-none px-2 w-full rounded h-[38px] md:h-[45px]'/>
                                    </div>
                                </div>

                                <div>
                                    <div className='lg:flex my-3'>
                                        <div className='basis-1/2 my-3 lg:my-0 lg:pr-2'>
                                            <label htmlFor='password'>Password</label>
                                            <br/>
                                            <input type='password' id='password' className='bg-[#E4E4E4] focus:outline-none px-2 w-full rounded h-[38px] md:h-[45px]'/>
                                        </div>

                                        <div className='basis-1/2 my-3 lg:my-0 lg:pl-2'>
                                            <label htmlFor='confirmPassword'>Confirm Password</label>
                                            <br/>
                                            <input type='password' id='confirmPassword' className='bg-[#E4E4E4] focus:outline-none px-2 w-full rounded h-[38px] md:h-[45px]'/>
                                        </div>
                                    </div>
                                    <div className='my-3'>
                                        <label htmlFor='email'>Phone Number</label>
                                        <br/>
                                        <input type='text'  className='bg-[#E4E4E4] focus:outline-none px-2 w-full rounded h-[38px] md:h-[45px]'/>
                                    </div>

                                    <div className='my-3'>
                                        <label htmlFor='phoneNumber'>Vendor type</label>
                                        <br/>
                                        <select className='bg-[#E4E4E4] focus:outline-none px-2 w-full rounded h-[38px] md:h-[45px]'>
                                            <option>select</option>
                                            <option>Billboard</option>
                                            <option>Influencer</option>
                                        </select>
                                    </div>
                                    </div>
                                    <div className='text-center my-5'>
                                        <input type="checkbox" value="I agree with terms and conditions"/><span> I agree with <Link href="" className='text-ads360yellow-100'>terms and conditions</Link></span>
                                    </div>
                                    <div className='flex justify-center my-5'>
                                        <BlackButtons text='Register'/>
                                    </div>                            
                                </form>
                                <p className='text-center my-5'>Already have an account? <Link href="/vendors/login" className='text-ads360yellow-100'> Sign In</Link></p>
                            </div>
     
      </div>
    </section>
  )
}

export default VendorsOnboarding