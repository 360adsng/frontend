import Image from 'next/image'
import Link from 'next/link'
import search from "@public/icons/search.svg"


const Requests = () => {
  return (
    <>
      <section className="bg-ads360-hash min-h-screen px-4 md:px-10 py-14">
      <div className="flex lg:w-1/4 md:w-2/5 bg-[#f7f8f8] space-x-2 rounded-[40px] px-5 h-10">
          <button>
            <Image
              width={0}
              height={0}
              src={search}
              alt="searchicon"
            />
            </button>
            <input className="rounded-10 w-full bg-transparent focus:outline-none h-full" placeholder="search..."/>
        </div>
        <div className="w-full overflow-x-auto my-5">
          <table className="min-w-full bg-white">
            <thead className='bg-[#D0B301]/40'>
              <tr>
                <th className="py-2 px-2 md:px-3 border-b">ID</th>
                <th className="py-2 px-2 md:px-3 border-b">COST</th>
                <th className="py-2 px-2 md:px-3 border-b">DATE CREATED</th>
                <th className="py-2 px-2 md:px-3 border-b">STATUS</th>
                <th className="py-2 px-2 md:px-3 border-b">ACTIONS</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              <tr>
                <td className="py-2 px-2 md:px-3 border-br">#1</td>
                <td className="py-2 px-2 md:px-3 border-b">₦200000</td>
                <td className="py-2 px-2 md:px-3 border-b">2023-05-20</td>
                <td className="py-2 px-2 md:px-3 border-b">new</td>
                <td className="py-2 px-2 md:px-3 border-b">
                    <Link href={`/vendors/billboards/requests/${1}`}>view</Link>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-2 md:px-3 border-br relative">#2 <div className='absolute px-1 bg-ads360yellowBtn-100 text-[10px] top-0 rounded-full'> new</div></td>
                <td className="py-2 px-2 md:px-3 border-b">₦60000</td>
                <td className="py-2 px-2 md:px-3 border-b">2023-05-4</td>
                <td className="py-2 px-2 md:px-3 border-b">negotiating</td>
                <td className="py-2 px-2 md:px-3 border-b">
                    <Link href={`/vendors/billboards/requests/${2}`}>view</Link>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-2 md:px-3 border-br">#3</td>
                <td className="py-2 px-2 md:px-3 border-b">₦500000</td>
                <td className="py-2 px-2 md:px-3 border-b">2023-05-2</td>
                <td className="py-2 px-2 md:px-3 border-b">paid</td>
                <td className="py-2 px-2 md:px-3 border-b">
                    <Link href={`/vendors/billboards/requests/${3}`}>view</Link>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-2 md:px-3 border-br">#4</td>
                <td className="py-2 px-2 md:px-3 border-b">₦500000</td>
                <td className="py-2 px-2 md:px-3 border-b">2023-05-2</td>
                <td className="py-2 px-2 md:px-3 border-b">completed</td>
                <td className="py-2 px-2 md:px-3 border-b">
                    <Link href={`/vendors/billboards/requests/${4}`}>view</Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className='flex w-full justify-between'>

            <div className='flex space-x-2'>
                <button className='border rounded-10 border-ads360yellow-100 py-1 px-2'>{'<'}</button>
                <button className='border rounded-10 border-ads360yellow-100 py-1 px-2'>1</button>
                <button className='border rounded-10 border-ads360yellow-100 py-1 px-2'>2</button>
                <button>...</button>
                <button className='border rounded-10 border-ads360yellow-100 py-1 px-2'>7</button>
                <button className='border rounded-10 border-ads360yellow-100 py-1 px-2'>8</button>
                <button className='border rounded-10 border-ads360yellow-100 py-1 px-2'>{'>'}</button>
            </div>

            <div>
                1 of 8
            </div>

        </div>
      </section>
    </>
  )
}

export default Requests