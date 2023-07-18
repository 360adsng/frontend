import Link from 'next/link';
import girl from '@public/images/adsgirlblank.png'
import BlackButtons from '@components/buttons/BlackButton';
import CloseAside from '@public/icons/closeAside.svg';
import Image from 'next/image';

const SignIn = () =>{
    return(
        <>
        <section className='bg-ads360light-100 h-screen'>
            <div className='hidden md:w-1/2 bg-ads360black-100 md:flex justify-end pt-36 h-full fixed'>
                <div className='w-4/5'>
                    <Image width={0} height={0} src={girl} alt="..."/>
                </div>
            </div>

            <div className='flex justify-end'>
                <div className='w-full md:w-1/2 bg-ads360light-100'>
                    <div className="flex justify-end"><Link href="/"><Image width={0} height={0} src={CloseAside} alt="..."/></Link></div>
                    <div className='w-[80%] mx-auto'>
                        <div className='text-center mb-10'>
                            <h3 className='text-2xl lg:text-4xl mb-2'>Welcome Back</h3>
                            <h5 className='text-ads360yellow-100'>Lets get right to it! Log into your account</h5>
                        </div>
                        <div>
                        <div className=''>
                            <form>
                                    <div className='my-3'>
                                        <label htmlFor='email'>Email</label>
                                        <br/>
                                        <input type='text' id='email' className='bg-[#E4E4E4] focus:outline-none px-2 w-full rounded h-[38px] md:h-[45px]'/>
                                    </div>
                
                    
                                    <div className='my-3'>
                                        <label htmlFor='password'>Password</label>
                                        <br/>
                                        <input type='text' id='password' className='bg-[#E4E4E4] focus:outline-none px-2 w-full rounded h-[38px] md:h-[45px]'/>
                                    </div>
                        
                                    <div className='flex justify-between my-3'>
                                        <div>
                                            <input type="checkbox" value="Remember me"/><span> Remember me </span>
                                        </div>
                                        <div>
                                            <Link href="" className='text-ads360yellow-100'>Forget Password</Link>
                                        </div>
                                    </div>
                                    <div className='flex justify-center my-3'>
                                        <BlackButtons text='Sign In'/>
                                    </div>                            
                                </form>
                                <p className='text-center mt-3 mb-20'>Dont have an account yet? <Link href="/signup" className='text-ads360yellow-100'> Sign Up</Link></p>
                                <p className='text-center mt-3 mb-5'><Link href="">Term of use. Privacy policy</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default SignIn;