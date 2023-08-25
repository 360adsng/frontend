"use client"
//import from next
import Image from 'next/image';
import Link  from 'next/link';

//import swiper component and swiper css
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';

//import hooks aand links
import { useState, useRef } from 'react';
//import from utilities
import YellowButtons from '../buttons/YellowButton';

//import images
import digital  from '@public/images/digitalads3.png';
import billboard  from '@public/images/Billboard.png';
import happy from '@public/images/happy.png';
import Arrowright from '@public/icons/Arrowright.svg';
import Arrowleft from '@public/icons/Arrowleft.svg';
import Yellowdot from '@public/icons/yellowdot.svg';
import influencer from '@public/images/influencer1.png';
import whatsapp from '@public/images/whatsapp.png';




interface Props {
    display:string
}




const MobileCaruosel : React.FC<Props> = ({display}) => {

    const [slide, setSlide] = useState(0)
    const slides = useRef<SwiperRef>(null)

    const next = (current:number) => {
        if(current === 4){
            slides?.current?.swiper.slideTo(0);
        }else{
            slides?.current?.swiper.slideNext();
        }
    }

    const prev = (current:number) => {
        if(current === 0){
            slides?.current?.swiper.slideTo(5);
        }else{
            slides?.current?.swiper.slidePrev();
        }
    }


    const items = [
        {
            image:billboard,
            text:'Capture attention and make a lasting impact with our billboard advertising module.We connect you to billboards strategically placed in high-traffic areas, ensuring maximum visibility for your brand.',
            link:'',
            name:'Billboard Ads'
        },
        {
            image:happy,
            text:'Engage customers directly through personalised SMS campaigns. Our platform enables you to create and send targeted messages, keeping your audience informed, and driving conversions..',
            link:'',
            name:'SMS Ads'
        },
        {
            image:influencer,
            text:"Leverage the power of influencers to amplify your brand's reach. Our platform connects you with a diverse network of influencers, allowing you to tap into their engagedaudiences and drive brand awareness.",
            link:'',
            name:'Influencer Ads'
        },
        {
            image:digital,
            text:'Connect with Influencers on Twitter to Host Engaging Twitter Spaces 360ads connects you with influential voices on Twitter, empowering you to host interactive audio sessions that foster engagement and build brand loyalty.',
            link:'',
            name:'Twitter Spaces'
        },
        {
            image:happy,
            text:'Expand your online presence by placing ads on popular blogs. Our platform allows you to negotiate and secure ad placements on relevant blogs, effectively reaching your target audience.',
            link:'',
            name:'Blog Ads'
        },
        {
            image:influencer,
            text:'Showcase your brand in the WhatsApp ecosystem. With our platform, you can seamlessly place ads in WhatsApp status, reaching a vast user base and generating buzz around your products or services.',
            link:'',
            name:'WhatsApp Ads'
        }
    ]
   
    return(
        <>
            
            <Swiper
            modules={[Autoplay]}
                slidesPerView={"auto"}
                spaceBetween={30}
                ref = {slides}
                autoplay = {{
                    delay:2000,
                    pauseOnMouseEnter:true,
                    
                }}

                onSlideChange={()=> setSlide(slides?.current?.swiper.activeIndex as number)}

            >
                

                {
                    items.map((values, i)=>(

                        <SwiperSlide key={i}>
                            <div className='flex mb-4 justify-center'><span className='flex items-center pr-3'><Image width={0} height={0} src={Yellowdot} alt=''/></span>{values.name}</div>
                            <div className=''>
                                <div className='mb-7 flex justify-center'>
                                    <Image width={0} height={0} src={values.image} alt='...'/>
                                </div>
                                <div className=''>
                                    <div>
                                        <p className=''>
                                           {values.text}
                                        </p>
                                        <Link href={values.link} className={`${display} my-5`}><YellowButtons text='Learn More'/></Link>
                                        </div>
                                    </div>
                                </div>
                        </SwiperSlide> 

                    ))
                }
 

                <div className='flex justify-center mt-7'>
                    <button onClick={()=>prev(slides?.current?.swiper.activeIndex as number)} className='group-hover:translate-x-32 transition bg-ads360black-100 mx-1 w-50  h-50 flex justify-center items-center rounded-[50%] color-white'>
                        <Image width={0} height={0} src={Arrowleft} alt=''/>
                    </button>
                    <span className='text-[#777777] px-7 flex py-3'>{slide + 1} / {items.length}</span>
                    <button onClick={()=>next(slides?.current?.swiper.activeIndex as number)} className='group-hover:translate-x-32 transition bg-ads360black-100 mx-1 w-50  h-50 flex justify-center items-center rounded-[50%] color-white'>
                        <Image width={0} height={0} src={Arrowright} alt=''/>
                    </button>
                </div>
            </Swiper>
            
        </>
    )
}

export default MobileCaruosel;