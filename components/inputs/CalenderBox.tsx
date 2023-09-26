"use client"
import Calendar from "react-calendar";
import {useState} from 'react'
import { MdOutlineCancel } from "react-icons/md";

const CalenderBox = ({addDate, selectedDate, removeDate}:CalenderBoxProps) => {

    const [value, onChange] = useState<valuePiece | [valuePiece, valuePiece]>(
        new Date()
      );


  return (
    <div className="flex w-full">
    <Calendar
      onChange={(value) => {
        onChange;
        addDate(value);
      }}
      className={`shadow-lg rounded-l-10 basis-[67%] md:basis-[70%]`}
      value={value}
    />
    <div className="bg-white overflow-y-scroll basis-[33%] md:basis-[30%] selectedDate h-[19rem] px-1 shadow-lg rounded-r-10 w-full">
      <p className="text-stone-400 text-center text-sm">
        Seleted days
      </p>
      <div>
        {selectedDate?.map((date, i) => (
          <div
            key={i}
            className="flex p-1 rounded justify-center text-sm bg-[#006edc] text-white my-1"
          >
            <span className="px-1 basis-9/12">
              {date?.toLocaleDateString()}
            </span>
            <button onClick={() => removeDate(date)}>
              <MdOutlineCancel />
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
  )
}

export default CalenderBox