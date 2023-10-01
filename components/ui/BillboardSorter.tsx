import Image from 'next/image'
import React from 'react'

import cancel from "@public/icons/usericon/modalCancelBotton.svg";

const BillboardSorter = ({toggleModal, modal}:{toggleModal:()=>void, modal:boolean}) => {
  return (
    <div>
    <div className="flex justify-between">
    <p>Filter billboard</p>

    {modal === true &&
    <button onClick={toggleModal}>
      <Image
        src={cancel}
        width={0}
        height={0}
        alt="modal cancel botton"
        className="w-5"
      />
    </button>
  }
    </div>

    <div className="my-2">
    <p>Billboard Type</p>
    <select defaultValue='select' className="p-2 border focus:outline-none rounded w-full">
        <option disabled>select</option>
        <option>Double faced Gantry LED</option>
        <option>Single faced Gantry LED</option>
        <option>Double faced Gantry LED</option>
    </select>
    </div>

    <div className="my-2">
    <p>Price Range</p>
    <div className="flex justify-between space-x-1">
        <div className="basis-1/2">
        <label>from:</label>
        <input
            type="number"
            className="rounded w-full border focus:outline-none p-2"
        />
        </div>

        <div className="basis-1/2">
        <label>to:</label>
        <input
            type="number"
            className="rounded w-full border focus:outline-none p-2"
        />
        </div>
    </div>
    </div>

    <div className="my-2">
    <p>Location</p>
    <input
        list="location"
        name="browser"
        id="browser"
        className="border focus:outline-none rounded w-full p-2"
    />

    <datalist id="location" className="">
        <option value="Ikeja" />
        <option value="ikotun" />
        <option value="port harcourt" />
        <option value="abuja" />
        <option value="victoria island" />
    </datalist>
    </div>

    <div className="my-2">
    <p>Status</p>
    <select className="p-2 border focus:outline-none rounded w-full">
        <option>Negotiable</option>
        <option>Non Negotiable</option>
    </select>
    </div>
    <button 
      className='bg-ads360black-100/95 hover:bg-ads360black-100 rounded mt-5  text-white  w-2/6 h-10'>
      Search
  </button>
</div>
  )
}

export default BillboardSorter