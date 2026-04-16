;
const tick2 = '/icons/tick2.svg'
const tick3 = '/icons/tick3.svg'

const Tick = ({ attachmentType, setAttachmentType, label, asset }: TickProp) => {
  return (
    <div className="flex space-x-3">
      {attachmentType === asset ? (
        <img height={17} width={17} alt="tick2" src={tick3} />
      ) : (
        <img
          height={17}
          width={17}
          alt="tick2"
          src={tick2}
          onClick={() => setAttachmentType(asset)}
        />
      )}
      <span>{label}</span>
    </div>
  );
};

export default Tick;
