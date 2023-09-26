import Image from "next/image";
import tick2 from "@public/icons/tick2.svg";
import tick3 from "@public/icons/tick3.svg";

const Tick = ({ attachmentType, setAttachmentType, label, asset }: TickProp) => {
  return (
    <div className="flex space-x-3">
      {attachmentType === asset ? (
        <Image height={17} width={17} alt="tick2" src={tick3} />
      ) : (
        <Image
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
