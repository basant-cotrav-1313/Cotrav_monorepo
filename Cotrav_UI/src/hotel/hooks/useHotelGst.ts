// import { useState, useEffect } from 'react';
// import axios from 'axios';

// // ─── Types ────────────────────────────────────────────────────────────────────

// export interface GSTDetails {
//   gstNo: string;
//   cName: string;
//   cAddr: string;
//   contactNo: string;
//   email: string;
// }

// export interface UseHotelGSTReturn {
//   // Data from APIs
//   taxivaxiGST: GSTDetails | null;       // From getTaxivaxiGst  (your default)
//   clientGST: GSTDetails | null;         // From getClientGst    (client's saved GST)

//   // UI state
//   isClientGSTSelected: boolean;         // User checked the "Use Client GST" checkbox
//   showManualGSTForm: boolean;           // User checked "I have a GST Number"
//   manualGSTDetails: GSTDetails;         // What user typed in manual form
//   gstLoading: boolean;
//   bothEmpty: boolean;                   // True when both APIs returned empty

//   // Handlers
//   setIsClientGSTSelected: (val: boolean) => void;
//   setShowManualGSTForm: (val: boolean) => void;
//   handleManualGSTChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

//   // Final resolved GST to send in booking payload
//   resolvedGST: GSTDetails | null;
// }

// // ─── Hook ─────────────────────────────────────────────────────────────────────

// export const useHotelGST = (searchParams: Record<string, any>): UseHotelGSTReturn => {

//   const [taxivaxiGST, setTaxivaxiGST] = useState<GSTDetails | null>(null);
//   const [clientGST, setClientGST] = useState<GSTDetails | null>(null);
//   const [gstLoading, setGstLoading] = useState(false);

//   // UI state
//   const [isClientGSTSelected, setIsClientGSTSelected] = useState(false);
//   const [showManualGSTForm, setShowManualGSTForm] = useState(false);
//   const [manualGSTDetails, setManualGSTDetails] = useState<GSTDetails>({
//     gstNo: '',
//     cName: '',
//     cAddr: '',
//     contactNo: '',
//     email: '',
//   });

//   // ─── Fetch both GST APIs on mount ────────────────────────────────────────

//   useEffect(() => {
//     const fetchGSTDetails = async () => {
//       const bookingId = searchParams?.booking_id;
//       const clientId = searchParams?.admin_id;

//       if (!bookingId && !clientId) {
//         console.log('[useHotelGST] No booking_id or client_id found in searchParams');
//         return;
//       }

//       setGstLoading(true);

//       // Run both requests in parallel
//       const [taxivaxiResult, clientResult] = await Promise.allSettled([
//         bookingId ? fetchTaxivaxiGST(bookingId) : Promise.resolve(null),
//         clientId  ? fetchClientGST(clientId)    : Promise.resolve(null),
//       ]);

//       // Handle getTaxivaxiGst result
//       if (taxivaxiResult.status === 'fulfilled' && taxivaxiResult.value) {
//         setTaxivaxiGST(taxivaxiResult.value);
//         console.log('[useHotelGST] Taxivaxi GST loaded:', taxivaxiResult.value);
//       } else if (taxivaxiResult.status === 'rejected') {
//         console.error('[useHotelGST] Failed to fetch taxivaxi GST:', taxivaxiResult.reason);
//       }

//       // Handle getClientGst result
//       if (clientResult.status === 'fulfilled' && clientResult.value) {
//         setClientGST(clientResult.value);
//         console.log('[useHotelGST] Client GST loaded:', clientResult.value);
//       } else if (clientResult.status === 'rejected') {
//         console.error('[useHotelGST] Failed to fetch client GST:', clientResult.reason);
//       }

//       setGstLoading(false);
//     };

//     fetchGSTDetails();
//   }, [searchParams?.booking_id, searchParams?.client_id]);

//   // ─── Manual GST change handler ────────────────────────────────────────────

//   const handleManualGSTChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;

