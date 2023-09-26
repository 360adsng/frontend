
import why1 from '@public/icons/why1.svg';
import why2 from '@public/icons/why2.svg';
import why3 from '@public/icons/why3.svg';
import why4 from '@public/icons/why4.svg';
import Image from 'next/image';

const Why360 = () => {

     //this array is for why 360 ads section
     const why360ads = [
        {
            yellowWriteUp : "Automated Advertising Platform",
            whiteWripeUp : "Our platform eliminates the need for intermediaries and streamlines the advertising process, saving you time, effort, and resources. You have full control over your ad placements, allowing you to make data-driven decisions and optimise your campaigns for maximum effectiveness.",
            image : why2

        },
        {
            yellowWriteUp : "User-Friendly Interface",
            whiteWripeUp : "Our platform is designed with user-friendliness in mind, making it easy for you to navigate and manage your advertising campaigns. You don't need prior advertising experience to utilise our platform effectively.",
            image : why1
        },
        {
            yellowWriteUp : "Exceptional Support",
            whiteWripeUp : "Our dedicated support team is here to assist you every step of the way. If you have any questions or encounter any issues, we are ready to provide prompt and helpful assistance.",
            image : why4

        },
        {
            yellowWriteUp : "Targeted Reach",
            whiteWripeUp : "With our precise targeting capabilities, we ensure that your ads reach the right audience, maximizing your chances of success and generating tangible results.",
            image : why3
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
                                <div key={i} className="bg-ads360black-50 my-14 rounded-10 md:my-0 text-center pt-5 px-5 shadow-2xl shadow-black">
                                    <div className='text-ads360yellow-100 text-lg mb-2'>
                                        {values.yellowWriteUp}
                                    </div>
                                    <div className='text-ads360light-100 my-4 text-justify'>
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