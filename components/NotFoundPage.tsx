const notfound = '/images/404.png'
import { Link } from '@tanstack/react-router'
import { FiArrowRight } from 'react-icons/fi'

export default function NotFoundPage() {
  return (
    <section className="fixed h-full w-full bg-ads360black-100">
      <div className="flex justify-center drop-shadow pt-32">
        <img src={notfound} alt="404" className="max-w-full h-auto" />
      </div>
      <div className="flex justify-center my-10">
        <Link to="/">
          <span className="group flex w-[238px]">
            <button
              type="button"
              className="group-hover:translate-x-48 group-hover:bg-ads360light-100 w-12 transition bg-ads360yellowBtn-100 mx-1  h-12 flex justify-center items-center rounded-[50%] color-white"
            >
              <FiArrowRight size={28} />
            </button>
            <button
              type="button"
              className="group-hover:-translate-x-11  group-hover:bg-ads360light-100 w-48 transition rounded-10 bg-ads360yellowBtn-100 h-12"
            >
              Back to HomePage
            </button>
          </span>
        </Link>
      </div>
    </section>
  )
}
