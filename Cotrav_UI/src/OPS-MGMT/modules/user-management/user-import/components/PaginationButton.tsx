type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
};

const PaginationButton = ({ active, disabled, children, ...props }: Props) => (
  <button
    type="button"
    disabled={disabled}
    className={`inline-flex h-7 min-w-[28px] items-center justify-center rounded-md px-2 text-xs font-medium transition-colors
      ${
        active
          ? "bg-[#0B0E2D] text-white"
          : disabled
          ? "text-slate-300 cursor-not-allowed"
          : "text-slate-600 hover:bg-slate-100"
      }`}
    {...props}
  >
    {children}
  </button>
);

export default PaginationButton;