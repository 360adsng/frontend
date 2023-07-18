
import UserSideNav from '@components/navs/UserSideNav'
import UsersNav from '@components/navs/UsersNav'



function layout({children}:{children:React.ReactNode}) {
  return (
    <>
      <main className='md:flex'>
        <section className='group hidden transistion duration-300 md:block basis-[6%] hover:basis-[20.2%] xl:hover:basis-[14.8%] '>
          <UserSideNav/>
        </section>
        <section className='md:basis-[100%]'>
          <UsersNav/>
          {children}
        </section>
      </main>
        
    </>
    
                
            
  )
}

export default layout