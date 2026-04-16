import React from 'react'

const Checkbox = ({id, onClick, label}:CheckboxProps) => {
  return (
    <div id={id} className="flex gap-2">
        <input onChange={(e)=>onClick(e, label)} type="checkbox" 
        className="relative peer shrink-0
        appearance-none w-4 h-4 border-2 border-ads360yellowBtn-100 rounded-sm bg-white
        mt-1
        checked:bg-ads360yellowBtn-100 checked:border-0
        focus:outline-none focus:ring-offset-0 focus:ring-2 focus:ring-blue-100
        disabled:border-steel-400 disabled:bg-steel-400"
        />
        <label htmlFor={id}> {label}</label>
        <svg
            className="
                absolute 
                w-4 h-4 mt-1
                hidden peer-checked:block
                pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            >
            <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
    </div>
  )
}

export default Checkbox