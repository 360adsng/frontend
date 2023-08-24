"use client"
import { useState, useRef } from 'react'
import Image from 'next/image'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import Link from 'next/link';
//import images

import billboardImage2 from '@public/del/billboard2.png'
import Arrowleft from '@public/icons/Arrowleft.svg'
import cancel from '@public/icons/cancel.svg'
import tick2 from '@public/icons/tick2.svg'
import tick3 from '@public/icons/tick3.svg'
import billboardbanner from '@public/images/billboardbanner.png'
import { Value } from 'react-calendar/dist/cjs/shared/types'


import { Toaster, toast } from 'sonner';





function Onboard() {

    const [plan, setPlan] = useState('selete')
    const [value, onChange] = useState<valuePiece | [valuePiece, valuePiece]>(new Date());
    const [selectedDate, setSelectedDate] = useState<valuePiece[]>([])
    const [attachmentType, setAttachmentType] = useState('image')
    const [previewImage, setPreviewImage] = useState<Preview>()
    const [previewVideo, setPreviewVideo] = useState<Preview>()
    const [previewYoutube, setPreviewYoutube] = useState<string>()

    const inputImage = useRef<HTMLInputElement>(null)
    const inputVideo = useRef<HTMLInputElement>(null)

    const handlePlan = (e:React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target
        if(value === 'Selete'){
            toast.error('kindly selete a duration plan')
            setPlan('')
        }else{
            setPlan(value)
        }
    }

    const addDate = (info:Value) => {
        const check = selectedDate.find((date)=>{

            return ( info?.toLocaleString() === date?.toLocaleString() )
        })

        if(check){
            toast.error('You havealready selected this date')
        }else{
            setSelectedDate(prev => [...prev, info as valuePiece])
        }
    }

    const removeDate = (rmDate:valuePiece) => {
        const updateDate = selectedDate.filter((dates)=>( rmDate !== dates ))
        setSelectedDate(updateDate)

    }


    const handleChangeImage = (e:React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files
        if(file !== null && file.length > 0){
            const objectUrl = URL.createObjectURL(file[0])
            setPreviewYoutube('')
            setPreviewImage({
                src:objectUrl,
                name:file[0].name
            })
            setPreviewVideo(undefined)
        }
    }

    const handleChangeVideo = (e:React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files
        if(file !== null && file.length > 0){
            const objectUrl = URL.createObjectURL(file[0])
            setPreviewYoutube('')
            setPreviewImage(undefined)
            setPreviewVideo({
                src:objectUrl,
                name:file[0].name
            })
        }
    }

    const handleChangeYoutube = (e:React.ChangeEvent<HTMLInputElement>) => {
            setPreviewYoutube(e.target.value)
            setPreviewImage(undefined)
            setPreviewVideo(undefined)
        }
    




        const [billboard, setBillboard] = useState({
            id:'',
            plan:plan,
            attachment:attachmentType === 'image'?previewImage:attachmentType==='video'?previewVideo:previewYoutube,
            dates:selectedDate
        })

  
    
                
      
  return (
    <section className='px-4 md:px-10 py-24'>
        
        <h3 className='text-2xl'></h3>

        <div className="flex items-center font-bold">
          <button className='group-hover:translate-x-32 transition bg-ads360black-100 mx-1 w-11  h-11 flex justify-center items-center rounded-[50%] color-white'>
          <Image
            src={Arrowleft}
            width={0}
            height={0}
            alt="arrow"
          />
        </button>
        BillBoard Marketing
      </div>
        


        <section className='md:flex my-10'>

            
            <div className='basis-1/2 md:px-8'>
                <p className="text-stone-400">Choose day(s) to run campaign</p>
                <select onChange={handlePlan} className='my-3 bg-white focus:outline-none w-[200px] p-2 rounded-10'>
                    <option>Selete</option>
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                </select>
            {
                plan === 'Daily'? 
                <div className='flex'>
                    <Calendar onChange={(value)=>{onChange; addDate(value)}} className={`shadow-lg rounded-l-10`} value={value} />
                    <div className='bg-white overflow-y-scroll selectedDate h-[19rem] px-1 shadow-lg rounded-r-10'>
                        <p className="text-stone-400 text-center text-sm">Seleted days</p>
                        <div>
                            {selectedDate?.map((date, i)=>(
                                <div key={i} className='flex p-1 rounded  text-sm bg-[#006edc] text-white my-1'>
                                    <span className='px-1 basis-10/12'>{date?.toLocaleDateString()}</span>
                                    <Image
                                        height={0}
                                        width={0}
                                        alt='remove date'
                                        src={cancel}
                                        onClick={()=>removeDate(date)}
                                        className='basis-2/12'
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                :
                plan === 'Weekly' ?
                <div>
                    <input type='date' className='w-full bg-white rounded-10 my-5 p-2 focus:outline-none'/>
                    <br/>
                    <input type='number' className='w-full bg-white rounded-10 my-5 p-2 focus:outline-none'/>
                </div>
                :
                plan === 'Monthly' ?
                <div>
                    <input type='date' className='w-full bg-white rounded-10 my-5 p-2 focus:outline-none'/>
                    <br/>
                    <input type='number' className='w-full bg-white rounded-10 my-5 p-2 focus:outline-none'/>
                </div>
                :
                null

            }



            {/* attachment */}

            <div className='mt-5'>
                <h4 className='font-bold my-3'>Attachments</h4>
                    
                <div className='flex justify-between'>
                    <h5 className='flex space-x-3'>
                        {attachmentType === 'image'?
                            <Image
                                height={17}
                                width={17}
                                alt='tick2'
                                src={tick3}
                            />
                            :
                            <Image
                                height={17}
                                width={17}
                                alt='tick2'
                                src={tick2}
                                onClick={()=>setAttachmentType('image')}
                            />
                        }
                        <span>Image Assets</span>
                    </h5>


                    <h5 className='flex space-x-3'>
                        {attachmentType === 'video'?
                            <Image
                                height={17}
                                width={17}
                                alt='tick2'
                                src={tick3}
                            />
                            :
                            <Image
                                height={17}
                                width={17}
                                alt='tick2'
                                src={tick2}
                                onClick={()=>setAttachmentType('video')}
                            />
                        }
                        <span>Video Assets</span>
                    </h5>


                    <h5 className='flex space-x-3'>
                        {attachmentType === 'youtube'?
                            <Image
                                height={17}
                                width={17}
                                alt='tick2'
                                src={tick3}
                            />
                            :
                            <Image
                                height={17}
                                width={17}
                                alt='tick2'
                                src={tick2}
                                onClick={()=>setAttachmentType('youtube')}
                            />
                        }
                        <span>YouTube Link</span>
                    </h5>

                </div>
                    {attachmentType === 'image'?
                        <div>
                            <div className='bg-white flex items-center pl-3 justify-between rounded-10 my-5 w-full ...'><div>{previewImage?.name !== undefined && previewImage?.name.length > 10 ?  previewImage?.name.slice(0, 9)+'...'+previewImage?.name.slice(-3) : previewImage?.name }</div><button className='p-2 rounded-r-10 bg-ads360gray-100' onClick={()=>inputImage.current?.click()}>browse</button></div>
                            <input type='file' hidden onChange={(e)=>handleChangeImage(e)} ref={inputImage} accept="image/*" />
                            <p className='text-red-500'>Required billboard image dimension: 496(H) by 800(W)</p>
                        </div>
                        
                        :
                        attachmentType === 'video'?
                        <div>
                            <div className='bg-white flex items-center pl-3 justify-between rounded-10 my-5'><span className='truncate ... w-1/2 overflow-hidden'>{previewVideo?.name !== undefined && previewVideo?.name.length > 10 ?  previewVideo?.name.slice(0, 9)+'...'+previewVideo?.name.slice(-3) : previewVideo?.name }</span><button className='p-2 rounded-r-10 bg-ads360gray-100' onClick={()=>inputVideo.current?.click()}>browse</button></div>
                            <input type='file' hidden onChange={(e)=>handleChangeVideo(e)} ref={inputVideo} accept='video/*' />
                            <p className='text-red-500'>Required billboard video dimension: 496(H) by 800(W)</p>
                        </div>
                        :
                        <div>
                            <input type='url' value={previewYoutube} onChange={(e)=>handleChangeYoutube(e)} className='w-full rounded-10 my-5 p-2 focus:outline-none'/>
                            <p className='text-red-500'>Only youtube link allowed</p>
                        </div>
                    }
                </div>
            </div>
            



            <div className='basis-1/2 px-3 md:px-5 my-10 lg:my-0'>
                <div className='rounded-10 w-full'>


                    


                    {attachmentType === 'video' && previewVideo ?  

                        <video className='rounded-10' controls>
                            <source className='w-full' src={previewVideo.src} type='video/mp4'/>
                            <source className='w-full' src={previewVideo.src} type='video/webm'/>
                            Your browser does not support the video tag.
                        </video>

                    :
                    attachmentType === 'image' && previewImage ?

                        <Image
                            height={0}
                            width={0}
                            alt='billboard'
                            src={previewImage.src}
                            className='mx-auto w-full rounded-10 h-56'
                        />
                    :
                    attachmentType === 'youtube' && previewYoutube ?

                    
                            <iframe className='w-full h-56 rounded-10'
                                src={previewYoutube}>
                            </iframe>
            
                    :
                        <Image
                            height={0}
                            width={0}
                            alt='billboard'
                            src={billboardbanner}
                            className='mx-auto w-full h-56'
                        />
                    }
                </div>
            </div>
        </section>





   
        <div className='flex justify-end'>
            
            <button className="group rounded-10 hover:animate-changeColor text-white bg-ads360yellow-100 w-123 h-12">
              <Link href={`/ads/billboard/${2}/onboard/checkout`}>Next</Link>
            </button>
          </div>

          <Toaster position="top-center" closeButton />

    </section>
  )
}

export default Onboard