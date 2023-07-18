import Group from '@public/images/Group.png';
import digital  from '@public/images/digitalads3.png';
import billboard  from '@public/images/Billboard.png';
import happy from '@public/images/happy.png';
import influencer from '@public/images/influencer1.png';
import whatsapp from '@public/images/whatsapp.png';
import Yellowdot from '@public/icons/yellowdot.svg';
import MobileCarousel from '@components/slides/MobileCarousel';
import Why360 from '@components/Why360';
import SmallBtnYello from '@components/buttons/SmallBtnYellow';
import manads2 from '@public/images/manads2.png';
import Image from 'next/image';
import CountUp from '@components/CountUp'



const Service = () => {


    return(
        <>
            <section className="bg-ads360black-100 pt-20 text-ads360light-100">
                <div className="text-4xl md:text-6xl px-5 font-sgb md:text-center">
                    <h3>services/ <span className="text-ads360black-50">we offer</span></h3>
                    <h3>this is what we do best.</h3>
                </div>
            </section>
            <section id='reach' className='bg-ads360black-100 py-24 text-ads360light-100'>
                <div className='mx-auto w-11/12 md:w-10/12 xl:w-9/12'>
                    <h5 className="text-ads360yellow-100  text-right mb-14">Discorvery @ 360 ads</h5>

                    <h3 className='text-center'>
                        With over <span className='text-ads360yellow-100'>70 million</span> target audience we connect your business to the 
                        right customer using our BILLBOARDS, SMART SMS, DISPLAY ADS, 
                        VOICE SMS and TOP INFLUENCERS who will promote your brand 
                        and products.
                    </h3>
                    <div className='md:flex flex-row-reverse mt-10'>
                        <div className='bg-ads360black-50 rounded-10 drop-shadow-2xl basis-1/3 pt-2'>
                           <h3 className='mb-4 px-2'>Grow Your Business with our seamless <span className='text-ads360yellow-100'>options...</span></h3>
                           <h4 className='mb-4 text-sm px-2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, tempor incididunt ut labore et dolore magna aliqua.</h4>
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


            <section className="bg-ads360light-100 py-24">

                <div className='mx-auto w-11/12 md:w-10/12 xl:w-9/12'>
                    <div className="mb-16">
                    <h5 className="text-ads360yellow-100  mb-10">Our Services</h5>
                    <h3 className="text-2xl lg:text-4xl lg:mb-4 mb-2">
                        Get your audience’s attention with our 
                        services
                    </h3>
                    </div>
                    <div className="hidden md:block">

                        <div id='influencer' className="flex my-10">
                            <div className="basis-1/2 -rotate-12">
                                <div className='flex mb-2 justify-center'><span className='flex items-center pr-3'>
                                    <Image width={0} height={0} src={Yellowdot} alt='...'/>
                                </span>Influencer Marketing</div>
                                <Image width={0} height={0} src={influencer} alt='...'/>
                            </div>
                            <div className="basis-1/2 grid grid-cols-1 content-center pl-10">
                                360 ads offers the ideal platform for 
                                advertisers to engage influencers to 
                                promote their products and services on 
                                their social media platforms at a cost.
                            </div>
                        </div>

                        <div id='digital' className="flex flex-row-reverse my-10">
                            <div className="basis-1/2 rotate-6">
                                <div className='flex mb-2 justify-center'><span className='flex items-center pr-3'>
                                    <Image width={0} height={0} src={Yellowdot} alt='...'/>
                                </span>Digital Ads</div>
                                <Image width={0} height={0} src={digital} alt='...'/>
                            </div>
                            <div className="basis-1/2 grid grid-cols-1 content-center">
                                We utilize display ads to reach our target 
                                audience when consuming relevant content 
                                on the network. With this data, we combine 
                                the best appraoch to reach them
                            </div>
                        </div>


                        <div id='smartsms' className="flex my-10">
                            <div className="basis-1/2 -rotate-12">
                                <div className='flex mb-2 justify-center'><span className='flex items-center pr-3'>
                                    <Image width={0} height={0} src={Yellowdot} alt='...'/>
                                </span>SMS Makerting</div>
                                <Image width={0} height={0} src={happy} alt='...'/>
                            </div>
                            <div className="basis-1/2 grid grid-cols-1 content-center pl-10">
                                Our SMS Marketing service mostly delivers 
                                messages on latest updates, time-sensitive 
                                offers, product launches, alerts, notifications 
                                and any other form of 
                                promotional information.
                            </div>
                        </div>


                        <div id='billboard' className="flex flex-row-reverse my-10">
                            <div className="basis-1/2 rotate-6">
                                <div className='flex mb-2 justify-center'><span className='flex items-center pr-3'>
                                    <Image width={0} height={0} src={Yellowdot} alt='...'/>
                                </span>BillBoard Makerting</div>
                                <Image width={0} height={0} src={billboard} alt='...'/>
                            </div>
                            <div className="basis-1/2 grid grid-cols-1 content-center">
                                With Billboards displayed in strategic 
                                locations across the country, you can 
                                reach your customers with promotional 
                                information, product offers and alerts.
                            </div>
                        </div>


                        <div id='whatsapp' className="flex my-10">
                            <div className="basis-1/2 -rotate-12">
                                <div className='flex mb-2 justify-center'><span className='flex items-center pr-3'>
                                    <Image width={0} height={0} src={Yellowdot} alt='...'/>
                                </span>WhatsApp Cluster</div>
                                <Image width={0} height={0} src={whatsapp} alt='...'/>
                            </div>
                            <div className="basis-1/2 grid grid-cols-1 content-center pl-10">
                                Our SMS Marketing service mostly delivers 
                                messages on latest updates, time-sensitive 
                                offers, product launches, alerts, notifications 
                                and any other form of promotional information.
                            </div>
                        </div>
                       


                    </div>
                    <div className='md:hidden'>
                        <MobileCarousel display="hidden"/>
                    </div>
                </div>
            </section>

            <Why360/>

            <section id='newsletter' className='bg-ads360light-100 pt-20 md:pb-20'>
                <div className="mx-auto px-1 md:px-0 pt-5 w-11/12 md:w-10/12 xl:w-9/12 text-center text-white md:bg-ads360black-100 md:rounded">
                    <div className="relative">
                        <div className='bg-ads360black-100 pt-10 pb-10 md:pb-5 rounded md:rounded-none'>
                            <h3 className='text-2xl lg:text-4xl'>Subscribe to Our Newsletter</h3>
                            <h6 className="">For exclusives sales. updates & <span className="text-ads360yellow-100">news</span></h6>
                            <div className='mt-5 md:mt-10'>
                                {/* <form> */}
                                    <div className='flex text-black px-1 rounded h-[38px] md:h-[45px] w-11/12 md:w-1/2 mx-auto items-center justify-center bg-ads360light-100'>
                                        <input type="text" className='w-full focus:outline-none bg-transparent h-[38px] md:h-[50px]' placeholder='Enter Email...' />
                                        <div>
                                            <SmallBtnYello text='Submit'/>
                                        </div>
                                    </div>
                                {/* </form> */}
                            </div>
                        </div>
                        <div className="flex justify-center md:mt-5">
                            <Image width={0} height={0} src={manads2} alt="..."/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Service;