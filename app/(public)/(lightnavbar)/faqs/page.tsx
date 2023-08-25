import Faqs from "@components/Faqs";
import BlackButtons from "@components/buttons/BlackButton";

const Faq = () =>{


    return(
        <>
            <section className='bg-ads360light-100 py-24'>
                <div className='mx-auto w-11/12 md:w-10/12 xl:w-7/12'>
                    <div className="text-4xl md:text-6xl font-[600]">
                        <h3>Frequently Asked </h3>
                        <h3>Questions</h3>
                    </div>
                    <div className="md:flex flex-row-reverse justify-between my-10">
                        <div className="mb-10">
                            <BlackButtons text="Get in touch"/>
                        </div>
                        <h5>you can also send us a plain email if you want too ;{')'} hello@360ads.ng</h5>
                    </div>
                </div>
            </section>
            <Faqs/>
        </>
    )
}

export default Faq;