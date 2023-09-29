import BlackButtons from '@components/buttons/BlackButton'
import BlackLogo from '@components/logo/BlackLogo'
import Link from 'next/link'
import React from 'react'

const VendorsLogin = () => {
  return (
    <section className='min-h-screen bg-ads360-hash'>
        <div className='p-10'>
        <BlackLogo/>

        </div>
      <div className='mx-auto w-11/12 md:w-6/12 lg:w-5/12 py-12'>
        <h2 className='text-center text-4xl'>Welcome back</h2>
        <p className='text-center text-ads360yellow-100 font-light my-3'>Lets get right to it! Log into your account.</p>
        <div className=''>
                            <form>
                                <div>
                             
            
                                    <div className='my-3'>
                                        <label htmlFor='email'>Email</label>
                                        <br/>
                                        <input type='text' id='email' className='bg-[#E4E4E4] focus:outline-none px-2 w-full rounded h-[38px] md:h-[45px]'/>
                                    </div>
                                </div>

                                <div>
                                  

                                    <div className='my-3'>
                                        <label htmlFor='email'>Phone Number</label>
                                        <br/>
                                        <input type='text'  className='bg-[#E4E4E4] focus:outline-none px-2 w-full rounded h-[38px] md:h-[45px]'/>
                                    </div>

                                 
                                    </div>
                                    <div className='flex justify-between my-5'>
                                        <div>
                                            <input type="checkbox" value="Remember me"/><span> Remember me </span>
                                        </div>
                                        <div>
                                            <Link href="" className='text-ads360yellow-100'>Forget Password</Link>
                                        </div>
                                    </div>
                                    <div className='flex justify-center my-5'>
                                        <BlackButtons text='Login'/>
                                    </div>                            
                                </form>
                                <p className='text-center my-5'>Dont have an account yet? <Link href="/vendors/login" className='text-ads360yellow-100'> Sign Up</Link></p>
                            </div>
     
      </div>
    </section>
  )
}

export default VendorsLogin