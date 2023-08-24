"use client"
//import from next
import Image from 'next/image';
import Link  from 'next/link';

//swiper component and swiper css
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';

//import from hooks and link
import { useState, useRef } from 'react';

//import from utilities
import YellowBtnShort from '../buttons/YellowBtnShort';
 

//import images
import Darkdot from '@public/icons/darkdot.svg';
import Yellowdot from '@public/icons/yellowdot.svg';
import digital  from '@public/images/digitalads3.png';
import billboard  from '@public/images/Billboard.png';
import happy from '@public/images/happy.png';
import influencer from '@public/images/influencer1.png';






const DesktopCaruosel = () => {

    const [slide, setSlide] = useState(0)
    const slides = useRef<SwiperRef>(null)

    const items = [
        {
            image:billboard,
            text:'Capture attention and make a lasting impact with our billboard advertising module.We connect you to billboards strategically placed in high-traffic areas, ensuring maximum visibility for your brand.',
            link:'',
            Name:'Billboard Ads'
        },
        {
            image:happy,
            text:'Engage customers directly through personalised SMS campaigns. Our platform enables you to create and send targeted messages, keeping your audience informed, and driving conversions..',
            link:'',
            Name:'SMS Ads'
        },
        {
            image:influencer,
            text:"Leverage the power of influencers to amplify your brand's reach. Our platform connects you with a diverse network of influencers, allowing you to tap into their engagedaudiences and drive brand awareness.",
            link:'',
            Name:'Influencer Ads'
        },
        {
            image:digital,
            text:'Showcase your brand in the WhatsApp ecosystem. With our platform, you can seamlessly place ads in WhatsApp status,reaching a vast user base and generating buzz around your products or services.',
            link:'',
            Name:'WhatsApp Ads'
        },
    ]

    
   
    return(
        <>
            
            <Swiper
                modules={[Autoplay]}
                slidesPerView={1}
                ref = {slides}
                autoplay = {{
                delay:2000,
                pauseOnMouseEnter:true,
                    
                }}
                onSlideChange={()=> setSlide(slides?.current?.swiper.activeIndex as number)}
            >
                <div slot='container-start' >
                    <div className='flex text-center justify-evenly mb-5'>
                        {
                            items.map((item, i)=>(

                                <div 
                                    className='flex' 
                                    onClick={()=>{slides?.current?.swiper.slideTo(i); setSlide(i)}}
                                    key={i}
                                    >
                                        {slide === i ?
                                            <Image 
                                                src={Yellowdot} 
                                                width={0}
                                                height={0}
                                                alt=""
                                            />
                                        :
                                            <Image 
                                                src={Darkdot} 
                                                width={0}
                                                height={0}
                                                alt=""
                                            />
                                            }
                                    {item.Name}
                                </div>
                                
                            ))
                        }                         
                    </div>
                    <hr className='mb-10'/>
                </div>
                
                {items.map((values, i)=>(

                    <SwiperSlide key={i}>
                        <div className='flex justify-evenly'>
                            <div className='basis-2/3'>
                                 <Image 
                                    src={values.image} 
                                    width={0}
                                    height={0}
                                    alt=""
                                />
                            </div>
                            <div className='grid grid-cols-1 content-center basis-5/6 px-5 lg:px-8'>
                                <div>
                                    <p className='text-justify'>
                                        {values.text}
                                    </p>
                            
                                    <Link href={values.link} className='block mt-5'>
                                        <YellowBtnShort text='Learn More'/>
                                    </Link>
                                    
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>

                ))}
            </Swiper>
            
        </>
    )
}

export default DesktopCaruosel;