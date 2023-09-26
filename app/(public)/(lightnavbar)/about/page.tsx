import manInfluencer1 from '@public//images/maninfluencer1.png';
import BlackButtonsLong from "@components/buttons/BlackButtonsLong";
import Image from 'next/image'
import HowWeThink from '@components/ui/HowWeThink';

const About = () =>{
    return(
        <>
            <section className='bg-ads360light-100 pt-24'>
                <div className="text-4xl md:text-6xl px-5 font-[600] md:text-center">
                    <h3>building concurrent</h3>
                    <h3>——— projects together</h3> 
                </div>
            </section>
            <section className='bg-ads360light-100 pt-14 md:pt-24'>
                <div className='mx-auto w-11/12 md:w-10/12 xl:w-9/12'>
                    <h4 className='text-ads360yellow-100 mb-10'>Culture @ 360 ads</h4> 
                    <p>
                        360 Ads NG is a tech company that 
                        specializes in Digital Marketing. Our 
                        recently developed web-based digital 
                        campaign manager enables corporations 
                        & SME's to promote and target adverts to 
                        prospective customers.
                    </p>
                    <br/>
                    <p>
                        Our aim is to aid organizations drive 
                        digital campaign model via our 
                        collections of tools specifically 
                        developed to manage the design process, 
                        generate leads, improve user responsive
                        ness and efficiently deliver advert contents.
                    </p>
                    <div className="flex md:justify-between flex-col-reverse md:flex-row">
                        <div className="pt-10 md:pt-20 basis-1/2 grid grid-col-1 place-content-end md:place-content-start">
                            <BlackButtonsLong text="Advertise with Us"/>
                        </div>
                        <div className="grid grid-col-1 place-content-end mt-5 pl-10 md:pl-0 md:p-10 md:place-content-start">
                            <Image width={0} height={0} src={manInfluencer1} alt="..."/>
                        </div>
                    </div>
                </div>
            </section>
            <section className='mb-16'>
                 <HowWeThink/>

            </section>
        </>
    )
}

export default About;