
const Tooltip = ({info}:{info:string}) => {
  return (
    <div className="absolute w-[150px] rounded-10 p-1 top-0 left-0 bg-ads360-hash text-xs">
        {info}
    </div>
  )
}

export default Tooltip