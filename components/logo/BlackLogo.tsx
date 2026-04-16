import { Link } from "@tanstack/react-router"
const React360Logo = '/logo/360black.svg'
const ReactAdsLogo = '/logo/ads.svg'
const BlackLogo = () => {
  return (
    <div>
                    <Link to='/' className="flex items-center">
                        <img 
                            src={React360Logo} alt=""
                            className="hover:-rotate-90 transistion duration-300"
                        />
                        <img
                            src={ReactAdsLogo} alt=""
                        />
                    </Link>
                </div>
  )
}

export default BlackLogo