"use client"
import FilesInput from "@components/inputs/FilesInput"
import { Modal } from "@components/modal/modal"
import { useState } from "react"
import { useRouter } from "next/navigation";


const Add = () => {

  const [successfull, setSuccessfull] = useState(false);
  const router = useRouter()
  const handleSubmitTemp = (e:React.FormEvent) => {
    e.preventDefault()
    setSuccessfull(true)
  }

  return (
    <>
    <section className='min-h-screen bg-ads360-hash px-4 md:px-10 py-14'>
        <div className="md:flex">
            <div className="basis-6/12 px-5">
                <form>
                <div className="my-3">
                    <p>Billboard name</p>
                    <input className="bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]"/>
                </div>
                <div className="my-3">
                    <p>Set Price</p>
                    <input className="bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]"/>
                </div>
                <div className="my-3">
                    <p>Location</p>
                    <input className="bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]"/>
                </div>
                <div className="my-3">
                    <p>Board Type</p>
                    <input className="bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]"/>
                </div>
                <div className="my-3">
                    <p>Dimention</p>
                    <div className="flex space-x-3">
                    <div className="basis-1/2">
                        <input placeholder="width" className="bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]"/>
                    </div>
                    <div className="basis-1/2">
                        <input placeholder="height" className="bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]"/>
                    </div>
                    </div>
                </div>
                <div className="my-3">
                    <p>Orientation</p>
                    <select className="bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]">
                        <option>select</option>
                        <option>Potrait</option>
                        <option>Landscape</option>
                    </select>
                </div>
                <div className="my-3">
                    <p>Image</p>
                <FilesInput
                    previewName={''}
                    accept="image"
                    handleChange={()=>{}}
                    warning="Require image size"
              />
                </div>

                <div>
                    <button onClick={handleSubmitTemp} className={`bg-ads360black-100/95 hover:bg-ads360black-100 rounded mt-5  text-white p-2`}>
                        Send Request
                    </button>
                </div>
                </form>
            </div>
            <div className="basis-6/12 p-5">
                <div className="bg-white w-11/12 h-60 rounded-10">

                </div>
            </div>
        </div>
    </section>
    <Modal isOpen={successfull}>
    <div className="bg-white py-5 w-11/12 md:w-1/3 lg:w-1/4 mx-auto rounded-10 grid grid-cols-1 content-center">
        <p className="text-green-500 border-b text-center font-semibold">
          Billboard Added Successfully
        </p>
        <p className="text-center py-5 border-b">
          Do you want to add another board
        </p>
        <div className="flex justify-end space-x-2 p-3">

            <button onClick={()=>setSuccessfull(false)} className={`rounded bg-green-600 text-white p-2`}>
                Add Billboard
            </button>
            <button onClick={()=>router.push('/vendors/billboards/listing')} className={`rounded bg-ads360yellow-100 p-2`}>
                No
            </button>

        </div>
      
      <div>
        
      </div>
    </div>
  </Modal>
    </>
  )
}

export default Add