"use client"
import flogo from '@public/icons/footerlogo.svg';
import Link  from 'next/link';
import Image from 'next/image';
import SmallBtnYello from '../buttons/SmallBtnYellow';
import instagram from '@public/icons/Instagram.svg';
import facebook from '@public/icons/Facbook.svg';
import twitter from '@public/icons/Twitter.svg';



const Footer = () =>{
    return(
        <>
            <footer className="bg-ads360black-100 py-10 px-5 lg:p-24 text-white">
                <div className="md:flex">
                    <div className="basis-1/4 my-10">
                        <Image height={0} width={0} src={flogo} alt='footer logo'/>
                    </div>
                    <div className="basis-1/4 my-10 md:text-center">
                        <h4 className='text-ads360yellow-100 my-4'>QUICK LINKS</h4>
                        <h6><Link href='/about' className='transition duration-300 hover:text-ads360yellowBtn-100'>About Us</Link></h6>
                        <h6><Link href='/contact' className='transition duration-300 hover:text-ads360yellowBtn-100'>Contact</Link></h6>
                        <h6><Link href='/discovery' className='transition duration-300 hover:text-ads360yellowBtn-100'>Services</Link></h6>
                        <h6><Link href='/faqs' className='transition duration-300 hover:text-ads360yellowBtn-100'>FAQs</Link></h6>
                    </div>
                    <div className="basis-1/4 my-10 md:text-center">
                        <h4 className='text-ads360yellow-100 my-4'>OUR SERVICES</h4>
                        <h6><Link href='/discovery/#billboard' className='transition duration-300 hover:text-ads360yellowBtn-100'>Billboard Advertisements</Link></h6>
                        <h6><Link href='/discovery/#blog' className='transition duration-300 hover:text-ads360yellowBtn-100'>Blog Advertisements</Link></h6>
                        <h6><Link href='/discovery/#sms' className='transition duration-300 hover:text-ads360yellowBtn-100'>SMS Campaigns</Link></h6>
                        <h6><Link href='/discovery/#whatsapp' className='transition duration-300 hover:text-ads360yellowBtn-100'>WhatsApp Status Ads</Link></h6>
                        <h6><Link href='/discovery/#influencer' className='transition duration-300 hover:text-ads360yellowBtn-100'>Influencer Marketing</Link></h6>
                        <h6><Link href='/discovery/#twitter' className='transition duration-300 hover:text-ads360yellowBtn-100'>Twitter Spaces</Link></h6>
                    </div>
                    <div className="basis-1/4 my-10 md:text-right">
                        <h4 className='text-ads360yellow-100 my-4'>CONTACT INFO</h4>
                        <h6>King Court estate,</h6>
                        
                        <h6>Lagos, Nigeria</h6>
                        <h6>+234 7082436214</h6>
                     
                    </div>
                </div>

                {/* <form> */}
                    <div className='flex text-black px-1 rounded h-[38px] md:h-[45px] w-full md:w-[40%] items-center justify-center bg-ads360light-100 mb-5'>
                        <input type="text" className='w-full focus:outline-none bg-transparent h-[38px] md:h-[45px]' placeholder='Enter Email...' />
                        <div>
                            <SmallBtnYello text='Submit'/>
                        </div>
                    </div>
                {/* </form> */}
                <hr/>
                <div className='flex justify-between mt-5'>
                    <p>360 ads © 2023</p>
                    <div className='flex'>
                        <Link href='' className='mx-2 hidden md:inline'>Terms & Conditions</Link>
                        <div className='flex'>
                            <Link href='' className='mr-1 md:mx-2'><Image height={0} width={0} src={instagram} alt='instagram logo'/></Link>
                            <Link href='' className='mx-2'><Image height={0} width={0} src={facebook} alt='facebook logo'/></Link>
                            <Link href='' className='mx-2'><Image height={0} width={0} src={twitter} alt='twitter logo'/></Link>
                        </div>
                    </div>
                </div>
                <div className='text-center md:hidden my-2'>
                    <Link href=''>Terms & Conditions</Link>
                </div>
            </footer>
        </>
    )
}

export default Footer;