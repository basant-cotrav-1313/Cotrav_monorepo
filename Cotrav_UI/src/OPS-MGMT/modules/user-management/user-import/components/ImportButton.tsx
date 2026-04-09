// type Props = {
//   onClick?: () => void;
// };

// const ImportButton = ({ onClick }: Props) => (
//   <button
//     type="button"
//     onClick={onClick}
//     className="mb-5 flex w-fit items-center gap-2 rounded-lg bg-[#0A7CC5] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#08679f] active:scale-[0.98]"
//   >
//     <svg
//       className="h-4 w-4"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//       strokeWidth={2.2}
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         d="M12 16v-8m0 0-3 3m3-3 3 3M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1"
//       />
//     </svg>
//     Import Users
//   </button>
// );

// export default ImportButton;

type Props = {
  onClick?: () => void;
  isLoading?: boolean;
};

const ImportButton = ({ onClick, isLoading }: Props) => (
  <button
    type="button"
    onClick={onClick}
    disabled={isLoading}
    className="mb-5 flex w-fit items-center gap-2 rounded-lg bg-[#0A7CC5] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#08679f] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
  >
    {isLoading ? (
      <>
        <svg
          className="h-4 w-4 animate-spin"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12" cy="12" r="10"
            stroke="currentColor"
            strokeWidth="2.2"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
        Importing...
      </>
    ) : (
      <>
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 16v-8m0 0-3 3m3-3 3 3M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1"
          />
        </svg>
        Import Users
      </>
    )}
  </button>
);

export default ImportButton;