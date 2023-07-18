"use client"

import Link  from 'next/link';
import girl from '@public/images/adsgirlblank.png'
import BlackButtons from '@components/buttons/BlackButton';
import CloseAside from '@public/icons/closeAside.svg';
import { useRef, useState } from 'react';
import Image from 'next/image'

const SignUp = () =>{

    const [isIndividual, setIsIndividual] = useState(true)
    const slider = useRef<HTMLDivElement>(null);
    const sliderB = useRef<HTMLDivElement>(null);
    const sliderI = useRef<HTMLDivElement>(null);



    const handleSignUp = () =>{
        if(isIndividual){
            setIsIndividual(false);
            slider.current?.classList.add('SignupSliderB')
            slider.current?.classList.remove('SignupSliderI')
            slider.current?.classList.remove('left-0')
            sliderI.current?.classList.add('SignupI')
            sliderB.current?.classList.add('SignupB')
            
        }else{
            setIsIndividual(true)
            slider.current?.classList.add('SignupSliderI')
            slider.current?.classList.remove('SignupSliderB')
            sliderB.current?.classList.remove('SignupB')
            sliderI.current?.classList.remove('SignupI')
        }
    }

    return(
        <>
        <section className='bg-ads360light-100 h-screen'>
            <div className='hidden w-1/2 bg-ads360black-100 lg:flex justify-end pt-36 h-full fixed z-40'>
                <div className='w-4/5'>
                    <Image width={0} height={0} src={girl} alt="..."/>
                </div>
            </div>


            <div className='lg:flex'>
                <div className='hidden lg:flex lg:basis-1/2'></div>
                <div className='lg:basis-1/2'>
                    <div className='w-[90%] md:w-[80%] mx-auto'>
                    <div className="flex justify-end"><Link href="/"><Image width={0} height={0} src={CloseAside} alt="..."/></Link></div>

                        <div className='text-center'>
                            <h3 className='text-2xl lg:text-4xl mb-2'>Let’s Dive right in.</h3>
                            <h5 className='text-ads360yellow-100'>Please complete to create your account.</h5>
                        </div>

                        <div className='flex justify-around flex-row-reverse lg:flex-row hover:cursor-pointer relative h-10 rounded-3xl bg-ads360black-100 text-ads360light-100 my-5'>
                            <div onClick={handleSignUp} className='basis-1/2 text-center py-2'>
                                Individual Account
                            </div>

                            <div ref={slider} className='text-center absolute w-1/2 bg-ads360gray-100 left-0 rounded-3xl top-0 h-10 py-2 transition duration-700'>
                                
                                <span className='hidden lg:inline'>{isIndividual?'Individual Account':'Business Account'}</span>
                                <span className='lg:hidden'>{isIndividual?'Business Account':'Individual Account'}</span>
                            </div>

                            <div onClick={handleSignUp} className='basis-1/2 text-center py-2'>
                                Business Account
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            






            <div className='flex overflow-hidden lg:overflow-auto'>



                <div ref={sliderB} className='lg:basis-1/2 bg-ads360light-100 transition duration-700 shrink-0 w-full'>
                    <div className='w-[80%] mx-auto'>
                        <div className=''>
                            <form>
                                <div>
                             
                                    <div className='lg:basis-1/2 lg:pr-2'>
                                        <label htmlFor='firstname'>Business Name</label>
                                        <br/>
                                        <input type='text' id='firstname' className='bg-[#E4E4E4] focus:outline-none px-2 w-full rounded h-[38px] md:h-[45px]'/>
                                    </div>

            
                                    <div className='my-3'>
                                        <label htmlFor='email'>Business Email</label>
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
                                        <label htmlFor='email'>Contact Name</label>
                                        <br/>
                                        <input type='text' id='email' className='bg-[#E4E4E4] focus:outline-none px-2 w-full rounded h-[38px] md:h-[45px]'/>
                                    </div>

                                    <div className='my-3'>
                                        <label htmlFor='phoneNumber'>Phone Number</label>
                                        <br/>
                                        <input type='text' id='phoneNumber' className='bg-[#E4E4E4] focus:outline-none px-2 w-full rounded h-[38px] md:h-[45px]'/>
                                    </div>
                                    </div>
                                    <div className='text-center my-5'>
                                        <input type="checkbox" value="I agree with terms and conditions"/><span> I agree with <Link href="" className='text-ads360yellow-100'>terms and conditions</Link></span>
                                    </div>
                                    <div className='flex justify-center my-5'>
                                        <BlackButtons text='Sign Up'/>
                                    </div>                            
                                </form>
                                <p className='text-center my-5'>Already have an account? <Link href="/signin" className='text-ads360yellow-100'> Sign In</Link></p>
                            </div>
                    </div>
                </div>







                <div ref={sliderI} className='lg:basis-1/2 bg-ads360light-100 transition duration-700 shrink-0 w-full'>
                    <div className='w-[80%] mx-auto'>
                        <div className=''>
                            <form>
                                <div>
                                    <div className='lg:flex my-3'>
                                        <div className='basis-1/2 my-3 lg:my-0 md:pr-2'>
                                            <label htmlFor='firstname'>First Name</label>
                                            <br/>
                                            <input type='text' id='firstname' className='bg-[#E4E4E4] focus:outline-none px-2 w-full rounded h-[38px] md:h-[45px]'/>
                                        </div>

                                        <div className='basis-1/2 my-3 lg:my-0 lg:pl-2'>
                                            <label htmlFor='lastname'>Last Name</label>
                                            <br/>
                                            <input type='text' id='lastname' className='bg-[#E4E4E4] focus:outline-none px-2 w-full rounded h-[38px] md:h-[45px]'/>
                                        </div>
                                    </div>
                                    <div className='my-3'>
                                        <label htmlFor='email'>Email</label>
                                        <br/>
                                        <input type='text' id='email' className='bg-[#E4E4E4] focus:outline-none px-2 w-full rounded h-[38px] md:h-[45px]'/>
                                    </div>
                                </div>

                                <div>
                                    <div className='lg:flex my-3'>
                                        <div className='basis-1/2 my-3 lg:my-0 md:pr-2'>
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
                                        <label htmlFor='phoneNumber'>Phone Number</label>
                                        <br/>
                                        <input type='text' id='phoneNumber' className='bg-[#E4E4E4] focus:outline-none px-2 w-full rounded h-[38px] md:h-[45px]'/>
                                    </div>
                                    </div>
                                    <div className='text-center my-5'>
                                        <input type="checkbox" value="I agree with terms and conditions"/><span> I agree with <Link href="" className='text-ads360yellow-100'>terms and conditions</Link></span>
                                    </div>
                                    <div className='flex justify-center my-5'>
                                        <BlackButtons text='Sign Up'/>
                                    </div>                            
                                </form>
                                <p className='text-center my-5'>Already have an account? <Link href="/signin" className='text-ads360yellow-100'> Sign In</Link></p>
                            </div>
                    </div>
                </div>




            </div>
        </section>
        </>
    )
}

export default SignUp;