//     if (name === 'contactNo') {
//       const numericValue = value.replace(/\D/g, '').slice(0, 10);
//       setManualGSTDetails((prev) => ({ ...prev, [name]: numericValue }));
//     } else {
//       setManualGSTDetails((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   // ─── Resolved GST (the one that will be sent in booking payload) ──────────
//   //
//   //  Priority:
//   //    1. Manual GST  — if user checked "I have a GST Number" and filled the form
//   //    2. Client GST  — if user checked the "Use Client GST" checkbox
//   //    3. Taxivaxi GST — default fallback (silent, no user action needed)
//   //    4. null        — if everything is empty (Case 5: advise user to fill)

//   const resolvedGST: GSTDetails | null = (() => {
//     if (showManualGSTForm && manualGSTDetails.gstNo.trim()) {
//       return manualGSTDetails;        // Case 1 — manual wins
//     }
//     if (isClientGSTSelected && clientGST) {
//       return clientGST;               // Case 2 — client GST selected
//     }
//     if (taxivaxiGST) {
//       return taxivaxiGST;             // Case 3 & 4 — default taxivaxi
//     }
//     return null;                      // Case 5 — both empty
//   })();

//   // True only when both APIs returned nothing
//   const bothEmpty = !taxivaxiGST && !clientGST;

//   return {
//     taxivaxiGST,
//     clientGST,
//     isClientGSTSelected,
//     showManualGSTForm,
//     manualGSTDetails,
//     gstLoading,
//     bothEmpty,
//     setIsClientGSTSelected,
//     setShowManualGSTForm,
//     handleManualGSTChange,
//     resolvedGST,
//   };
// };

// // ─── API helpers ──────────────────────────────────────────────────────────────

// /**
//  * Fetches your company's default GST using booking_id.
//  * POST /api/hotels/getTaxivaxiGst  (x-www-form-urlencoded)
//  */
// const fetchTaxivaxiGST = async (bookingId: string): Promise<GSTDetails | null> => {
//   const payload = new URLSearchParams();
//   payload.append('booking_id', String(bookingId));

//   const response = await axios.post(
//     'https://demo.taxivaxi.com/api/hotels/getTaxivaxiGst',
//     payload,
//     { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
//   );

//   console.log('[useHotelGST] getTaxivaxiGst raw response:', response.data);

//   if (response.data?.success === '1' && Array.isArray(response.data?.result) && response.data.result.length > 0) {
//     return mapToGSTDetails(response.data.result[0]);
//   }

//   return null;
// };

// /**
//  * Fetches the client's saved GST using client_id.
//  * POST /api/hotels/getClientGst  (x-www-form-urlencoded)
//  */
// const fetchClientGST = async (clientId: string): Promise<GSTDetails | null> => {
//   const payload = new URLSearchParams();
//   payload.append('client_id', String(clientId));

//   const response = await axios.post(
//     'https://demo.taxivaxi.com/api/hotels/getClientGst',
//     payload,
//     { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
//   );

//   console.log('[useHotelGST] getClientGst raw response:', response.data);

//   if (response.data?.success === '1' && Array.isArray(response.data?.result) && response.data.result.length > 0) {
//     return mapToGSTDetails(response.data.result[0]);
//   }

//   return null;
// };

// /**
//  * Maps raw API response fields to our standard GSTDetails shape.
//  * ⚠️  Adjust field names below if your API returns different keys.
//  */
// const mapToGSTDetails = (raw: any): GSTDetails => ({
//   gstNo:     raw.gst_number   || raw.gstNo     || raw.GSTNumber  || '',
//   cName:     raw.company_name || raw.cName      || raw.CompanyName || '',
//   cAddr:     raw.address      || raw.cAddr      || raw.Address    || '',
//   contactNo: raw.contact_no   || raw.contactNo  || raw.ContactNo  || '',
//   email:     raw.email        || raw.Email      || '',
// });



