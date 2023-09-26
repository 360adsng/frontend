import Group from '@public/images/Group.png';
import digital  from '@public/images/digitalads3.png';
import billboard  from '@public/images/Billboard.png';
import happy from '@public/images/happy.png';
import influencer from '@public/images/influencer1.png';
import Yellowdot from '@public/icons/yellowdot.svg';
import MobileCarousel from '@components/slides/MobileCarousel';
import Why360 from '@components/ui/Why360';
import manads2 from '@public/images/manads2.png';
import Image from 'next/image';
import CountUp from '@components/ui/CountUp'
import SectionX from '@components/slides/InViewX';
import SectionY from '@components/slides/InViewY';
import NewsLetter from '@components/ui/NewsLetter';



const Service = () => {


    return(
        <>
            <section className="bg-ads360black-100 pt-20 text-ads360light-100">
                <div className="text-4xl md:text-6xl px-5 font-[600] md:text-center">
                    <h3>services / <span className="text-ads360black-50">we offer</span></h3>
                    <h3>this is what we do best.</h3>
                </div>
            </section>
            <section id='reach' className='bg-ads360black-100 pb-24 pt-16 text-ads360light-100'>
                <div className='mx-auto w-11/12 md:w-10/12 xl:w-9/12'>
                    <h5 className="text-ads360yellow-100  text-right mb-14">Discorvery @ 360 ads</h5>

                    <h3 className='text-justify md:text-center'>

                        At 360ads we offer an extensive range of automated advertising solutions that are tailored to suit your unique goals and target audience. Our platform simplifies and automates the entire process, allowing you to effortlessly manage your ad placements and achieve maximum results.

                    </h3>
                    <div className='md:flex flex-row-reverse mt-10'>
                        <div className='bg-ads360black-50 rounded-10 drop-shadow-2xl basis-1/3 pt-2'>
                           <h3 className='mb-4 px-2'>Grow Your Business with our seamless <span className='text-ads360yellow-100'>options...</span></h3>
                           <h4 className='mb-4 text-sm px-2 text-justify'> We are your comprehensive solution for automating your ad placements, offering a platform that streamlines the entire process</h4>
                            <div className='mx-auto w-1/2 md:w-3/4 xl:w-3/5 mb-10 md:mb-0'>
                                <Image width={0} height={0} src={Group} className="mx-auto w-full  sm:w-1/2 md:w-full" alt='...'/>
                            </div>
                        </div>
                        <div className='flex text-center justify-evenly basis-3/5 md:mt-56'>
                            <div>
                                <h2 className='text-2xl font-bold'><CountUp end={123} duration={1} enableScrollSpy/><span className='text-ads360yellow-100'>+</span></h2>
                                <h3 className=''>Completed</h3><h3 className=''>Sites</h3>
                            </div>
                            <div>
                                <h2 className='text-2xl font-bold'><CountUp end={1300} duration={1} enableScrollSpy/><span className='text-ads360yellow-100'>+</span></h2>
                                <h3 className=''>Happy</h3><h3 className=''>Customer</h3>
                            </div>
                            <div>
                                <h2 className='text-2xl font-bold'><CountUp end={100} duration={1} enableScrollSpy/><span className='text-ads360yellow-100'>%</span></h2>
                                <h3 className=''>Client</h3><h3 className=''>Reach</h3>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </section>


    
            <section className="bg-ads360light-100 py-20">

                <div className='mx-auto w-11/12 md:w-10/12 xl:w-9/12'>
                    <div className="mb-14">
                    <h5 className="text-ads360yellow-100  mb-8">Our Services</h5>
                    <h3 className="text-2xl lg:text-4xl lg:mb-4 mb-2">
                        Discover Our Automated Advertising Solutions
                    </h3>
                    </div>
                    <div className="hidden md:block">

                        <div id='influencer' className="flex my-10">
                          
                            <div className="basis-1/2 -rotate-12">
                              <SectionX val={-200}>
                                <div className='flex mb-2 justify-center'><span className='flex items-center pr-3'>
                                    <Image width={0} height={0} src={Yellowdot} alt='...'/>
                                </span> Influencer Marketing</div>
                                <Image width={0} height={0} src={influencer} alt='...'/>
                              </SectionX>
                            </div>
                            <div className="basis-1/2 grid grid-cols-1 content-center">
                              <SectionY val={-200}>
                                Leverage the power of influencers to amplify your brand's reach. Our platform connects 
                                you with a diverse network of influencers, allowing you to tap into their engaged
                                audiences and drive brand awareness.
                              </SectionY>
                            </div>
                        </div> 

                        <div id='twitter' className="flex flex-row-reverse my-10 space-x-4">
                            <div className="basis-1/2 rotate-6">
                              <SectionX val={200}>
                                <div className='flex mb-2 justify-center'><span className='flex items-center'>
                                    <Image width={0} height={0} src={Yellowdot} alt='...'/>
                                </span>Twitter Spaces</div>
                                <Image width={0} height={0} src={digital} alt='...'/>
                              </SectionX>
                            </div> 
                            <div className="basis-1/2 grid grid-cols-1 content-center">
                              <SectionY val={200}>
                                Connect with Influencers on Twitter to Host Engaging Twitter Spaces 360ads connects you with influential voices on Twitter, 
                                empowering you to host interactive audio sessions that foster engagement and build brand loyalty. Amplify your reach and create 
                                valuable connections with your target audience through our network of influential partners. Discover the power of hosting 
                                impactful Twitter Spaces with 360ads
                              </SectionY>
                            </div>
                        </div>


                        <div id='sms' className="flex my-10 space-x-4">
                            <div className="basis-1/2 -rotate-12">
                              <SectionX val={-200}>
                                <div className='flex mb-2 justify-center'><span className='flex items-center'>
                                    <Image width={0} height={0} src={Yellowdot} alt='...'/>
                                </span>SMS Campaigns</div>
                                <Image width={0} height={0} src={happy} alt='...'/>
                              </SectionX>
                            </div>
                            <div className="basis-1/2 grid grid-cols-1 content-center">
                              <SectionY val={-200}>   
                                Engage customers directly through personalised SMS campaigns. Our platform enables you 
                                to create and send targeted messages, keeping your audience informed, and driving conversions.
                              </SectionY>
                            </div>
                        </div> 


                        <div id='billboard' className="flex flex-row-reverse my-10 space-x-4">
                            <div className="basis-1/2 rotate-6">
                              <SectionX val={200}>
                                <div className='flex mb-2 justify-center'><span className='flex items-center'>
                                    <Image width={0} height={0} src={Yellowdot} alt='...'/>
                                </span>Billboard Advertisements</div>
                                <Image width={0} height={0} src={billboard} alt='...'/>
                              </SectionX>
                            </div> 
                            <div className="basis-1/2 grid grid-cols-1 content-center">
                              <SectionY val={200}>
                                Capture attention and make a lasting impact with our billboard advertising module.
                                We connect you to billboards strategically placed 
                                in high-traffic areas, ensuring maximum visibility for your brand.
                              </SectionY>
                            </div>
                        </div>  


                        <div id='whatsapp' className="flex my-10 space-x-4">
                            <div className="basis-1/2 -rotate-12">
                              <SectionX val={-200}>
                                <div className='flex mb-2 justify-center'><span className='flex items-center'>
                                    <Image width={0} height={0} src={Yellowdot} alt='...'/>
                                </span>WhatsApp Status Ads</div>
                                <Image width={0} height={0} src={digital} alt='...'/>
                              </SectionX>
                            </div>
                            <div className="basis-1/2 grid grid-cols-1 content-center">
                              <SectionY val={-200}>
                                Showcase your brand in the WhatsApp ecosystem.
                                With our platform, you can seamlessly place ads in WhatsApp status,
                                reaching a vast user base and generating buzz around your products or services.
                             </SectionY>
                            </div>
                        </div>



                        <div id='blog' className="flex flex-row-reverse my-10 space-x-4">
                            <div className="basis-1/2 rotate-6">
                              <SectionX val={200}>
                                <div className='flex mb-2 justify-center'><span className='flex items-center'>
                                    <Image width={0} height={0} src={Yellowdot} alt='...'/>
                                </span>Blog Advertisements</div>
                                <Image width={0} height={0} src={billboard} alt='...'/>
                              </SectionX> 
                            </div>
                            <div className="basis-1/2 grid grid-cols-1 content-center">
                              <SectionY val={200}>
                                Expand your online presence by placing ads on popular blogs. Our platform allows you to negotiate and secure ad placements on relevant blogs, effectively reaching your target audience.
                              </SectionY>
                            </div>
                        </div>  
                       


                    </div>
                    <div className='md:hidden'>
                        <MobileCarousel display="hidden"/>
                    </div>
                </div>
            </section>

            <Why360/>

            <NewsLetter img={manads2}/>
  
        </>
    )
}

export default Service;