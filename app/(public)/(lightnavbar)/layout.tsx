import LightNavbar from '@components/navs/public/LightNavBar'
import Footer from '@components/navs/public/Footer'

//add other meta tags here
// export const metadata = {
//     title:'360 Ads',
//     description:'An Advertising platform'
// }


function layout({children}:{children:React.ReactNode}) {
  return (
    <>
        <LightNavbar/>
            {children}
        <Footer/>
    </>
    
                
            
  )
}

export default layout