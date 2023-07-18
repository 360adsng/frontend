import '@styles/global.css'
import { Space_Grotesk } from 'next/font/google'



const space_grotesk = Space_Grotesk({
    subsets:['latin'],
    display: 'swap',
})



export const metadata = {
    title:'360 Ads',
    description:'An Advertising platform'
}


function Rootlayout({children}:{children:React.ReactNode}) {
  return (
    <html lang='en'>
        <body>
            <main className={space_grotesk.className} >
                {children}
            </main>
        </body>
    </html>
  )
}

export default Rootlayout