import BillBoardSideNav from '@components/navs/Vendors/billboard/BillBoardSideNav'
import BillBoardNav from '@components/navs/Vendors/billboard/BillBoardNav'



function Layout({children}:{children:React.ReactNode}) {
  return (
    <>
      <main className='md:flex'>
        <section className='group hidden transistion duration-300 md:block basis-[6%] hover:basis-[18.2%] xl:hover:basis-[15.8%] '>
          <BillBoardSideNav/>
        </section>
        <section className='md:basis-[100%]'>
          <BillBoardNav/>
          {children}
        </section>
      </main>
        
    </>
    
                
            
  )
}

export default Layout