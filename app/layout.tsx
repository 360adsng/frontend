import '@styles/global.css'
import { lexend } from '@components/fonts'



export const metadata = {
    title:'360 Ads',
    description:'An Advertising platform'
}


function Rootlayout({children}:{children:React.ReactNode}) {
  return (
    <html lang='en'>
        <body>
            <main className={lexend.className} >
                {children}
            </main>
        </body>
    </html>
  )
}

export default Rootlayout