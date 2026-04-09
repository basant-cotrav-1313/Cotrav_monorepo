type Props = {
  direction: "asc" | "desc" | false;
};

const SortIcon = ({ direction }: Props) => {
  if (!direction)
    return (
      <span className="ml-1 inline-flex flex-col gap-[2px] opacity-30">
        <span className="block h-0 w-0 border-x-[4px] border-b-[5px] border-x-transparent border-b-slate-500" />
        <span className="block h-0 w-0 border-x-[4px] border-t-[5px] border-x-transparent border-t-slate-500" />
      </span>
    );

  return direction === "asc" ? (
    <span className="ml-1 inline-flex opacity-80">
      <span className="block h-0 w-0 border-x-[4px] border-b-[5px] border-x-transparent border-b-[#0B0E2D]" />
    </span>
  ) : (
    <span className="ml-1 inline-flex opacity-80">
      <span className="block h-0 w-0 border-x-[4px] border-t-[5px] border-x-transparent border-t-[#0B0E2D]" />
    </span>
  );
};

export default SortIcon;