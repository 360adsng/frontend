import BlackButtons from '@components/buttons/BlackButton'
import BlackLogo from '@components/logo/BlackLogo'
import Link from 'next/link'
import React from 'react'

const VendorsLogin = () => {
  return (
    <section className='min-h-screen bg-ads360-hash'>
        <div className='p-10'>
        <BlackLogo/>

        </div>

        <div className='font-light text-center my-10'>
            <p className='text-ads360yellow-100'>Verification Link was sent to mu******ics@gmail, </p>
            <p className='text-ads360yellow-100'>please confirm.</p>
            <p>I didn’t receive it?</p>
            <div className='flex justify-center my-5'>
                <BlackButtons text='Resent Link'/>
            </div>
        </div>
    
    </section>
  )
}

export default VendorsLogin