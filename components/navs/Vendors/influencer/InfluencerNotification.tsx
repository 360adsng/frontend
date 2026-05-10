const noticeBell = "/images/noticebell.png";

const InfluencerNotification = () => {
  const data: unknown[] = [];
  return (
    <div>
      {data.length > 0 ? null : (
        <div className="text-center w-11/12 md:w-8/12 mx-auto my-16">
          <img alt="" src={noticeBell} />
          <h2 className="font-bold">You don&apos;t have any notifications!</h2>
          <p className="text-gray-500">
            But as soon as something happens, you&apos;ll find it right here.
          </p>
        </div>
      )}
    </div>
  );
};

export default InfluencerNotification;
