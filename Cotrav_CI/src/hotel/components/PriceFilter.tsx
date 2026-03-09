
import { useEffect, useState } from "react";
import { ui, icons, filterTypes, hotelHooks } from "@/index";

export const PriceFilter: React.FC<filterTypes.PriceFilterProps> = ({
  hotels,
  priceRange,
  onPriceChange,
  onBucketsChange,
  selectedPriceBuckets = [],
  resetCustomInputs = false
}) => {
  
  // ✅ Local state for custom input fields - EMPTY by default
  const [minInput, setMinInput] = useState("");
  const [maxInput, setMaxInput] = useState("");
  const [priceError, setPriceError] = useState<string>("");
  
  // ✅ Track if user is using custom input mode
  const [isCustomMode, setIsCustomMode] = useState(false);

  // ✅ Track selected buckets for multi-select
  const [selectedBuckets, setSelectedBuckets] = useState<string[]>([]);

  const { priceBuckets, minPrice, maxPrice } = hotelHooks.usePriceFilter(hotels, priceRange);

  useEffect(() => {
  setSelectedBuckets(selectedPriceBuckets);
}, [selectedPriceBuckets]);

// ✅ Clear everything when back to full range
useEffect(() => {
  if (priceRange[0] === minPrice && priceRange[1] === maxPrice) {
    setSelectedBuckets([]);
    setIsCustomMode(false);
    setMinInput("");
    setMaxInput("");
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [priceRange[0], priceRange[1], minPrice, maxPrice]);

useEffect(() => {
    if (resetCustomInputs) {
      setIsCustomMode(false);
      setMinInput("");
      setMaxInput("");
    }
  }, [resetCustomInputs]);

// ✅ ADD THIS NEW useEffect - Clear custom mode when buckets are selected
useEffect(() => {
  if (selectedPriceBuckets.length > 0 && isCustomMode) {
    setIsCustomMode(false);
    setMinInput("");
    setMaxInput("");
  }
}, [selectedPriceBuckets.length, isCustomMode]);

// ✅ ADD THIS NEW useEffect - Detect when custom price was removed from Applied Filters
useEffect(() => {
  // If we're in custom mode but the price range has been reset externally
  if (isCustomMode && priceRange[0] === minPrice && priceRange[1] === maxPrice) {
    setIsCustomMode(false);
    setMinInput("");
    setMaxInput("");
  }
}, [isCustomMode, priceRange, minPrice, maxPrice]);
  
  // ✅ Check if we're at full range (for display logic only)
  const isAtFullRange = priceRange[0] === minPrice && priceRange[1] === maxPrice;

  // ✅ Check if Apply button should be enabled
  const canApplyCustomRange = minInput || maxInput;

  // ✅ Handle checkbox toggle for multiple selections
  const handleBucketToggle = (bucket: filterTypes.PriceBucket) => {
    // ✅ Exit custom mode when selecting buckets
    setIsCustomMode(false);
    setMinInput("");
    setMaxInput("");
    
    const isSelected = selectedBuckets.includes(bucket.range);
    let newSelected: string[];
    
    if (isSelected) {
      // Deselect this bucket
      newSelected = selectedBuckets.filter(range => range !== bucket.range);
      
      // If no buckets selected, reset to full range
      if (newSelected.length === 0) {
        setSelectedBuckets([]);
        onBucketsChange?.([]);
        onPriceChange([minPrice, maxPrice]);
        return;
      }
      
      // Calculate combined range from remaining selected buckets
      const remainingBuckets = priceBuckets.filter(b => newSelected.includes(b.range));
      const newMin = Math.min(...remainingBuckets.map(b => b.min));
      const newMax = Math.max(...remainingBuckets.map(b => b.max));
      
      setSelectedBuckets(newSelected);
      onBucketsChange?.(newSelected);
      onPriceChange([newMin, newMax]);
    } else {
      // Select this bucket
      newSelected = [...selectedBuckets, bucket.range];
      
      // Calculate combined range from all selected buckets
      const allSelectedBuckets = priceBuckets.filter(b => newSelected.includes(b.range));
      const newMin = Math.min(...allSelectedBuckets.map(b => b.min));
      const newMax = Math.max(...allSelectedBuckets.map(b => b.max));
      
      setSelectedBuckets(newSelected);
      onBucketsChange?.(newSelected);
      onPriceChange([newMin, newMax]);
    }
  };

  // ✅ Handle input change - just update local state, don't apply yet
  // const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setMinInput(value);
    
  //   // Clear bucket selections when user starts typing
  //   if (value && selectedBuckets.length > 0) {
  //     setSelectedBuckets([]);
  //     onBucketsChange?.([]);
  //   }
  // };

  // const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setMaxInput(value);
    
  //   // Clear bucket selections when user starts typing
  //   if (value && selectedBuckets.length > 0) {
  //     setSelectedBuckets([]);
  //     onBucketsChange?.([]);
  //   }
  // };


  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  setMinInput(value);
  setPriceError(""); // ✅ Clear error when user types
  
  if (value && selectedBuckets.length > 0) {
    setSelectedBuckets([]);
    onBucketsChange?.([]);
  }
};

const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  setMaxInput(value);
  setPriceError(""); // ✅ Clear error when user types
  
  if (value && selectedBuckets.length > 0) {
    setSelectedBuckets([]);
    onBucketsChange?.([]);
  }
};

  // ✅ NEW: Apply custom range when button is clicked
  // const handleApplyCustomRange = () => {
  //   if (!minInput && !maxInput) return;

  //   const minValue = minInput ? parseInt(minInput) : minPrice;
  //   const maxValue = maxInput ? parseInt(maxInput) : maxPrice;
    
  //   // Clamp values
  //   const clampedMin = Math.max(minPrice, Math.min(minValue, maxValue));
  //   const clampedMax = Math.max(clampedMin, Math.min(maxValue, maxPrice));
    
  //   // Update input fields with clamped values
  //   setMinInput(clampedMin.toString());
  //   setMaxInput(clampedMax.toString());
    
  //   // Apply the filter
  //   setIsCustomMode(true);
  //   onPriceChange([clampedMin, clampedMax]);
  // };


  const handleApplyCustomRange = () => {
  if (!minInput && !maxInput) return;

  const minValue = minInput ? parseInt(minInput) : minPrice;
  const maxValue = maxInput ? parseInt(maxInput) : maxPrice;
  
  // ✅ VALIDATION: Check if max < min
  if (minInput && maxInput && maxValue < minValue) {
    setPriceError("Entered price range is not valid");
    return; // Don't apply the filter
  }
  
  // Clear error if validation passes
  setPriceError("");
  
  // Clamp values within bounds
  const clampedMin = Math.max(minPrice, minValue);
  const clampedMax = Math.min(maxValue, maxPrice);
  
  // Update input fields with clamped values
  setMinInput(clampedMin.toString());
  setMaxInput(clampedMax.toString());
  
  // Apply the filter
  setIsCustomMode(true);
  onPriceChange([clampedMin, clampedMax]);
};

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleApplyCustomRange();
    }
  };

  return (
    <div className="space-y-3">
      <ui.Label className="text-md font-semibold text-gray-700 flex items-center gap-2 mb-0">
        <icons.IndianRupee className="w-4 h-4 text-[#0B5CAD]" />
        Price Per Night
      </ui.Label>
      
      {/* ✅ CHECKBOX LIST - Disabled when custom range is applied */}
      <div className={`space-y-2 transition-opacity ${isCustomMode ? 'opacity-40 pointer-events-none' : ''}`}>
        {priceBuckets.map((bucket) => (
          <div 
            key={bucket.label} 
            className="flex items-center space-x-2 p-2 rounded hover:bg-[#0B5CAD]/5 transition-colors"
          >
            <ui.Checkbox
              id={`price-${bucket.label}`}
              checked={selectedBuckets.includes(bucket.range) && !isCustomMode}
              onCheckedChange={() => handleBucketToggle(bucket)}
              disabled={isCustomMode}
              className="border-[#0B5CAD] data-[state=checked]:bg-[#0B5CAD] data-[state=checked]:border-[#0B5CAD] data-[state=checked]:text-white cursor-pointer disabled:opacity-50"
            />
            <ui.Label
              htmlFor={`price-${bucket.label}`}
              className={`text-sm text-gray-500 font-medium cursor-pointer flex items-center justify-between flex-1 ${isCustomMode ? 'cursor-not-allowed' : ''}`}
            >
              <span>{bucket.range}</span>
              <span className="text-xs text-gray-500">({bucket.count || 0})</span>
            </ui.Label>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-3" />

      {/* ✅ Custom Input Fields with APPLY button */}
      <div>
  <p className="text-xs text-gray-600 mb-2 font-medium">Or Enter Custom Range:</p>
  <div className="space-y-3">
    {/* ✅ Single row with inputs and button */}
    <div className="flex items-end gap-2">
      <div className="flex-1">
        <label className="text-xs text-gray-500 mb-1 block">Min/Night</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">₹</span>
          <ui.Input
            type="number"
            value={minInput}
            onChange={handleMinInputChange}
            onKeyDown={handleKeyDown}
            // className="pl-7 text-sm border-gray-300 focus:border-[#0B5CAD] focus:ring-[#0B5CAD] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            className={`pl-7 text-sm focus:border-[#0B5CAD] focus:ring-[#0B5CAD] 
  ${priceError ? 'border-red-500' : 'border-gray-300'}
  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
            min={minPrice}
            max={maxPrice}
            placeholder={"Min"}
          />
        </div>
      </div>
      
      <div className="flex-1">
        <label className="text-xs text-gray-500 mb-1 block">Max/Night</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">₹</span>
          <ui.Input
            type="number"
            value={maxInput}
            onChange={handleMaxInputChange}
            onKeyDown={handleKeyDown}
            // className="pl-7 text-sm border-gray-300 focus:border-[#0B5CAD] focus:ring-[#0B5CAD] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            className={`pl-7 text-sm focus:border-[#0B5CAD] focus:ring-[#0B5CAD] 
  ${priceError ? 'border-red-500' : 'border-gray-300'}
  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
            // min={minPrice}
            min={minInput ? parseInt(minInput) : minPrice}  // CHANGE THIS LINE (make it dynamic)
  max={maxPrice}  
            placeholder={"Max"}
          />
        </div>
      </div>
      
      {/* ✅ ICON BUTTON - Check icon instead of text */}
      <ui.Button
        onClick={handleApplyCustomRange}
        disabled={!canApplyCustomRange}
        className="bg-[#0B5CAD] hover:bg-[#094B8A] text-white font-semibold p-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        <icons.Check className="w-5 h-5" />
      </ui.Button>
    </div>
    
    {/* ✅ ERROR MESSAGE */}
{priceError && (
  <p className="text-xs text-red-500 flex items-center gap-1">
    <icons.AlertCircle className="w-3 h-3" />
    {priceError}
  </p>
)}
    
    {isCustomMode && (
      <p className="text-xs text-[#0B5CAD] flex items-center gap-1">
        <icons.CheckCircle className="w-3 h-3" />
        Custom range applied
      </p>
    )}
  </div>
</div>

      {/* ✅ Current Filter Display - Only show when filtered */}
      {(priceRange[0] !== minPrice || priceRange[1] !== maxPrice) && (
        <div className="text-center text-xs font-semibold text-white bg-gradient-to-r from-[#0B5CAD] to-[#094B8A] p-2.5 rounded-lg shadow-sm">
          ₹{priceRange[0].toLocaleString('en-IN')} - ₹{priceRange[1].toLocaleString('en-IN')}/night
        </div>
      )}
    </div>
  );
};
