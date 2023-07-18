import Head from 'next/head'
import '@styles/global.css'

import Footer from '@components/navs/Footer'
import DarkNavbar from '@components/navs/DarkNavbar'

//add other meta tags here
// export const metadata = {
//     title:'360 Ads',
//     description:'An Advertising platform'
// }

function layout({children}:{children:React.ReactNode}) {
  return (
    <>
        <DarkNavbar/>
            {children}
        <Footer/>
    </>

  )
}

export default layout