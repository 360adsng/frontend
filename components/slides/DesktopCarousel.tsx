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
import whatsapp from '@public/images/whatsapp.png';






const DesktopCaruosel = () => {

    const [slide, setSlide] = useState(0)
    const slides = useRef<SwiperRef>(null)

    const items = [
        {
            image:billboard,
            text:'With Billboards displayed in strategic locations across the country, you can reach your customers with promotional information, product offers and alerts.',
            link:'',
            Name:'Billboard Ads'
        },
        {
            image:digital,
            text:'We utilize display ads to reach our target audience when consuming relevant content on the network. With this data, we combine the best approach to reach them.',
            link:'',
            Name:'Digital Ads'
        },
        {
            image:happy,
            text:'Our SMS Marketing service mostly delivers messages on latest updates, time-sensitive offers, product launches, alerts, notifications and any other form of promotional information.',
            link:'',
            Name:'Smart SMS'
        },
        {
            image:influencer,
            text:'Our SMS Marketing service mostly delivers messages on latest updates, time-sensitive offers, product launches, alerts, notifications and any other form of promotional information.',
            link:'',
            Name:'Influencer Ads'
        },
        {
            image:whatsapp,
            text:'Our WhatsApp Marketing service mostly delivers messages on latest updates, time-sensitive offers, product launches, alerts, notifications and any other form of promotional information.',
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
                                    <p className=''>
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