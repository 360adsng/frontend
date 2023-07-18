
import UserSideNav from '@components/navs/UserSideNav'
import UsersNav from '@components/navs/UsersNav'

//add other meta tags here
// export const metadata = {
//     title:'360 Ads',
//     description:'An Advertising platform'
// }


function layout({children}:{children:React.ReactNode}) {
  return (
    <>
      <nav className='fixed w-full z-[10000]'>
        <UsersNav/>
      </nav>
      <section className="bg-ads360-hash min-h-screen">
        {children}
      </section>
    </>
    
                
            
  )
}

export default layout