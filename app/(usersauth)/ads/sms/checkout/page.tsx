import Image from "next/image";
import Link from "next/link";
import BackBtn from "@components/buttons/BackBtn";
import card from "@public/del/cards.png";



const Checkout = () => {
  
  

 

 

  return (
    <>
      <section className="mx-4 md:mx-10 pt-32 pb-24">
      <BackBtn>Smart SMS / Display Ad</BackBtn>

        <div className="mt-10 my-10 md:flex bg-ads360light-100 rounded-10 border-ads360yellow-100 border">
           <div className="md:basis-6/12 mx-4">
           <div className="grid grid-cols-2 gap-2 my-5">
           
            <div>
                <h4 className="font-medium">Sender ID</h4>
                <p>Super Sales</p>
            </div>

            <div>
                <h4 className="font-medium">Number</h4>
                <p>08140231279</p>
            </div>

            <div>
                <h4 className="font-medium">USSD code</h4>
                <p>*123#</p>
            </div>


            <div>
                <h4 className="font-medium">url</h4>
                <p>www.testing.com</p>
            </div>
            
            <div>
                <h4 className="font-medium">Message</h4>
                <p className="text-justify">Lorem ipsum dolor sit amet. ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum</p>
            </div>
            </div>

            <div className="my-5">
                <h4 className="font-medium">Duration</h4>
                <p>Days</p>
                <h5>2/12/2023</h5>
                <h5>2/12/2023</h5>
                <h5>2/12/2023</h5>
            </div>

            <div className="my-5">
                <h3 className="font-meduim">Pricing</h3>
                <p>4000 numbers loaded at the rate of 4 naira each</p>
                <h4>Total: 16000</h4>
            </div>

            <div className="my-5">
                <button className={`hover:animate-changeColor hover:text-white bg-ads360yellow-100 w-123 h-12 rounded-10 my-2 `}>
                <Link href={`/ads/${2}`}>Pay Now</Link>
                </button>
            </div>
            </div>
            <div className="basis-6/12 my-5">
                <Image alt="" src={card}/>
            </div>
            </div>
            
      </section>

     


    </>
  );
};

export default Checkout;
