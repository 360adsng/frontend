import notfound from '@public/images/404.png'
import Image  from 'next/image'
import Link from 'next/link'
import { FiArrowRight } from "react-icons/fi"
import Router from "next/navigation"

function NotFound() {

  return (
    <section className='fixed h-full w-full bg-ads360black-100'>
      <div className='flex justify-center drop-shadow pt-32'>
        <Image
            src={notfound}
            width={0}
            height={0}
            alt='404'
          />
      </div>
      <div className='flex justify-center my-10'>
        <Link href='/'>
            <span className='group flex w-[238px]'>
              <button className='group-hover:translate-x-48 group-hover:bg-ads360light-100 w-10 transition bg-ads360yellowBtn-100 mx-1  h-12 flex justify-center items-center rounded-[50%] color-white'><FiArrowRight size={28}/></button>
              <button className='group-hover:-translate-x-11  group-hover:bg-ads360light-100 w-48 transition rounded-10 bg-ads360yellowBtn-100 h-12'>Back to HomePage</button>
            </span>
        </Link>
      </div>

    </section>
  )
}

export default NotFound