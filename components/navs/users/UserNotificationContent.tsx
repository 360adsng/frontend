import Image from "next/image"
import noticeBell from '@public/images/noticebell.png'


const UserNotificationContent = () => {
  const data = []
  return (
    <div>
      {data.length > 0 ?
      ''
      :
      <div className="text-center w-11/12 md:w-8/12 mx-auto my-16">
        <Image
          alt=""
          src={noticeBell}
        />
        <h2 className="font-bold">You don't have any notifications!</h2>
        <p className="text-gray-500">But as soon as something happens, you'll find it right here.</p>
      </div>
      
      }
    </div>
  )
}

export default UserNotificationContent