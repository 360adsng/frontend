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
            slides?.current?.swiper.slideTo(4);
        }else{
            slides?.current?.swiper.slidePrev();
        }
    }


    const items = [
        {
            image:billboard,
            text:'With Billboards displayed in strategic locations across the country, you can reach your customers with promotional information, product offers and alerts.',
            link:'',
            name:'Billboard Ads'
        },
        {
            image:digital,
            text:'We utilize display ads to reach our target audience when consuming relevant content on the network. With this data, we combine the best approach to reach them.',
            link:'',
            name:'Digital Ads'
        },
        {
            image:happy,
            text:'Our SMS Marketing service mostly delivers messages on latest updates, time-sensitive offers, product launches, alerts, notifications and any other form of promotional information.',
            link:'',
            name:'Smart SMS'
        },
        {
            image:influencer,
            text:'Our SMS Marketing service mostly delivers messages on latest updates, time-sensitive offers, product launches, alerts, notifications and any other form of promotional information.',
            link:'',
            name:'Influencer Ads'
        },
        {
            image:whatsapp,
            text:'Our WhatsApp Marketing service mostly delivers messages on latest updates, time-sensitive offers, product launches, alerts, notifications and any other form of promotional information.',
            link:'',
            name:'WhatsApp Ads'
        },
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
                    <span className='text-[#777777] px-7 flex py-3'>{slide + 1} / 4</span>
                    <button onClick={()=>next(slides?.current?.swiper.activeIndex as number)} className='group-hover:translate-x-32 transition bg-ads360black-100 mx-1 w-50  h-50 flex justify-center items-center rounded-[50%] color-white'>
                        <Image width={0} height={0} src={Arrowright} alt=''/>
                    </button>
                </div>
            </Swiper>
            
        </>
    )
}

export default MobileCaruosel;