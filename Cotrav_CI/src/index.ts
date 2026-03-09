export { useEffect, useState } from "react";

// Exporting Utilities
export { storage } from './libs/storage';

// Hotel Utils
export * as hotelUtils from './hotel/utils/hotel.utils'
export * as alertUtils from './hotel/utils/alert.utils'
export * as amenitiesUtils from './hotel/utils/amenities.utils'
export * as dateFormatterUtils from './hotel/utils/dateFormatter.utils'
export * as timeFormatter from './hotel/utils/timeFormatter.utils'
export * as searchParamsUtils from './hotel/utils/normalizeHotelSearchParams.utils'
export { cleanTextArray } from '@/hotel/utils/text/sanitizeText.utils';
export * as filterUtils from '@/hotel/utils/filter.utils'
export {formatINR}from '@/hotel/utils/priceFormatter.utils'

 
// Exporting Apis
export * as hotelApi from './hotel/api/hotel.api'
export * as peopleApi from './hotel/api/people.api'

// Exporting Types
export * as hotelTypes from './hotel/types/hotel'
export * as searchHotelFormTypes from './hotel/types/form.types'
export * as peopleType from './hotel/types/people'
export * as hotelDetailsTypes from './hotel/types/hotelDetail.types'
export * as guestDetailsTypes from './hotel/types/guestDetailsForm.types'
export * as bookingTypes from './hotel/types/booking.types'
export * as formTypes from './hotel/types/form.types'
export * as filterTypes from './hotel/types/filter.types'


// Exporting Hooks
export * as hotelHooks from './hotel/hooks/index'

// Exporting Components
export * as loader from './hotel/components/loader/index'
export * as components from './hotel/components/index'
export * as responsive from '@/hotel/components/responsive/index'

// Exporting Modals 
export * as modals from './hotel/components/modals/index'

// Exporting Pages
export * as pages from './hotel/pages/index'
export * as opsMgmtPages from './OPS-MGMT/pages/index'

// Shadcn -ui components
export * as ui from './components/ui/index'

// Exporting icons
export * as icons from './components/icons/index'



// src/index.ts
export { useMapLoader } from './contexts/MapContext';
export { default as MapProvider } from './providers/MapProvider';

// contants
export * as constants from './hotel/constants/index'
