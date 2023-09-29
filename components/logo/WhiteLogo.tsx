import Image from 'next/image'
import Link from 'next/link'
import React360Logo from '@public/logo/360white.svg';
import ReactAdsLogo from '@public/logo/adsWhite.svg';

const WhiteLogo = () => {
  return (
    <div>
    <Link href='/' className="flex items-center">
        <Image 
            src={React360Logo} 
            width={0}
            height={0}
            alt=""
            className="hover:-rotate-90 transistion duration-300"
        />
        <Image
            src={ReactAdsLogo} 
            width={0}
            height={0}
            alt=""
        />
    </Link>
</div>
  )
}

export default WhiteLogo