import BlackButtons from "@components/buttons/BlackButton"
import phone from '@public/icons/phone.svg'
import email from '@public/icons/mail.svg'
import time from '@public/icons/time.svg'
import React360Logo from '@public/logo/360white.svg';
import instagram from '@public/icons/Instagram2.svg'
import whatsapp from '@public/icons/Whatsapp.svg'
import facebook from '@public/icons/Facebook2.svg'
import twitter from '@public/icons/twitter2.svg'
import google from '@public/icons/Google2.svg'
import Image from "next/image";







const Contact = () => {
    return(
        <>
            <section className='bg-ads360light-100 py-24'>
                <div className='mx-auto w-11/12 md:w-10/12 xl:w-7/12'>
                    <div className="text-4xl md:text-6xl font-sgb">
                        <h3>ready when</h3>
                        <h3>you are—Let’s kickstart</h3>
                        <h3>your digital campaign.</h3>
                    </div>
                    <div className="md:flex flex-row-reverse justify-between my-10">
                        <div className="mb-10">
                            <BlackButtons text="Get in touch"/>
                        </div>
                        <h5>you can also send us a plain email if you want too ;{')'} info@360ads.ng</h5>
                    </div>
                </div>
            </section>

            <section className='bg-ads360black-100 py-24 text-ads360light-100'>
                <div className='mx-auto w-11/12 md:w-10/12 xl:w-9/12'>
                    <div className="md:flex my-10">
                        <div className="basis-8/12 text-right md:text-left">
                            <h5 className="text-ads360yellow-100">Our Office</h5>
                        </div>
                        <div className="basis-4/12 text-right">
                            <h6>3 Adedoyin Ogungbe Crecent,</h6>
                            <h6>Lekki Phase 1,</h6>
                            <h6>Lagos, Nigeria.</h6>
                        </div>

                    </div>
                    <div className="flex flex-col-reverse md:flex-row md:justify-between">
                        <div className="basis-5/12 mt-5 md:mt-0">
                            If you have ideas for your brand, your 
                            business, or the world at large, we’re 
                            here to listen and collaborate. We can 
                            build a more human future <span className="text-ads360yellow-100">together</span>.
                        </div>
                        <div className="basis-4/12">
                            <div>
                                <h5 className="flex justify-end my-2"><Image width={0} height={0} src={phone} alt='phone number'/>+2348122089773</h5>
                                <h5 className="flex justify-end my-2"><Image width={0} height={0} src={email} alt='email'/>info@360ads.ng</h5>
                                <h5 className="flex justify-end my-2"><Image width={0} height={0} src={time} alt='time'/>09:34pm</h5>
                                <div className="flex justify-end my-2"><Image width={0} height={0} src={React360Logo} alt='logo'/></div>
                            </div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-ads360gray-100 py-24 text-ads360black-100">
                <div className="mx-auto w-11/12 md:w-10/12 xl:w-7/12">
                    <div className="md:flex">
                        <h3 className="text-2xl lg:text-4xl mb-5 lg:mb-4 basis-10/12">
                            Looking forward to working 
                            with amazing brands and 
                            businesses
                        </h3>
                        <div className="flex justify-end basis-2/12">
                            <div className="border-l border-[#3C3C3B] pl-7">
                                <Image width={0} height={0} src={whatsapp} className="my-3" alt="whatsapp"/>
                                <Image width={0} height={0} src={facebook} className="my-3" alt="facebook"/>
                                <Image width={0} height={0} src={instagram} className="my-3" alt="instagram"/>
                                <Image width={0} height={0} src={twitter} className="my-3" alt="twitter"/>
                                <Image width={0} height={0} src={google} className="my-3" alt="google"/>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </section>
        </>
    )
}

export default Contact;