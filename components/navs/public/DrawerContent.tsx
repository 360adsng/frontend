"use client"

import { Link } from "@tanstack/react-router";
import SmallBtnYello from '../../buttons/SmallBtnYellow';
import { FiArrowRight } from "react-icons/fi"

const instagram = '/icons/Instagram.svg'
const whatsapp = '/icons/whiteWhatsapp.svg'
const twitter = '/icons/Twitter.svg'
// import facebook from '@public/icons/Facbook.svg'



interface Props {
    toggleDrawer: ()=>void
}

const DrawerContent: React.FC<Props> = ({toggleDrawer}) => {



    return(
        <>
        
                <section>
                <div className='text-ads360light-100'>
                    <h3 className='text-2xl my-2'><Link to="/about" onClick={toggleDrawer}>About Us</Link></h3>
                    <h3 className='text-2xl my-2'><Link to="/discovery" onClick={toggleDrawer}>Our Services</Link></h3>
                    <h3 className='text-2xl my-2'><Link to="/faqs" onClick={toggleDrawer}>FAQs</Link></h3>
                    <h3 className='text-2xl my-2'><Link to="/contact" onClick={toggleDrawer}>Contact Us</Link></h3>
                </div>
                <hr className='my-5'/>
                <div className='flex flex-col text-ads360light-100 mb-5'>
                    <h5 className='text-ads360yellow-100 my-3'>OUR SERVICES</h5>
                    <Link to='/discovery/#billboard' className='my-2' onClick={toggleDrawer}>Billboard Advertisement</Link>
                    <Link to='/discovery/#blog' className='my-2' onClick={toggleDrawer}>Blog Advertisements</Link>
                    <Link to='/discovery/#sms' className='my-2' onClick={toggleDrawer}>SMS Campaigns</Link>
                    <Link to='discovery/#whatsapp' className='my-2' onClick={toggleDrawer}>WhatsApp Status Ads</Link>
                    <Link to='/discovery/#influencer' className='my-2' onClick={toggleDrawer}>Influencer Marketing</Link>
                    <Link to='/discovery/#twitter' className='my-2' onClick={toggleDrawer}>Twitter Spaces</Link>
                </div>

                <Link to="/signup" onClick={toggleDrawer}>
                    <span className='group flex w-[168px] text-ads360black-100'>
                        <button className='group-hover:translate-x-32 group-hover:bg-ads360light-100 w-12 transition bg-ads360yellowBtn-100 mx-1  h-12 flex justify-center items-center rounded-[50%] color-white'><FiArrowRight size={28}/></button>
                        <button className='group-hover:-translate-x-10 w-32 group-hover:bg-ads360light-100  transition rounded-10 bg-ads360yellowBtn-100 h-12'>Get Started</button>
                    </span>
                </Link>

                <hr className='my-5'/>
                <div className='text-ads360light-100'>
                <h5 className='text-ads360yellow-100 my-3'>CONTACT INFO</h5>
                   <h6>King Court estate,</h6>
                    <h6>Lagos, Nigeria.</h6>
                    <h6>+2347082436214</h6>
                    <h6>hello@360ads.com.ng</h6>
                </div>

                {/* <form> */}
                <div className='flex px-1 rounded h-[50px] w-full md:w-[40%] items-center justify-center bg-ads360light-100 mt-10 mb-5'>
                        <input type="text" className='w-full focus:outline-none bg-transparent h-[50px]' placeholder='Enter Email...' />
                        <div>
                            <SmallBtnYello text='Submit'/>
                        </div>
                    </div>
                {/* </form> */}
                <hr/>
                <div className='flex justify-between my-5'>
                    <p className='text-ads360light-100'>360 ads © 2023</p>
                    <div className='flex'>
                        <Link to='' className='mx-2 hidden'>Terms & Conditions</Link>
                        <div className='flex'>
                            <Link to='https://www.instagram.com/360ads.ng/' className='mx-2'><img src={instagram} alt='instagram logo'/></Link>
                            <Link to='https://wa.me/+2347082436214?text=urlencodedtext' className='mx-2'><img src={whatsapp} alt='facebook logo'/></Link>
                            <Link to='https://twitter.com/360adsNg' className='mx-2'><img src={twitter} alt='twitter logo'/></Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default DrawerContent;