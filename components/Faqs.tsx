"use client"
import { useState } from 'react'
import { FaAngleDown } from 'react-icons/fa'

const Faqs = () =>{

    const questions = [
        {
            questions:'How are the ads runned?',
            answers:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
            questions:'Can I negotiate prices of ads on this platform?',
            answers:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt'
        },
        {
            questions:'Where is the 360 ads located?',
            answers:'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat'
        },
        {
            questions:'Is there a mobile app?',
            answers:'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
        },
        {
            questions:'How long is the verification process after registration?',
            answers:'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga'
        },
        {
            questions:'How can i fund my wallet?',
            answers:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt'
        },
        {
            questions:'Who are 360 ads sponsors?',
            answers:'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
        },
    ]

    const [index, setIndex] = useState<Number>()

    const handleAnswers = (value:number) => {
        if(index === value){
            setIndex(undefined)
        }else{
            setIndex(value)
        }
        }


    return(
        <>
            <section className="bg-ads360light-100 pb-24">
                <div className="md:w-8/12 w-11/12 mx-auto  bg-white rounded-10 shadow-md">
                    {questions.map((item, i)=>(
                        <div key={i} className={`p-4 ${questions.length !== i+1 && 'border-b border-ads360black-50'}`}>
                            <div className="flex justify-between">
                                {item.questions}
                                <div>
                                    <button onClick={()=>handleAnswers(i)}>
                                        <FaAngleDown size={23} className="text-ads360black-50"/>
                                    </button>
                                </div>
                            </div>
                            <div style={{transition:'max-height 1s'}} className={`overflow-hidden transition duration-700 ease-out ${index === i ?'max-h-[250px]':'max-h-0'}`}>
                                {item.answers}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}

export default Faqs;