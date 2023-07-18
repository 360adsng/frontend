"use client"
import why1 from '@public/icons/why1.svg';
import why2 from '@public/icons/why2.svg';
import why3 from '@public/icons/why3.svg';
import why4 from '@public/icons/why4.svg';
import Image from 'next/image';

const Why360 = () => {

     //this array is for why 360 ads section
     const why360ads = [
        {
            yellowWriteUp : "Customer Loyalty Management",
            whiteWripeUp : "We provide well optimized system that allows you access to all you need to grow your business thereby giving you your money’s worth of service.",
            image : why1
        },
        {
            yellowWriteUp : "Increase Leads & Customers",
            whiteWripeUp : "We allow you to focus on the people who are searching for what your business offers. Watch your number increase with our transparent process.",
            image : why2
        },
        {
            yellowWriteUp : "Target Demography",
            whiteWripeUp : "We target on the basis of age, gender, location to communicate with relevance and precision.",
            image : why3
        },
        {
            yellowWriteUp : "Building Customers Trust and give them Consultation",
            whiteWripeUp : "We allow you to focus on the people who are searching for what your business offers. Watch your number increase with our transparent process.",
            image : why4
        },
    ]

    return(
        <>
            <section id='why360Ads' className='bg-ads360black-100 py-24 text-ads360light-100'>
                <div className="mx-auto w-11/12 md:w-10/12 xl:w-9/12">
                    <h4 className='text-center text-2xl lg:text-4xl mb-10'>Why 360 ads</h4>

                    <div className='md:grid md:grid-cols-2 md:gap-7 lg:gap-10'>

                        {
                            why360ads.map((values, i)=>(
                                <div key={i} className="bg-ads360black-50 my-14 rounded md:my-0 text-center pt-2 px-2 drop-shadow-2xl">
                                    <div className='text-ads360yellow-100 text-lg mb-2'>
                                        {values.yellowWriteUp}
                                    </div>
                                    <div className='text-ads360light-100 my-4'>
                                        {values.whiteWripeUp}
                                    </div>
                                    <div className='mx-auto w-1/2'>
                                        <Image width={0} height={0} src={values.image} className="" alt='...'/>
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                </div>
            </section>

        </>
    )
}

export default Why360;