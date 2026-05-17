const bell = "/icons/bell.svg";

type Props = {
  count: number;
  className?: string;
};

export function NotificationNavBell({ count, className }: Props) {
  const label = count > 99 ? "99+" : String(count);
  return (
    <>
      {count > 0 ? (
        <span
          className="absolute -top-[5px] -left-[2px] min-w-[18px] px-1 bg-ads360yellow-100 rounded-[50%] text-[10px] leading-4 text-center text-white"
          aria-hidden
        >
          {label}
        </span>
      ) : null}
      <img src={bell} alt="" className={className} aria-hidden />
    </>
  );
}