import { useState, useEffect } from 'react';
import axios from 'axios';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface GSTDetails {
  // Booking payload fields
  gstNo:     string;
  cName:     string;
  cAddr:     string;
  contactNo: string;
  email:     string;
  // ✅ New display-only fields
  entityName: string;   // billing_entity_name — friendly short name
  pan:        string;   // pan_no
  city:       string;   // billing_city
  state:      string;   // billing_state
}

export type GSTSelection = 'taxivaxi' | 'client' | 'manual' | null;

export interface UseHotelGSTReturn {
  taxivaxiGST:        GSTDetails | null;
  clientGST:          GSTDetails | null;
  selectedGSTOption:  GSTSelection;
  showManualGSTForm:  boolean;
  manualGSTDetails:   GSTDetails;
  gstLoading:         boolean;
  bothEmpty:          boolean;
  setSelectedGSTOption:  (val: GSTSelection) => void;
  setShowManualGSTForm:  (val: boolean) => void;
  handleManualGSTChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resolvedGST:        GSTDetails | null;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useHotelGST = (searchParams: Record<string, any>): UseHotelGSTReturn => {

  const [taxivaxiGST, setTaxivaxiGST] = useState<GSTDetails | null>(null);
  const [clientGST, setClientGST]     = useState<GSTDetails | null>(null);
  const [gstLoading, setGstLoading]   = useState(false);

  const [selectedGSTOption, setSelectedGSTOptionState] = useState<GSTSelection>(null);
  const [showManualGSTForm, setShowManualGSTFormState]  = useState(false);
  const [manualGSTDetails, setManualGSTDetails] = useState<GSTDetails>({
    gstNo:      '',
    cName:      '',
    cAddr:      '',
    contactNo:  '',
    email:      '',
    entityName: '',
    pan:        '',
    city:       '',
    state:      '',
  });

  // ─── Fetch both GST APIs on mount ─────────────────────────────────────────

  useEffect(() => {
    const fetchGSTDetails = async () => {
      const bookingId = searchParams?.booking_id;
      const adminId   = searchParams?.admin_id;

      if (!bookingId && !adminId) {
        console.log('[useHotelGST] No booking_id or admin_id found in searchParams');
        return;
      }

      setGstLoading(true);

      const [taxivaxiResult, clientResult] = await Promise.allSettled([
        bookingId ? fetchTaxivaxiGST(bookingId) : Promise.resolve(null),
        adminId   ? fetchClientGST(adminId)     : Promise.resolve(null),
      ]);

      let resolvedTaxivaxi: GSTDetails | null = null;
      let resolvedClient:   GSTDetails | null = null;

      if (taxivaxiResult.status === 'fulfilled' && taxivaxiResult.value) {
        resolvedTaxivaxi = taxivaxiResult.value;
        setTaxivaxiGST(resolvedTaxivaxi);
        console.log('[GST CARD DEBUG]', {
  entityName: resolvedTaxivaxi?.entityName,
  pan:        resolvedTaxivaxi?.pan,
  city:       resolvedTaxivaxi?.city,
  state:      resolvedTaxivaxi?.state,
});
        console.log('[useHotelGST] Taxivaxi GST loaded:', resolvedTaxivaxi);
      } else if (taxivaxiResult.status === 'rejected') {
        console.error('[useHotelGST] Failed to fetch taxivaxi GST:', taxivaxiResult.reason);
      }

      if (clientResult.status === 'fulfilled' && clientResult.value) {
        resolvedClient = clientResult.value;
        setClientGST(resolvedClient);
        console.log('[useHotelGST] Client GST loaded:', resolvedClient);
      } else if (clientResult.status === 'rejected') {
        console.error('[useHotelGST] Failed to fetch client GST:', clientResult.reason);
      }

      // Set default selection
      if (resolvedTaxivaxi) {
        setSelectedGSTOptionState('taxivaxi');
      } else if (resolvedClient) {
        setSelectedGSTOptionState('client');
      } else {
        setSelectedGSTOptionState('manual');
        setShowManualGSTFormState(true);
      }

      setGstLoading(false);
    };

    fetchGSTDetails();
  }, [searchParams?.booking_id, searchParams?.admin_id]);

  // ─── Card selection handler ────────────────────────────────────────────────

  const setSelectedGSTOption = (val: GSTSelection) => {
    setSelectedGSTOptionState(val);
    if (val !== 'manual') {
      setShowManualGSTFormState(false);
    }
  };

  // ─── Manual form toggle ────────────────────────────────────────────────────

  const setShowManualGSTForm = (val: boolean) => {
    const bothEmpty = !taxivaxiGST && !clientGST;
    if (!val && bothEmpty) return; // Cannot close when both empty

    setShowManualGSTFormState(val);

    if (val) {
      setSelectedGSTOptionState('manual');
    } else {
      if (taxivaxiGST)     setSelectedGSTOptionState('taxivaxi');
      else if (clientGST)  setSelectedGSTOptionState('client');
    }
  };

  // ─── Manual GST field change ──────────────────────────────────────────────

  const handleManualGSTChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'contactNo') {
      setManualGSTDetails((prev) => ({ ...prev, [name]: value.replace(/\D/g, '').slice(0, 10) }));
    } else {
      setManualGSTDetails((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ─── Resolved GST ─────────────────────────────────────────────────────────

  const resolvedGST: GSTDetails | null = (() => {
    if (showManualGSTForm && manualGSTDetails.gstNo.trim()) return manualGSTDetails;
    if (selectedGSTOption === 'client'   && clientGST)    return clientGST;
    if (selectedGSTOption === 'taxivaxi' && taxivaxiGST)  return taxivaxiGST;
    return null;
  })();

  const bothEmpty = !taxivaxiGST && !clientGST;

  return {
    taxivaxiGST,
    clientGST,
    selectedGSTOption,
    showManualGSTForm,
    manualGSTDetails,
    gstLoading,
    bothEmpty,
    setSelectedGSTOption,
    setShowManualGSTForm,
    handleManualGSTChange,
    resolvedGST,
  };
};

// ─── API helpers ──────────────────────────────────────────────────────────────

const fetchTaxivaxiGST = async (bookingId: string): Promise<GSTDetails | null> => {
  const payload = new URLSearchParams();
  payload.append('booking_id', String(bookingId));

  const response = await axios.post(
    'https://demo.taxivaxi.com/api/hotels/getTaxivaxiGst',
    payload,
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );

  console.log('[useHotelGST] getTaxivaxiGst raw response:', response.data);

  const raw = response.data?.result;
  if (response.data?.success === '1' && raw) {
    const item = Array.isArray(raw) ? raw[0] : raw;
    if (item) return mapToGSTDetails(item);
  }
  return null;
};

const fetchClientGST = async (adminId: string): Promise<GSTDetails | null> => {
  const payload = new URLSearchParams();
  payload.append('clientid', String(adminId));

  const response = await axios.post(
    'https://demo.taxivaxi.com/api/hotels/getClientGst',
    payload,
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );

  console.log('[useHotelGST] getClientGst raw response:', response.data);

  const raw = response.data?.result;
  if (response.data?.success === '1' && raw) {
    const item = Array.isArray(raw) ? raw[0] : raw;
    if (item) return mapToGSTDetails(item);
  }
  return null;
};

// ─── Field mapper ─────────────────────────────────────────────────────────────

const mapToGSTDetails = (raw: any): GSTDetails => ({
  // Booking payload fields
  gstNo:     raw.gst_id              || raw.gst_number        || raw.gstNo  || '',
  cName:     raw.billing_company_name || raw.company_name     || raw.cName  || '',
  cAddr:     [raw.address_1, raw.address_2, raw.address_3].filter(Boolean).join(', ')
             || raw.address || raw.cAddr || '',
  contactNo: raw.contact_no          || raw.contactNo         || '',
  email:     raw.email               || raw.Email             || '',
  // Display-only fields
  entityName: raw.billing_entity_name || '',
  pan:        raw.pan_no              || raw.pan               || '',
  city:       raw.billing_city        || raw.city              || '',
  state:      raw.billing_state       || raw.state             || '',
});
