import { useMemo, useState } from "react";
import CompanyDropdown from "../components/CompanyDropdown";
import DatePickerBox from "../components/DatePickerBox";

type BookingType = "one-way" | "return";
type CabinClass = "Economy class" | "Premium economy" | "Business class" | "First class";

const Flight: React.FC = () => {
  const [bookingType, setBookingType] = useState<BookingType>("one-way");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState<Date | null>(new Date());
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [travellersOpen, setTravellersOpen] = useState(false);
  const [travelClass, setTravelClass] = useState<CabinClass>("Economy class");
  const [travellerCounts, setTravellerCounts] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const [touched, setTouched] = useState(false);

  const today = new Date();
  const totalTravellers = travellerCounts.adults + travellerCounts.children + travellerCounts.infants;
  const infantsMoreThanAdults = travellerCounts.infants > travellerCounts.adults;
  const exceedsPassengerLimit = totalTravellers > 9;

  const showOriginError = touched && !origin.trim();
  const showDestinationError = touched && !destination.trim();
  const showDepartureError = touched && !departureDate;
  const showReturnError = touched && bookingType === "return" && !returnDate;
  const canSearch =
    !showOriginError &&
    !showDestinationError &&
    !showDepartureError &&
    !showReturnError &&
    !infantsMoreThanAdults &&
    !exceedsPassengerLimit;

  const travellersSummary = useMemo(
    () =>
      `Adult: ${travellerCounts.adults}, Child: ${travellerCounts.children}, Infant: ${travellerCounts.infants}, Cabinclass: ${travelClass}`,
    [travellerCounts, travelClass]
  );

  const adjustTraveller = (key: "adults" | "children" | "infants", delta: number) => {
    setTravellerCounts((prev) => {
      const next = { ...prev, [key]: Math.max(0, prev[key] + delta) };
      if (key === "adults" && next.adults < 1) next.adults = 1;
      return next;
    });
  };

  const swapLocations = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  const handleSearch = () => {
    setTouched(true);
    if (!canSearch) return;
    // TODO: wire to search endpoint/navigation when flight search flow is finalized.
    // Keeping this non-destructive for now to restore form behavior and validation.
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg pt-3 pb-12 px-6">
      <div className="flex gap-2 mb-3">
        <button
          type="button"
          onClick={() => {
            setBookingType("one-way");
            setReturnDate(null);
          }}
          className={`px-4 py-1 rounded-sm font-semibold text-sm ${
            bookingType === "one-way" ? "bg-[#0B5CAD] text-white" : "bg-gray-100"
          }`}
        >
          One-Way
        </button>
        <button
          type="button"
          onClick={() => setBookingType("return")}
          className={`px-5 py-1 rounded-sm font-semibold text-sm ${
            bookingType === "return" ? "bg-[#0B5CAD] text-white" : "bg-gray-100"
          }`}
        >
          Return
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 border rounded-xl overflow-visible bg-white">
        <div className="lg:col-span-2 border-r">
          <CompanyDropdown onSelect={() => {}} />
        </div>

        <div className="p-4 border-r lg:col-span-2">
          <p className="text-[10px] font-medium text-gray-500">FROM</p>
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            placeholder="Enter city"
            className="text-sm font-medium text-gray-900 w-full focus:outline-none"
          />
          {showOriginError && (
            <p className="text-xs text-red-600 mt-1">Please select Origin</p>
          )}
        </div>

        {bookingType === "return" && (
          <div className="p-4 border-r lg:col-span-1 flex items-center justify-center">
            <button
              type="button"
              onClick={swapLocations}
              className="h-9 w-9 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-50"
              aria-label="Swap origin and destination"
            >
              ⇄
            </button>
          </div>
        )}

        <div className="p-4 border-r lg:col-span-2">
          <p className="text-[10px] font-medium text-gray-500">TO</p>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Enter city"
            className="text-sm font-medium text-gray-900 w-full focus:outline-none"
          />
          {showDestinationError && (
            <p className="text-xs text-red-600 mt-1">Please select Destination</p>
          )}
        </div>

        <div className="lg:col-span-2 border-r">
          <DatePickerBox
            label="DEPARTURE"
            value={departureDate}
            minDate={today}
            onChange={(date) => {
              setDepartureDate(date);
              if (returnDate && date > returnDate) {
                setReturnDate(null);
              }
            }}
          />
          {showDepartureError && (
            <p className="text-xs text-red-600 px-4 pb-2 -mt-1">Please select Departure Date</p>
          )}
        </div>

        <div className="lg:col-span-2 border-r">
          <DatePickerBox
            label="RETURN"
            value={returnDate}
            onChange={(date) => setReturnDate(date)}
            minDate={departureDate ?? today}
            disabled={!departureDate || bookingType === "one-way"}
          />
          {showReturnError && (
            <p className="text-xs text-red-600 px-4 pb-2 -mt-1">Please select Return Date</p>
          )}
        </div>

        <div className="p-4 lg:col-span-3 relative">
          <p className="text-[10px] font-medium text-gray-500">TRAVELLERS & CLASS</p>
          <button
            type="button"
            onClick={() => setTravellersOpen((prev) => !prev)}
            className="text-sm font-medium text-left text-gray-900 w-full"
          >
            {travellersSummary}
          </button>

          {travellersOpen && (
            <div className="absolute left-0 right-0 top-full mt-2 z-40 bg-white border border-slate-200 rounded-xl shadow-xl p-4">
              <div className="space-y-3">
                {(["adults", "children", "infants"] as const).map((key) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm font-medium capitalize">{key}</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="h-7 w-7 rounded border border-slate-300"
                        onClick={() => adjustTraveller(key, -1)}
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-sm">{travellerCounts[key]}</span>
                      <button
                        type="button"
                        className="h-7 w-7 rounded border border-slate-300"
                        onClick={() => adjustTraveller(key, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
                <div className="pt-2">
                  <label className="text-xs font-semibold text-gray-500">CABIN CLASS</label>
                  <select
                    className="mt-1 w-full border border-slate-300 rounded-lg px-2 py-2 text-sm"
                    value={travelClass}
                    onChange={(e) => setTravelClass(e.target.value as CabinClass)}
                  >
                    <option>Economy class</option>
                    <option>Premium economy</option>
                    <option>Business class</option>
                    <option>First class</option>
                  </select>
                </div>
                <button
                  type="button"
                  className="w-full mt-2 bg-[#0B5CAD] text-white rounded-lg py-2 text-sm font-semibold"
                  onClick={() => setTravellersOpen(false)}
                >
                  Done
                </button>
              </div>
            </div>
          )}

          {exceedsPassengerLimit && (
            <p className="text-xs text-red-600 mt-1">Please select maximum 9 passenger</p>
          )}
          {infantsMoreThanAdults && (
            <p className="text-xs text-red-600 mt-1">Number of infants cannot be more than adults</p>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={handleSearch}
          className="bg-[#0B5CAD] hover:bg-[#094B8A] text-white px-14 py-4 rounded-full font-semibold shadow-xl tracking-wide"
        >
          SEARCH
        </button>
      </div>
    </div>
  );
};

export default Flight;
