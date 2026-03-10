


// import React, { useState, useCallback, useRef, useEffect } from 'react';
// import { X, Edit2, Send, ArrowLeft } from 'lucide-react';

// // Import the validation modal
// import { PriceValidationModal } from './MarkupConfirmationModal';

// interface EmailPreviewModalProps {
//   isOpen: boolean;
//   htmlContent: string;
//   emailPreviewData: any;
//   onClose: () => void;
//   onConfirmSend: (editedHtmlContent: string, editedPrices: any[] | null) => void; // ✅ Fixed: 2 parameters
// }

// interface ValidationError {
//   rowIndex: number;
//   basePrice: number;
//   editedPrice: number;
//   difference: number;
// }

// interface EditedPrice {
//   rowIndex: number;
//   basePrice: number;
//   editedPrice: number;
//   newMarkup: number;
// }

// const EmailPreviewModal = ({ 
//   isOpen, 
//   htmlContent,
//   emailPreviewData,
//   onClose, 
//   onConfirmSend 
// }: EmailPreviewModalProps) => {
//   const iframeRef = useRef<HTMLIFrameElement | null>(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [isSending, setIsSending] = useState(false);
  
//   const [showValidationError, setShowValidationError] = useState(false);
//   const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);

//   useEffect(() => {
//     if (isOpen && htmlContent && iframeRef.current) {
//       const iframe = iframeRef.current;
//       const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;

//       if (!iframeDoc) return; 
      
//       iframeDoc.open();
//       iframeDoc.write(htmlContent);
//       iframeDoc.close();
//     }
//   }, [isOpen, htmlContent]);

//   const makeTableEditable = useCallback(() => {
//     const iframe = iframeRef.current;
//     if (!iframe) return;

//     const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
//     if (!iframeDoc) return; 
    
//     // ✅ Inject CSS for hiding spinners and highlighting
//     const styleElement = iframeDoc.createElement('style');
//     styleElement.textContent = `
//       input[type=number]::-webkit-outer-spin-button,
//       input[type=number]::-webkit-inner-spin-button {
//         -webkit-appearance: none;
//         margin: 0;
//       }
//       input[type=number] {
//         -moz-appearance: textfield;
//       }
      
//       .editable-cell {
//         background-color: #fffbea !important;
//         position: relative;
//       }
      
//       .editable-cell::before {
//         content: '';
//         position: absolute;
//         top: -2px;
//         left: -2px;
//         right: -2px;
//         bottom: -2px;
//         border: 2px dashed #fbbf24;
//         pointer-events: none;
//         border-radius: 4px;
//       }
      
//       .info-banner {
//         background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
//         border: 2px solid #fbbf24;
//         border-radius: 8px;
//         padding: 12px 16px;
//         margin: 16px 0;
//         display: flex;
//         align-items: center;
//         gap: 12px;
//         box-shadow: 0 2px 4px rgba(251, 191, 36, 0.1);
//       }
      
//       .info-banner::before {
//         content: '✏️';
//         font-size: 20px;
//       }
      
//       .info-banner-text {
//         color: #92400e;
//         font-family: 'Trebuchet MS', Helvetica, sans-serif;
//         font-size: 14px;
//         font-weight: 600;
//       }
//     `;
//     iframeDoc.head.appendChild(styleElement);
    
//     // ✅ Add info banner at the top of the document
//     // const bookingDetailsSection = iframeDoc.querySelector('body');
//     // if (bookingDetailsSection) {
//     //   const infoBanner = iframeDoc.createElement('div');
//     //   infoBanner.className = 'info-banner';
//     //   infoBanner.innerHTML = `
//     //     <div class="info-banner-text">
//     //       📝 Only the highlighted (yellow) fields are editable: Room Type, Meal Type, and Total Price
//     //     </div>
//     //   `;
//     //   bookingDetailsSection.insertBefore(infoBanner, bookingDetailsSection.firstChild);
//     // }
    
//     const tables = iframeDoc.querySelectorAll('table');
    
//     let targetTable: HTMLTableElement | null = null;
    
//     tables.forEach(table => {
//       const headerCells = table.querySelectorAll('th');
//       headerCells.forEach(th => {
//         if (th.textContent?.includes('Total Price') || th.textContent?.includes('Price')) {
//           targetTable = table;
//         }
//       });
//     });

//     if (!targetTable) {
//       console.warn('⚠️ Price table not found in HTML');
//       return;
//     }

//     // const tbody = targetTable.querySelector('tbody'); 
//     const tbody = (targetTable as HTMLElement).querySelector('tbody'); 
//     if (!tbody) {
//       console.warn('⚠️ Table body not found');
//       return;
//     }

//     const rows = tbody.querySelectorAll('tr');
//     const basePrices = emailPreviewData?.basePrices || [];
    
//     let priceIndex = 0;
    
//     rows.forEach((row: HTMLTableRowElement, rowIndex: number) => {
//       const cells = row.querySelectorAll('td');
      
//       if (cells.length === 0) return;
      
//       const roomTypeCell = cells[2]; // Room Type column
//       const mealTypeCell = cells[3]; // Meal Type column
//       const priceCell = cells[4]; // Price column
      
//       if (!roomTypeCell || !mealTypeCell || !priceCell) return;
      
//       // ✅ Add highlight class to editable cells
//       roomTypeCell.classList.add('editable-cell');
//       mealTypeCell.classList.add('editable-cell');
//       priceCell.classList.add('editable-cell');
      
//       const roomTypeDivs = roomTypeCell.querySelectorAll('div');
//       const mealTypeDivs = mealTypeCell.querySelectorAll('div');
//       const priceDivs = priceCell.querySelectorAll('div');
      
//       const roomTypeValues = Array.from(roomTypeDivs).filter((div): div is HTMLDivElement => {
//   const element = div as HTMLDivElement;
//   return !element.style.borderBottom && !!element.textContent?.trim();
// });

// const mealTypeValues = Array.from(mealTypeDivs).filter((div): div is HTMLDivElement => {
//   const element = div as HTMLDivElement;
//   return !element.style.borderBottom && !!element.textContent?.trim();
// });

// const priceValues = Array.from(priceDivs).filter((div): div is HTMLDivElement => {
//   const element = div as HTMLDivElement;
//   return !element.style.borderBottom && !!element.textContent?.trim();
// });

      
//       if (roomTypeValues.length > 1) {
//         roomTypeCell.innerHTML = '';
//         mealTypeCell.innerHTML = '';
//         priceCell.innerHTML = '';
        
//         roomTypeValues.forEach((roomDiv, index) => {
//           // const roomTypeText = roomDiv.textContent?.trim() || '';
//           const roomTypeText = (roomDiv as HTMLDivElement).textContent?.trim() || '';
//           // const mealTypeText = mealTypeValues[index]?.textContent?.trim() || '';
//           // const priceText = priceValues[index]?.textContent?.trim() || '';
//           const mealTypeText = (mealTypeValues[index] as HTMLDivElement)?.textContent?.trim() || '';
// const priceText = (priceValues[index] as HTMLDivElement)?.textContent?.trim() || '';
//           const actualDisplayedPrice = parseFloat(priceText.replace(/[₹,\s]/g, ''));
//           const basePrice = basePrices[priceIndex] || 0;
          
//           if (index > 0) {
//             roomTypeCell.innerHTML += '<div style="border-bottom:1px solid #ddd; margin:6px 0;"></div>';
//             mealTypeCell.innerHTML += '<div style="border-bottom:1px solid #ddd; margin:6px 0;"></div>';
//             priceCell.innerHTML += '<div style="border-bottom:1px solid #ddd; margin:6px 0;"></div>';
//           }
          
//           roomTypeCell.innerHTML += `
//             <div>
//               <input 
//                 type="text" 
//                 value="${roomTypeText}" 
//                 style="
//                   width: 100%; 
//                   padding: 4px 8px; 
//                   border: 1px solid #ccc; 
//                   border-radius: 4px; 
//                   font-family: 'Trebuchet MS', Helvetica, sans-serif;
//                   font-size: 12px;
//                 "
//               />
//             </div>
//           `;
          
//           mealTypeCell.innerHTML += `
//             <div>
//               <input 
//                 type="text" 
//                 value="${mealTypeText}" 
//                 style="
//                   width: 100%; 
//                   padding: 4px 8px; 
//                   border: 1px solid #ccc; 
//                   border-radius: 4px; 
//                   font-family: 'Trebuchet MS', Helvetica, sans-serif;
//                   font-size: 12px;
//                 "
//               />
//             </div>
//           `;
          
//           priceCell.innerHTML += `
//             <div>
//               <input 
//                 type="number" 
//                 step="0.01" 
//                 value="${actualDisplayedPrice.toFixed(2)}" 
//                 data-price-input="true"
//                 data-row-index="${priceIndex}"
//                 data-base-price="${basePrice}"
//                 style="
//                   width: 100%; 
//                   padding: 4px 8px; 
//                   border: 2px solid #0B5CAD; 
//                   border-radius: 4px; 
//                   font-family: 'Trebuchet MS', Helvetica, sans-serif;
//                   font-size: 12px;
//                   font-weight: bold;
//                 "
//               />
//             </div>
//           `;
          
//           priceIndex++;
//         });
        
//         // priceCell.setAttribute('data-displayed-price', priceValues[0]?.textContent?.trim() || '');
//         priceCell.setAttribute('data-displayed-price', (priceValues[0] as HTMLDivElement)?.textContent?.trim() || '');
//         priceCell.setAttribute('data-base-price', basePrices[rowIndex]?.toString() || '0');
        
//       } else {
//         const priceText = priceCell.textContent?.trim() || '';
//         const actualDisplayedPrice = parseFloat(priceText.replace(/[₹,\s]/g, ''));
//         const basePrice = basePrices[priceIndex] || 0;
        
//         roomTypeCell.innerHTML = `
//           <input 
//             type="text" 
//             value="${roomTypeCell.textContent?.trim()}" 
//             style="
//               width: 100%; 
//               padding: 4px 8px; 
//               border: 1px solid #ccc; 
//               border-radius: 4px; 
//               font-family: 'Trebuchet MS', Helvetica, sans-serif;
//               font-size: 12px;
//             "
//           />
//         `;
        
//         mealTypeCell.innerHTML = `
//           <input 
//             type="text" 
//             value="${mealTypeCell.textContent?.trim()}" 
//             style="
//               width: 100%; 
//               padding: 4px 8px; 
//               border: 1px solid #ccc; 
//               border-radius: 4px; 
//               font-family: 'Trebuchet MS', Helvetica, sans-serif;
//               font-size: 12px;
//             "
//           />
//         `;
        
//         priceCell.setAttribute('data-displayed-price', actualDisplayedPrice.toString());
//         priceCell.setAttribute('data-base-price', basePrice.toString());
        
//         priceCell.innerHTML = `
//           <input 
//             type="number" 
//             step="0.01" 
//             value="${actualDisplayedPrice.toFixed(2)}" 
//             data-price-input="true"
//             data-row-index="${priceIndex}"
//             data-base-price="${basePrice}"
//             style="
//               width: 100%; 
//               padding: 4px 8px; 
//               border: 2px solid #0B5CAD; 
//               border-radius: 4px; 
//               font-family: 'Trebuchet MS', Helvetica, sans-serif;
//               font-size: 12px;
//               font-weight: bold;
//             "
//           />
//         `;
        
//         priceIndex++;
//       }
//     });

//     setIsEditing(true);
//   }, [emailPreviewData]);
//   const handleEdit = useCallback(() => {
//     makeTableEditable();
//   }, [makeTableEditable]);

//   const handleBack = useCallback(() => {
//     if (iframeRef.current && htmlContent) {
//       const iframe = iframeRef.current;
//       const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
//       if (!iframeDoc) return;

//       iframeDoc.open();
//       iframeDoc.write(htmlContent);
//       iframeDoc.close();
//     }
//     setIsEditing(false);
//   }, [htmlContent]);

//   // const extractEditedPrices = useCallback((): EditedPrice[] | null => {
//   //   const iframe = iframeRef.current;
//   //   if (!iframe) {
//   //     console.error('❌ Iframe not found');
//   //     return null;
//   //   }

//   //   const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
//   //   if (!iframeDoc) return null;

//   //   const priceInputs = iframeDoc.querySelectorAll('input[data-price-input="true"]');
    
//   //   if (priceInputs.length > 0) {
//   //     const editedPrices: EditedPrice[] = [];
//   //     priceInputs.forEach((input, index) => {
//   //       const inputElement = input as HTMLInputElement;
//   //       const basePrice = parseFloat(inputElement.getAttribute('data-base-price') || '0');
//   //       const editedPrice = parseFloat(inputElement.value || '0');
//   //       const newMarkup = editedPrice - basePrice;
        
//   //       editedPrices.push({
//   //         rowIndex: index,
//   //         basePrice: basePrice,
//   //         editedPrice: editedPrice,
//   //         newMarkup: newMarkup,
//   //       });
//   //     });
      
//   //     return editedPrices;
//   //   }
    
//   //   const basePrices = emailPreviewData?.basePrices || [];
    
//   //   if (basePrices.length === 0) {
//   //     console.error('❌ No base prices found');
//   //     return null;
//   //   }
    
//   //   const tables = iframeDoc.querySelectorAll('table');
//   //   let targetTable: HTMLTableElement | null = null;
    
//   //   tables.forEach(table => {
//   //     const headerCells = table.querySelectorAll('th');
//   //     headerCells.forEach(th => {
//   //       if (th.textContent?.includes('Total Price') || th.textContent?.includes('Price')) {
//   //         targetTable = table;
//   //       }
//   //     });
//   //   });
    
//   //   if (!targetTable) return null;
    
//   //   // const tbody = targetTable.querySelector('tbody');
//   //   const tbody = (targetTable as HTMLElement).querySelector('tbody');
//   //   if (!tbody) return null;
    
//   //   const rows = tbody.querySelectorAll('tr');
//   //   const editedPrices: EditedPrice[] = [];
    
//   //   rows.forEach((row: HTMLTableRowElement, index: number) => {
//   //     const cells = row.querySelectorAll('td');
//   //     if (cells.length > 0) {
//   //       const priceCell = cells[cells.length - 1];
//   //       const textContent = priceCell.textContent?.trim() || '';
//   //       const displayedPrice = parseFloat(textContent.replace(/[₹,\s]/g, ''));
//   //       const basePrice = basePrices[index] || 0;
//   //       const newMarkup = displayedPrice - basePrice;
        
//   //       editedPrices.push({
//   //         rowIndex: index,
//   //         basePrice: basePrice,
//   //         editedPrice: displayedPrice,
//   //         newMarkup: newMarkup,
//   //       });
//   //     }
//   //   });
    
//   //   return editedPrices;
//   // }, [emailPreviewData]);

//   const extractEditedPrices = useCallback((): EditedPrice[] | null => {
//   const iframe = iframeRef.current;
//   if (!iframe) return null;

//   const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
//   if (!iframeDoc) return null;

//   // ✅ Check if in editing mode (has input fields)
//   const priceInputs = iframeDoc.querySelectorAll('input[data-price-input="true"]');
  
//   if (priceInputs.length > 0) {
//     // Editing mode - use inputs
//     const editedPrices: EditedPrice[] = [];
//     priceInputs.forEach((input, index) => {
//       const inputElement = input as HTMLInputElement;
//       const basePrice = parseFloat(inputElement.getAttribute('data-base-price') || '0');
//       const editedPrice = parseFloat(inputElement.value || '0');
//       const newMarkup = editedPrice - basePrice;
      
//       editedPrices.push({
//         rowIndex: index,
//         basePrice: basePrice,
//         editedPrice: editedPrice,
//         newMarkup: newMarkup,
//       });
//     });
    
//     return editedPrices;
//   }
  
//   // ✅ NOT editing mode - extract prices from cells (same logic as editing mode)
//   const basePrices = emailPreviewData?.basePrices || [];
  
//   if (basePrices.length === 0) return null;
  
//   const tables = iframeDoc.querySelectorAll('table');
//   let targetTable: HTMLTableElement | null = null;
  
//   tables.forEach(table => {
//     const headerCells = table.querySelectorAll('th');
//     headerCells.forEach(th => {
//       if (th.textContent?.includes('Total Price') || th.textContent?.includes('Price')) {
//         targetTable = table;
//       }
//     });
//   });
  
//   if (!targetTable) return null;
  
//   const tbody = (targetTable as HTMLElement).querySelector('tbody');
//   if (!tbody) return null;
  
//   const rows = tbody.querySelectorAll('tr');
//   const editedPrices: EditedPrice[] = [];
  
//   let priceIndex = 0; // ✅ Use a counter like in makeTableEditable
  
//   rows.forEach((row: HTMLTableRowElement) => {
//     const cells = row.querySelectorAll('td');
//     if (cells.length === 0) return;
    
//     const priceCell = cells[4]; // Total Price column
//     if (!priceCell) return;
    
//     // ✅ Check if this cell has multiple prices (divs with prices)
//     const priceDivs = priceCell.querySelectorAll('div');
//     const priceValues = Array.from(priceDivs).filter((div): div is HTMLDivElement => {
//       const element = div as HTMLDivElement;
//       return !element.style.borderBottom && !!element.textContent?.trim();
//     });
    
//     if (priceValues.length > 1) {
//       // Multiple prices in one cell
//       priceValues.forEach((priceDiv) => {
//         const priceText = priceDiv.textContent?.trim() || '';
//         const displayedPrice = parseFloat(priceText.replace(/[₹,\s]/g, ''));
//         const basePrice = basePrices[priceIndex] || 0;
//         const newMarkup = displayedPrice - basePrice;
        
//         editedPrices.push({
//           rowIndex: priceIndex,
//           basePrice: basePrice,
//           editedPrice: displayedPrice,
//           newMarkup: newMarkup,
//         });
        
//         priceIndex++;
//       });
//     } else {
//       // Single price in cell
//       const textContent = priceCell.textContent?.trim() || '';
//       const displayedPrice = parseFloat(textContent.replace(/[₹,\s]/g, ''));
//       const basePrice = basePrices[priceIndex] || 0;
//       const newMarkup = displayedPrice - basePrice;
      
//       editedPrices.push({
//         rowIndex: priceIndex,
//         basePrice: basePrice,
//         editedPrice: displayedPrice,
//         newMarkup: newMarkup,
//       });
      
//       priceIndex++;
//     }
//   });
  
//   return editedPrices;
// }, [emailPreviewData]);
  
//   const validatePrices = useCallback((editedPrices: EditedPrice[]) => {
//     const errors: ValidationError[] = [];
    
//     editedPrices.forEach((price: EditedPrice) => {
//       if (price.editedPrice < price.basePrice) {
//         errors.push({
//           rowIndex: price.rowIndex,
//           basePrice: price.basePrice,
//           editedPrice: price.editedPrice,
//           difference: price.editedPrice - price.basePrice,
//         });
//       }
//     });
    
//     return errors;
//   }, []);

//   // const handleConfirmSend = useCallback(async () => {
//   //   const iframe = iframeRef.current;
//   //   if (!iframe) return;

//   //   const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
//   //   if (!iframeDoc) return;
    
//   //   const editedPrices = extractEditedPrices();
    
//   //   if (editedPrices) {
//   //     const priceErrors = validatePrices(editedPrices);
      
//   //     if (priceErrors.length > 0) {
//   //       setValidationErrors(priceErrors);
//   //       setShowValidationError(true);
//   //       return;
//   //     }
//   //   }
    
//   //   if (isEditing && iframeDoc) {
//   //     const priceInputs = iframeDoc.querySelectorAll('input[data-price-input="true"]');
//   //     priceInputs.forEach(input => {
//   //       const inputElement = input as HTMLInputElement;
//   //       const cell = inputElement.closest('td');
//   //       if (!cell) return;
//   //       const editedPrice = parseFloat(inputElement.value || '0');
//   //       const basePrice = parseFloat(inputElement.getAttribute('data-base-price') || '0');
        
//   //       cell.setAttribute('data-displayed-price', editedPrice.toString());
//   //       cell.setAttribute('data-base-price', basePrice.toString());
//   //       cell.innerHTML = `₹${editedPrice.toFixed(2)}`;
//   //     });
      
//   //     const textInputs = iframeDoc.querySelectorAll('td input[type="text"]');
//   //     textInputs.forEach(input => {
//   //       const inputElement = input as HTMLInputElement;
//   //       const cell = inputElement.closest('td');
//   //       if (!cell) return;
//   //       const value = inputElement.value;
//   //       cell.innerHTML = value;
//   //     });
//   //   }

//   //   const editedHtml = iframeDoc.documentElement.outerHTML;

//   //   setIsSending(true);
    
//   //   try {
//   //     await onConfirmSend(editedHtml, editedPrices); // ✅ Now matches interface
//   //     setIsSending(false);
//   //   } catch (error) {
//   //     setIsSending(false);
//   //     console.error('Error sending email:', error);
//   //   }
//   // }, [onConfirmSend, extractEditedPrices, validatePrices, isEditing]);

// //   const handleConfirmSend = useCallback(async () => {
// //   const iframe = iframeRef.current;
// //   if (!iframe) return;

// //   const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
// //   if (!iframeDoc) return;
  
// //   const editedPrices = extractEditedPrices();
  
// //   if (editedPrices) {
// //     const priceErrors = validatePrices(editedPrices);
    
// //     if (priceErrors.length > 0) {
// //       setValidationErrors(priceErrors);
// //       setShowValidationError(true);
// //       return;
// //     }
// //   }
  
// //   if (isEditing && iframeDoc) {
// //     // ✅ Process each editable row/cell properly
// //     const tables = iframeDoc.querySelectorAll('table');
// //     let targetTable: HTMLTableElement | null = null;
    
// //     tables.forEach(table => {
// //       const headerCells = table.querySelectorAll('th');
// //       headerCells.forEach(th => {
// //         if (th.textContent?.includes('Total Price') || th.textContent?.includes('Price')) {
// //           targetTable = table;
// //         }
// //       });
// //     });

// //     if (targetTable) {
// //       const tbody = (targetTable as HTMLElement).querySelector('tbody');
// //       if (tbody) {
// //         const rows = tbody.querySelectorAll('tr');
        
// //         rows.forEach((row: HTMLTableRowElement) => {
// //           const cells = row.querySelectorAll('td');
// //           if (cells.length === 0) return;
          
// //           const roomTypeCell = cells[2];
// //           const mealTypeCell = cells[3];
// //           const priceCell = cells[4];
          
// //           if (!roomTypeCell || !mealTypeCell || !priceCell) return;
          
// //           // ✅ Get all inputs from each cell
// //           const roomInputs = roomTypeCell.querySelectorAll('input[type="text"]');
// //           const mealInputs = mealTypeCell.querySelectorAll('input[type="text"]');
// //           const priceInputs = priceCell.querySelectorAll('input[type="number"]');
          
// //           // ✅ Handle multi-value cells
// //           if (roomInputs.length > 1) {
// //             let roomHtml = '';
// //             let mealHtml = '';
// //             let priceHtml = '';
            
// //             roomInputs.forEach((input, index) => {
// //               const roomInput = input as HTMLInputElement;
// //               const mealInput = mealInputs[index] as HTMLInputElement;
// //               const priceInput = priceInputs[index] as HTMLInputElement;
              
// //               if (index > 0) {
// //                 roomHtml += '<div style="border-bottom:1px solid #ddd; margin:6px 0;"></div>';
// //                 mealHtml += '<div style="border-bottom:1px solid #ddd; margin:6px 0;"></div>';
// //                 priceHtml += '<div style="border-bottom:1px solid #ddd; margin:6px 0;"></div>';
// //               }
              
// //               roomHtml += `<div>${roomInput.value}</div>`;
// //               mealHtml += `<div>${mealInput.value}</div>`;
// //               priceHtml += `<div>₹${parseFloat(priceInput.value).toFixed(2)}</div>`;
// //             });
            
// //             roomTypeCell.innerHTML = roomHtml;
// //             mealTypeCell.innerHTML = mealHtml;
// //             priceCell.innerHTML = priceHtml;
            
// //           } else if (roomInputs.length === 1) {
// //             // ✅ Handle single-value cells
// //             const roomInput = roomInputs[0] as HTMLInputElement;
// //             const mealInput = mealInputs[0] as HTMLInputElement;
// //             const priceInput = priceInputs[0] as HTMLInputElement;
            
// //             roomTypeCell.innerHTML = roomInput.value;
// //             mealTypeCell.innerHTML = mealInput.value;
// //             priceCell.innerHTML = `₹${parseFloat(priceInput.value).toFixed(2)}`;
// //           }
// //         });
// //       }
// //     }
// //   }

// //   const editedHtml = iframeDoc.documentElement.outerHTML;

// //   setIsSending(true);
  
// //   try {
// //     await onConfirmSend(editedHtml, editedPrices);
// //     setIsSending(false);
// //   } catch (error) {
// //     setIsSending(false);
// //     console.error('Error sending email:', error);
// //   }
// // }, [onConfirmSend, extractEditedPrices, validatePrices, isEditing]);
  
//   const handleConfirmSend = useCallback(async () => {
//   const iframe = iframeRef.current;
//   if (!iframe) return;

//   const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
//   if (!iframeDoc) return;
  
//   const editedPrices = extractEditedPrices();
  
//   if (editedPrices) {
//     const priceErrors = validatePrices(editedPrices);
    
//     if (priceErrors.length > 0) {
//       setValidationErrors(priceErrors);
//       setShowValidationError(true);
//       return;
//     }
//   }
  
//   if (isEditing && iframeDoc) {
//     const tables = iframeDoc.querySelectorAll('table');
//     let targetTable: HTMLTableElement | null = null;
    
//     tables.forEach(table => {
//       const headerCells = table.querySelectorAll('th');
//       headerCells.forEach(th => {
//         if (th.textContent?.includes('Total Price') || th.textContent?.includes('Price')) {
//           targetTable = table;
//         }
//       });
//     });

//     if (targetTable) {
//       const tbody = (targetTable as HTMLElement).querySelector('tbody');
//       if (tbody) {
//         const rows = tbody.querySelectorAll('tr');
        
//         rows.forEach((row: HTMLTableRowElement) => {
//           const cells = row.querySelectorAll('td');
//           if (cells.length === 0) return;
          
//           const roomTypeCell = cells[2];
//           const mealTypeCell = cells[3];
//           const priceCell = cells[4];
          
//           if (!roomTypeCell || !mealTypeCell || !priceCell) return;
          
//           const roomInputs = roomTypeCell.querySelectorAll('input[type="text"]');
//           const mealInputs = mealTypeCell.querySelectorAll('input[type="text"]');
//           const priceInputs = priceCell.querySelectorAll('input[type="number"]');
          
//           if (roomInputs.length > 1) {
//             let roomHtml = '';
//             let mealHtml = '';
//             let priceHtml = '';
            
//             roomInputs.forEach((input, index) => {
//               const roomInput = input as HTMLInputElement;
//               const mealInput = mealInputs[index] as HTMLInputElement;
//               const priceInput = priceInputs[index] as HTMLInputElement;
              
//               if (index > 0) {
//                 roomHtml += '<div style="border-bottom:1px solid #ddd; margin:6px 0;"></div>';
//                 mealHtml += '<div style="border-bottom:1px solid #ddd; margin:6px 0;"></div>';
//                 priceHtml += '<div style="border-bottom:1px solid #ddd; margin:6px 0;"></div>';
//               }
              
//               roomHtml += `<div>${roomInput.value}</div>`;
//               mealHtml += `<div>${mealInput.value}</div>`;
//               priceHtml += `<div>₹${parseFloat(priceInput.value).toFixed(2)}</div>`;
//             });
            
//             roomTypeCell.innerHTML = roomHtml;
//             mealTypeCell.innerHTML = mealHtml;
//             priceCell.innerHTML = priceHtml;
            
//           } else if (roomInputs.length === 1) {
//             const roomInput = roomInputs[0] as HTMLInputElement;
//             const mealInput = mealInputs[0] as HTMLInputElement;
//             const priceInput = priceInputs[0] as HTMLInputElement;
            
//             roomTypeCell.innerHTML = roomInput.value;
//             mealTypeCell.innerHTML = mealInput.value;
//             priceCell.innerHTML = `₹${parseFloat(priceInput.value).toFixed(2)}`;
//           }
          
//           // ✅ Remove yellow highlighting classes and attributes
//           roomTypeCell.classList.remove('editable-cell');
//           mealTypeCell.classList.remove('editable-cell');
//           priceCell.classList.remove('editable-cell');
          
//           // ✅ Remove any inline background color styles
//           roomTypeCell.removeAttribute('style');
//           mealTypeCell.removeAttribute('style');
//           priceCell.removeAttribute('style');
//         });
//       }
//     }
    
//     // ✅ Remove the injected CSS styles that create yellow highlighting
//     const styleElements = iframeDoc.querySelectorAll('style');
//     styleElements.forEach(styleEl => {
//       if (styleEl.textContent?.includes('editable-cell') || 
//           styleEl.textContent?.includes('info-banner')) {
//         styleEl.remove();
//       }
//     });
    
//     // ✅ Remove the info banner if it exists
//     const infoBanner = iframeDoc.querySelector('.info-banner');
//     if (infoBanner) {
//       infoBanner.remove();
//     }
//   }

//   const editedHtml = iframeDoc.documentElement.outerHTML;

//   setIsSending(true);
  
//   try {
//     await onConfirmSend(editedHtml, editedPrices);
//     setIsSending(false);
//   } catch (error) {
//     setIsSending(false);
//     console.error('Error sending email:', error);
//   }
// }, [onConfirmSend, extractEditedPrices, validatePrices, isEditing]);  

//   const handleCloseValidation = useCallback(() => {
//     setShowValidationError(false);
//     setValidationErrors([]);
//   }, []);

//   if (!isOpen) return null;

//   return (
//     <>
//       <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
//         <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[95vh] h-full flex flex-col overflow-hidden">
//           {/* Header */}
//           <div className="bg-gradient-to-r from-[#0B5CAD] via-[#0A4F95] to-[#073B6D] text-white px-6 py-4 flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="bg-white/20 p-2 rounded-lg">
//                 <Send className="w-5 h-5" />
//               </div>
//               <div>
//                 <h2 className="text-xl font-bold">Email Preview</h2>
//                 <p className="text-purple-100 text-sm">
//                   {isEditing ? 'Edit the table and click confirm to send' : 'Review before sending'}
//                 </p>
//               </div>
//             </div>
//             <button
//               onClick={onClose}
//               className="text-white/80 hover:text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
//             >
//               <X className="w-5 h-5" />
//             </button>
//           </div>

//             {/* ✅ Info Banner - Add this section */}
//           {isEditing && (
//             <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-b-2 border-amber-200 px-6 py-3">
//               <div className="flex items-center gap-3">
//                 <div className="bg-amber-100 p-2 rounded-lg">
//                   <span className="text-xl">✏️</span>
//                 </div>
//                 <div className="flex-1">
//                   <p className="text-amber-900 text-sm font-semibold">
//                     📝 Only the highlighted (yellow) fields are editable: Room Type, Meal Type, and Total Price
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}
          
//           {/* Body */}
//           <div className="flex-1 overflow-hidden p-4 bg-gray-50">
//             <div className="h-full bg-white rounded-lg shadow-sm border-2 border-gray-200 overflow-hidden">
//               <iframe
//                 ref={iframeRef}
//                 title="Email Preview"
//                 className="w-full h-full border-0"
//                 sandbox="allow-same-origin"
//               />
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="bg-white border-t-2 border-gray-200 px-6 py-4 flex justify-between items-center">
//             <div className="flex gap-3">
//               {isEditing && (
//                 <button
//                   onClick={handleBack}
//                   className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   <ArrowLeft className="w-4 h-4" />
//                   Back to Preview
//                 </button>
//               )}
              
//               {!isEditing && (
//                 <div className="text-sm text-gray-600 flex items-center gap-2">
//                   <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
//                   Ready to send with current prices
//                 </div>
//               )}
//             </div>
            
//             <div className="flex gap-3">
//               <button
//                 onClick={onClose}
//                 className="px-5 py-2 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
//               >
//                 Cancel
//               </button>
              
//               {!isEditing ? (
//                 <>
//                   <button
//                     onClick={handleEdit}
//                     className="flex items-center gap-2 px-5 py-2 bg-white border-2 border-[#0B5CAD] text-[#0B5CAD] hover:bg-[#0B5CAD] hover:text-white font-semibold cursor-pointer rounded-lg transition-colors"
//                   >
//                     <Edit2 className="w-4 h-4" />
//                     Edit
//                   </button>
//                   <button
//                     onClick={handleConfirmSend}
//                     disabled={isSending}
//                     className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#0B5CAD] via-[#0A4F95] to-[#073B6D] hover:from-[#0A4F95] hover:via-[#073B6D] hover:to-[#052A4F] text-white font-semibold rounded-lg transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
//                   >
//                     {isSending ? (
//                       <>
//                         <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                         Sending...
//                       </>
//                     ) : (
//                       <>
//                         <Send className="w-4 h-4" />
//                         Send Email
//                       </>
//                     )}
//                   </button>
//                 </>
//               ) : (
//                 <button
//                   onClick={handleConfirmSend}
//                   disabled={isSending}
//                   className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#0B5CAD] via-[#0A4F95] to-[#073B6D] hover:from-[#0A4F95] hover:via-[#073B6D] hover:to-[#052A4F] text-white font-semibold rounded-lg transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
//                 >
//                   {isSending ? (
//                     <>
//                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                       Sending...
//                     </>
//                   ) : (
//                     <>
//                       <Send className="w-4 h-4" />
//                       Confirm & Send Email
//                     </>
//                   )}
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Price Validation Error Modal */}
//       <PriceValidationModal
//         isOpen={showValidationError}
//         onClose={handleCloseValidation}
//         validationErrors={validationErrors}
//       />
//     </>
//   );
// };

// export default EmailPreviewModal;



// import React, { useState, useCallback, useRef, useEffect } from 'react';
// import { X, Edit2, Send, ArrowLeft } from 'lucide-react';

// // Import the validation modal
// import { PriceValidationModal } from './MarkupConfirmationModal';

// interface EmailPreviewModalProps {
//   isOpen: boolean;
//   htmlContent: string;
//   emailPreviewData: any;
//   onClose: () => void;
//   onConfirmSend: (editedHtmlContent: string, editedPrices: any[] | null) => void;
// }

// interface ValidationError {
//   rowIndex: number;
//   basePrice: number;
//   editedPrice: number;
//   difference: number;
// }

// interface EditedPrice {
//   rowIndex: number;
//   basePrice: number;
//   editedPrice: number;
//   newMarkup: number;
//   perNightPrice: number;
//   numberOfNights: number;
// }

// const EmailPreviewModal = ({ 
//   isOpen, 
//   htmlContent,
//   emailPreviewData,
//   onClose, 
//   onConfirmSend 
// }: EmailPreviewModalProps) => {
//   const iframeRef = useRef<HTMLIFrameElement | null>(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [isSending, setIsSending] = useState(false);
  
//   const [showValidationError, setShowValidationError] = useState(false);
//   const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);

//   useEffect(() => {
//     if (isOpen && htmlContent && iframeRef.current) {
//       const iframe = iframeRef.current;
//       const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;

//       if (!iframeDoc) return; 
      
//       iframeDoc.open();
//       iframeDoc.write(htmlContent);
//       iframeDoc.close();
//     }
//   }, [isOpen, htmlContent]);

//   const makeTableEditable = useCallback(() => {
//     const iframe = iframeRef.current;
//     if (!iframe) return;

//     const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
//     if (!iframeDoc) return; 
    
//     // ✅ Inject CSS for hiding spinners and highlighting
//     const styleElement = iframeDoc.createElement('style');
//     styleElement.textContent = `
//       input[type=number]::-webkit-outer-spin-button,
//       input[type=number]::-webkit-inner-spin-button {
//         -webkit-appearance: none;
//         margin: 0;
//       }
//       input[type=number] {
//         -moz-appearance: textfield;
//       }
      
//       .editable-cell {
//         background-color: #fffbea !important;
//         position: relative;
//       }
      
//       .editable-cell::before {
//         content: '';
//         position: absolute;
//         top: -2px;
//         left: -2px;
//         right: -2px;
//         bottom: -2px;
//         border: 2px dashed #fbbf24;
//         pointer-events: none;
//         border-radius: 4px;
//       }
      
//       .auto-calculated-cell {
//         background-color: #f0f9ff !important;
//         position: relative;
//       }
      
//       .auto-calculated-cell::before {
//         content: '';
//         position: absolute;
//         top: -2px;
//         left: -2px;
//         right: -2px;
//         bottom: -2px;
//         border: 2px dashed #3b82f6;
//         pointer-events: none;
//         border-radius: 4px;
//       }
      
//       .info-banner {
//         background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
//         border: 2px solid #fbbf24;
//         border-radius: 8px;
//         padding: 12px 16px;
//         margin: 16px 0;
//         display: flex;
//         align-items: center;
//         gap: 12px;
//         box-shadow: 0 2px 4px rgba(251, 191, 36, 0.1);
//       }
      
//       .info-banner::before {
//         content: '✏️';
//         font-size: 20px;
//       }
      
//       .info-banner-text {
//         color: #92400e;
//         font-family: 'Trebuchet MS', Helvetica, sans-serif;
//         font-size: 14px;
//         font-weight: 600;
//       }
//     `;
//     iframeDoc.head.appendChild(styleElement);
    
//     const tables = iframeDoc.querySelectorAll('table');
    
//     let targetTable: HTMLTableElement | null = null;
    
//     tables.forEach(table => {
//       const headerCells = table.querySelectorAll('th');
//       headerCells.forEach(th => {
//         if (th.textContent?.includes('Total Price') || th.textContent?.includes('Price')) {
//           targetTable = table;
//         }
//       });
//     });

//     if (!targetTable) {
//       console.warn('⚠️ Price table not found in HTML');
//       return;
//     }

//     const tbody = (targetTable as HTMLElement).querySelector('tbody'); 
//     if (!tbody) {
//       console.warn('⚠️ Table body not found');
//       return;
//     }

//     const rows = tbody.querySelectorAll('tr');
    
//     // ✅ Get number of nights from emailPreviewData
//     const checkIn = new Date(emailPreviewData?.checkIn || '');
//     const checkOut = new Date(emailPreviewData?.checkOut || '');
//     const numberOfNights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    
//     let priceIndex = 0;
    
//     rows.forEach((row: HTMLTableRowElement) => {
//       const cells = row.querySelectorAll('td');
      
//       if (cells.length === 0) return;
      
//       // Column indices based on your HTML structure
//       const perNightPriceCell = cells[4]; // Per Night Price column
//       const totalPriceCell = cells[5]; // Total Price column
      
//       if (!perNightPriceCell || !totalPriceCell) return;
      
//       // ✅ Add highlight classes
//       perNightPriceCell.classList.add('editable-cell');
//       totalPriceCell.classList.add('auto-calculated-cell');
      
//       const perNightDivs = perNightPriceCell.querySelectorAll('div');
//       const totalPriceDivs = totalPriceCell.querySelectorAll('div');
      
//       const perNightValues = Array.from(perNightDivs).filter((div): div is HTMLDivElement => {
//         const element = div as HTMLDivElement;
//         return !element.style.borderBottom && !!element.textContent?.trim();
//       });

//       const totalPriceValues = Array.from(totalPriceDivs).filter((div): div is HTMLDivElement => {
//         const element = div as HTMLDivElement;
//         return !element.style.borderBottom && !!element.textContent?.trim();
//       });
      
//       if (perNightValues.length > 1) {
//         // Multiple prices in one cell
//         perNightPriceCell.innerHTML = '';
//         totalPriceCell.innerHTML = '';
        
//         perNightValues.forEach((perNightDiv, index) => {
//           const perNightText = (perNightDiv as HTMLDivElement).textContent?.trim() || '';
//           const totalPriceText = (totalPriceValues[index] as HTMLDivElement)?.textContent?.trim() || '';
          
//           const perNightPrice = parseFloat(perNightText.replace(/[₹,\s]/g, ''));
//           const totalPrice = parseFloat(totalPriceText.replace(/[₹,\s]/g, ''));
          
//           if (index > 0) {
//             perNightPriceCell.innerHTML += '<div style="border-bottom:1px solid #ddd; margin:6px 0;"></div>';
//             totalPriceCell.innerHTML += '<div style="border-bottom:1px solid #ddd; margin:6px 0;"></div>';
//           }
          
//           // ✅ Make Per Night Price editable
//           perNightPriceCell.innerHTML += `
//             <div>
//               <input 
//                 type="number" 
//                 step="0.01" 
//                 value="${perNightPrice.toFixed(2)}" 
//                 data-per-night-input="true"
//                 data-row-index="${priceIndex}"
//                 data-nights="${numberOfNights}"
//                 style="
//                   width: 100%; 
//                   padding: 4px 8px; 
//                   border: 2px solid #fbbf24; 
//                   border-radius: 4px; 
//                   font-family: 'Trebuchet MS', Helvetica, sans-serif;
//                   font-size: 12px;
//                   font-weight: bold;
//                 "
//               />
//             </div>
//           `;
          
//           // ✅ Make Total Price read-only but auto-calculated
//           totalPriceCell.innerHTML += `
//             <div>
//               <input 
//                 type="number" 
//                 step="0.01" 
//                 value="${totalPrice.toFixed(2)}" 
//                 data-total-price-input="true"
//                 data-row-index="${priceIndex}"
//                 readonly
//                 style="
//                   width: 100%; 
//                   padding: 4px 8px; 
//                   border: 2px solid #3b82f6; 
//                   border-radius: 4px; 
//                   font-family: 'Trebuchet MS', Helvetica, sans-serif;
//                   font-size: 12px;
//                   font-weight: bold;
//                   background-color: #f0f9ff;
//                   cursor: not-allowed;
//                 "
//               />
//             </div>
//           `;
          
//           priceIndex++;
//         });
        
//       } else {
//         // Single price in cell
//         const perNightText = perNightPriceCell.textContent?.trim() || '';
//         const totalPriceText = totalPriceCell.textContent?.trim() || '';
        
//         const perNightPrice = parseFloat(perNightText.replace(/[₹,\s]/g, ''));
//         const totalPrice = parseFloat(totalPriceText.replace(/[₹,\s]/g, ''));
        
//         perNightPriceCell.innerHTML = `
//           <input 
//             type="number" 
//             step="0.01" 
//             value="${perNightPrice.toFixed(2)}" 
//             data-per-night-input="true"
//             data-row-index="${priceIndex}"
//             data-nights="${numberOfNights}"
//             style="
//               width: 100%; 
//               padding: 4px 8px; 
//               border: 2px solid #fbbf24; 
//               border-radius: 4px; 
//               font-family: 'Trebuchet MS', Helvetica, sans-serif;
//               font-size: 12px;
//               font-weight: bold;
//             "
//           />
//         `;
        
//         totalPriceCell.innerHTML = `
//           <input 
//             type="number" 
//             step="0.01" 
//             value="${totalPrice.toFixed(2)}" 
//             data-total-price-input="true"
//             data-row-index="${priceIndex}"
//             readonly
//             style="
//               width: 100%; 
//               padding: 4px 8px; 
//               border: 2px solid #3b82f6; 
//               border-radius: 4px; 
//               font-family: 'Trebuchet MS', Helvetica, sans-serif;
//               font-size: 12px;
//               font-weight: bold;
//               background-color: #f0f9ff;
//               cursor: not-allowed;
//             "
//           />
//         `;
        
//         priceIndex++;
//       }
//     });

//     // ✅ Add event listeners to Per Night Price inputs to auto-calculate Total Price
//     const perNightInputs = iframeDoc.querySelectorAll('input[data-per-night-input="true"]');
//     perNightInputs.forEach((input) => {
//       const inputElement = input as HTMLInputElement;
//       inputElement.addEventListener('input', (e) => {
//         const target = e.target as HTMLInputElement;
//         const rowIndex = target.getAttribute('data-row-index');
//         const nights = parseFloat(target.getAttribute('data-nights') || '1');
//         const perNightPrice = parseFloat(target.value || '0');
        
//         // Calculate total price
//         const totalPrice = perNightPrice * nights;
        
//         // Find corresponding total price input
//         const totalPriceInput = iframeDoc.querySelector(
//           `input[data-total-price-input="true"][data-row-index="${rowIndex}"]`
//         ) as HTMLInputElement;
        
//         if (totalPriceInput) {
//           totalPriceInput.value = totalPrice.toFixed(2);
//         }
//       });
//     });

//     setIsEditing(true);
//   }, [emailPreviewData]);

//   const handleEdit = useCallback(() => {
//     makeTableEditable();
//   }, [makeTableEditable]);

//   const handleBack = useCallback(() => {
//     if (iframeRef.current && htmlContent) {
//       const iframe = iframeRef.current;
//       const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
//       if (!iframeDoc) return;

//       iframeDoc.open();
//       iframeDoc.write(htmlContent);
//       iframeDoc.close();
//     }
//     setIsEditing(false);
//   }, [htmlContent]);

//   const extractEditedPrices = useCallback((): EditedPrice[] | null => {
//     const iframe = iframeRef.current;
//     if (!iframe) return null;

//     const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
//     if (!iframeDoc) return null;

//     const perNightInputs = iframeDoc.querySelectorAll('input[data-per-night-input="true"]');
//     const totalPriceInputs = iframeDoc.querySelectorAll('input[data-total-price-input="true"]');
    
//     if (perNightInputs.length > 0) {
//       const editedPrices: EditedPrice[] = [];
      
//       perNightInputs.forEach((input, index) => {
//         const perNightInput = input as HTMLInputElement;
//         const totalPriceInput = totalPriceInputs[index] as HTMLInputElement;
        
//         const perNightPrice = parseFloat(perNightInput.value || '0');
//         const totalPrice = parseFloat(totalPriceInput.value || '0');
//         const numberOfNights = parseFloat(perNightInput.getAttribute('data-nights') || '1');
        
//         // Calculate base price from original per night price
//         const basePrices = emailPreviewData?.basePrices || [];
//         const basePrice = basePrices[index] || 0;
//         const newMarkup = totalPrice - basePrice;
        
//         editedPrices.push({
//           rowIndex: index,
//           basePrice: basePrice,
//           editedPrice: totalPrice,
//           newMarkup: newMarkup,
//           perNightPrice: perNightPrice,
//           numberOfNights: numberOfNights,
//         });
//       });
      
//       return editedPrices;
//     }
    
//     return null;
//   }, [emailPreviewData]);
  
//   const validatePrices = useCallback((editedPrices: EditedPrice[]) => {
//     const errors: ValidationError[] = [];
    
//     editedPrices.forEach((price: EditedPrice) => {
//       if (price.editedPrice < price.basePrice) {
//         errors.push({
//           rowIndex: price.rowIndex,
//           basePrice: price.basePrice,
//           editedPrice: price.editedPrice,
//           difference: price.editedPrice - price.basePrice,
//         });
//       }
//     });
    
//     return errors;
//   }, []);
  
//   const handleConfirmSend = useCallback(async () => {
//     const iframe = iframeRef.current;
//     if (!iframe) return;

//     const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
//     if (!iframeDoc) return;
    
//     const editedPrices = extractEditedPrices();
    
//     if (editedPrices) {
//       const priceErrors = validatePrices(editedPrices);
      
//       if (priceErrors.length > 0) {
//         setValidationErrors(priceErrors);
//         setShowValidationError(true);
//         return;
//       }
//     }
    
//     if (isEditing && iframeDoc) {
//       const tables = iframeDoc.querySelectorAll('table');
//       let targetTable: HTMLTableElement | null = null;
      
//       tables.forEach(table => {
//         const headerCells = table.querySelectorAll('th');
//         headerCells.forEach(th => {
//           if (th.textContent?.includes('Total Price') || th.textContent?.includes('Price')) {
//             targetTable = table;
//           }
//         });
//       });

//       if (targetTable) {
//         const tbody = (targetTable as HTMLElement).querySelector('tbody');
//         if (tbody) {
//           const rows = tbody.querySelectorAll('tr');
          
//           rows.forEach((row: HTMLTableRowElement) => {
//             const cells = row.querySelectorAll('td');
//             if (cells.length === 0) return;
            
//             const perNightPriceCell = cells[4];
//             const totalPriceCell = cells[5];
            
//             if (!perNightPriceCell || !totalPriceCell) return;
            
//             const perNightInputs = perNightPriceCell.querySelectorAll('input[data-per-night-input="true"]');
//             const totalPriceInputs = totalPriceCell.querySelectorAll('input[data-total-price-input="true"]');
            
//             if (perNightInputs.length > 1) {
//               let perNightHtml = '';
//               let totalPriceHtml = '';
              
//               perNightInputs.forEach((input, index) => {
//                 const perNightInput = input as HTMLInputElement;
//                 const totalPriceInput = totalPriceInputs[index] as HTMLInputElement;
                
//                 if (index > 0) {
//                   perNightHtml += '<div style="border-bottom:1px solid #ddd; margin:6px 0;"></div>';
//                   totalPriceHtml += '<div style="border-bottom:1px solid #ddd; margin:6px 0;"></div>';
//                 }
                
//                 perNightHtml += `<div>${parseFloat(perNightInput.value).toFixed(2)}</div>`;
//                 totalPriceHtml += `<div>${parseFloat(totalPriceInput.value).toFixed(2)}</div>`;
//               });
              
//               perNightPriceCell.innerHTML = perNightHtml;
//               totalPriceCell.innerHTML = totalPriceHtml;
              
//             } else if (perNightInputs.length === 1) {
//               const perNightInput = perNightInputs[0] as HTMLInputElement;
//               const totalPriceInput = totalPriceInputs[0] as HTMLInputElement;
              
//               perNightPriceCell.innerHTML = parseFloat(perNightInput.value).toFixed(2);
//               totalPriceCell.innerHTML = parseFloat(totalPriceInput.value).toFixed(2);
//             }
            
//             // ✅ Remove highlighting classes
//             perNightPriceCell.classList.remove('editable-cell');
//             totalPriceCell.classList.remove('auto-calculated-cell');
            
//             perNightPriceCell.removeAttribute('style');
//             totalPriceCell.removeAttribute('style');
//           });
//         }
//       }
      
//       // ✅ Remove injected CSS
//       const styleElements = iframeDoc.querySelectorAll('style');
//       styleElements.forEach(styleEl => {
//         if (styleEl.textContent?.includes('editable-cell') || 
//             styleEl.textContent?.includes('auto-calculated-cell') ||
//             styleEl.textContent?.includes('info-banner')) {
//           styleEl.remove();
//         }
//       });
      
//       const infoBanner = iframeDoc.querySelector('.info-banner');
//       if (infoBanner) {
//         infoBanner.remove();
//       }
//     }

//     const editedHtml = iframeDoc.documentElement.outerHTML;

//     setIsSending(true);
    
//     try {
//       await onConfirmSend(editedHtml, editedPrices);
//       setIsSending(false);
//     } catch (error) {
//       setIsSending(false);
//       console.error('Error sending email:', error);
//     }
//   }, [onConfirmSend, extractEditedPrices, validatePrices, isEditing]);  

//   const handleCloseValidation = useCallback(() => {
//     setShowValidationError(false);
//     setValidationErrors([]);
//   }, []);

//   if (!isOpen) return null;

//   return (
//     <>
//       <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
//         <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[95vh] h-full flex flex-col overflow-hidden">
//           {/* Header */}
//           <div className="bg-gradient-to-r from-[#0B5CAD] via-[#0A4F95] to-[#073B6D] text-white px-6 py-4 flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="bg-white/20 p-2 rounded-lg">
//                 <Send className="w-5 h-5" />
//               </div>
//               <div>
//                 <h2 className="text-xl font-bold">Email Preview</h2>
//                 <p className="text-purple-100 text-sm">
//                   {isEditing ? 'Edit per night price - total will auto-calculate' : 'Review before sending'}
//                 </p>
//               </div>
//             </div>
//             <button
//               onClick={onClose}
//               className="text-white/80 hover:text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
//             >
//               <X className="w-5 h-5" />
//             </button>
//           </div>

//           {/* Info Banner */}
//           {isEditing && (
//             <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-b-2 border-amber-200 px-6 py-3">
//               <div className="flex items-center gap-3">
//                 <div className="bg-amber-100 p-2 rounded-lg">
//                   <span className="text-xl">✏️</span>
//                 </div>
//                 <div className="flex-1">
//                   <p className="text-amber-900 text-sm font-semibold">
//                     📝 Only "Per Night Price" (yellow) is editable. "Total Price" (blue) auto-calculates based on nights.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}
          
//           {/* Body */}
//           <div className="flex-1 overflow-hidden p-4 bg-gray-50">
//             <div className="h-full bg-white rounded-lg shadow-sm border-2 border-gray-200 overflow-hidden">
//               <iframe
//                 ref={iframeRef}
//                 title="Email Preview"
//                 className="w-full h-full border-0"
//                 sandbox="allow-same-origin"
//               />
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="bg-white border-t-2 border-gray-200 px-6 py-4 flex justify-between items-center">
//             <div className="flex gap-3">
//               {isEditing && (
//                 <button
//                   onClick={handleBack}
//                   className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   <ArrowLeft className="w-4 h-4" />
//                   Back to Preview
//                 </button>
//               )}
              
//               {!isEditing && (
//                 <div className="text-sm text-gray-600 flex items-center gap-2">
//                   <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
//                   Ready to send with current prices
//                 </div>
//               )}
//             </div>
            
//             <div className="flex gap-3">
//               <button
//                 onClick={onClose}
//                 className="px-5 py-2 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
//               >
//                 Cancel
//               </button>
              
//               {!isEditing ? (
//                 <>
//                   <button
//                     onClick={handleEdit}
//                     className="flex items-center gap-2 px-5 py-2 bg-white border-2 border-[#0B5CAD] text-[#0B5CAD] hover:bg-[#0B5CAD] hover:text-white font-semibold cursor-pointer rounded-lg transition-colors"
//                   >
//                     <Edit2 className="w-4 h-4" />
//                     Edit
//                   </button>
//                   <button
//                     onClick={handleConfirmSend}
//                     disabled={isSending}
//                     className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#0B5CAD] via-[#0A4F95] to-[#073B6D] hover:from-[#0A4F95] hover:via-[#073B6D] hover:to-[#052A4F] text-white font-semibold rounded-lg transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
//                   >
//                     {isSending ? (
//                       <>
//                         <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                         Sending...
//                       </>
//                     ) : (
//                       <>
//                         <Send className="w-4 h-4" />
//                         Send Email
//                       </>
//                     )}
//                   </button>
//                 </>
//               ) : (
//                 <button
//                   onClick={handleConfirmSend}
//                   disabled={isSending}
//                   className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#0B5CAD] via-[#0A4F95] to-[#073B6D] hover:from-[#0A4F95] hover:via-[#073B6D] hover:to-[#052A4F] text-white font-semibold rounded-lg transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
//                 >
//                   {isSending ? (
//                     <>
//                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                       Sending...
//                     </>
//                   ) : (
//                     <>
//                       <Send className="w-4 h-4" />
//                       Confirm & Send Email
//                     </>
//                   )}
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Price Validation Error Modal */}
//       <PriceValidationModal
//         isOpen={showValidationError}
//         onClose={handleCloseValidation}
//         validationErrors={validationErrors}
//       />
//     </>
//   );
// };

// export default EmailPreviewModal;


import React, { useState, useCallback, useRef, useEffect } from 'react';
import { X, Edit2, Send, ArrowLeft } from 'lucide-react';
import { PriceValidationModal } from './MarkupConfirmationModal';

interface EmailPreviewModalProps {
  isOpen: boolean;
  htmlContent: string;
  emailPreviewData: any;
  onClose: () => void;
  onConfirmSend: (editedHtmlContent: string, editedPrices: any[] | null) => void;
}

// interface ValidationError {
//   rowIndex: number;
//   basePrice: number;
//   editedPrice: number;
//   difference: number;
// }

interface ValidationError {
  rowIndex: number;
  basePrice: number;
  basePerNightPrice: number;  // ← ADD
  editedPrice: number;
  editedTotalPrice: number;   // ← ADD
  difference: number;
  hotelName?: string;         // ← ADD
  roomType?: string;          // ← ADD
  mealPlan?: string;          // ← ADD
}
interface EditedPrice {
  rowIndex: number;       // flatIndex — matches HTML priceIndex
  basePrice: number;      // original base price from 1st call
  editedPrice: number;    // calculated total (perNight × nights)
  newMarkup: number;      // editedPrice - basePrice
  perNightPrice: number;  // user-edited per night price
  numberOfNights: number; // nights from checkIn/checkOut
}

const EmailPreviewModal = ({
  isOpen,
  htmlContent,
  emailPreviewData,
  onClose,
  onConfirmSend,
}: EmailPreviewModalProps) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showValidationError, setShowValidationError] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);

  useEffect(() => {
    if (isOpen && htmlContent && iframeRef.current) {
      const iframe = iframeRef.current;
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!iframeDoc) return;
      iframeDoc.open();
      iframeDoc.write(htmlContent);
      iframeDoc.close();
    }
  }, [isOpen, htmlContent]);

  const makeTableEditable = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!iframeDoc) return;

    // Inject styles
    const styleElement = iframeDoc.createElement('style');
    styleElement.textContent = `
      input[type=number]::-webkit-outer-spin-button,
      input[type=number]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      input[type=number] { -moz-appearance: textfield; }

      .editable-cell {
        background-color: #fffbea !important;
        position: relative;
      }
      .editable-cell::before {
        content: '';
        position: absolute;
        top: -2px; left: -2px; right: -2px; bottom: -2px;
        border: 2px dashed #fbbf24;
        pointer-events: none;
        border-radius: 4px;
      }

      .auto-calculated-cell {
        background-color: #f0f9ff !important;
        position: relative;
      }
      .auto-calculated-cell::before {
        content: '';
        position: absolute;
        top: -2px; left: -2px; right: -2px; bottom: -2px;
        border: 2px dashed #3b82f6;
        pointer-events: none;
        border-radius: 4px;
      }
    `;
    iframeDoc.head.appendChild(styleElement);

    // Find the hotel options table
    const tables = iframeDoc.querySelectorAll('table');
    let targetTable: HTMLTableElement | null = null;
    tables.forEach(table => {
      const headerCells = table.querySelectorAll('th');
      headerCells.forEach(th => {
        if (th.textContent?.includes('Per Night Price') || th.textContent?.includes('Total Price')) {
          targetTable = table;
        }
      });
    });

    if (!targetTable) {
      console.warn('⚠️ Price table not found');
      return;
    }

    const tbody = (targetTable as HTMLElement).querySelector('tbody');
    if (!tbody) {
      console.warn('⚠️ Table body not found');
      return;
    }

    // ✅ Calculate numberOfNights from emailPreviewData
    const checkIn = new Date(emailPreviewData?.checkIn || '');
    const checkOut = new Date(emailPreviewData?.checkOut || '');
    const numberOfNights = Math.max(
      1,
      Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
    );

    // ✅ priceIndex increments exactly like flatIndex in handleConfirmAndSendEmail
    // priceIndex 0 = shareOptions[0].Rooms[0]
    // priceIndex 1 = shareOptions[0].Rooms[1]
    // priceIndex 2 = shareOptions[1].Rooms[0]
    // etc.
    let priceIndex = 0;

    const rows = tbody.querySelectorAll('tr');

    rows.forEach((row: HTMLTableRowElement) => {
      const cells = row.querySelectorAll('td');
      if (cells.length === 0) return;

      // Column 4 = Per Night Price, Column 5 = Total Price
      const perNightPriceCell = cells[4];
      const totalPriceCell = cells[5];

      if (!perNightPriceCell || !totalPriceCell) return;

      perNightPriceCell.classList.add('editable-cell');
      totalPriceCell.classList.add('auto-calculated-cell');

      // Get price divs (filter out separator divs)
      const perNightDivs = Array.from(perNightPriceCell.querySelectorAll('div'))
        .filter((div): div is HTMLDivElement => {
          const el = div as HTMLDivElement;
          return !el.style.borderBottom && !!el.textContent?.trim();
        });

      const totalPriceDivs = Array.from(totalPriceCell.querySelectorAll('div'))
        .filter((div): div is HTMLDivElement => {
          const el = div as HTMLDivElement;
          return !el.style.borderBottom && !!el.textContent?.trim();
        });

      if (perNightDivs.length > 1) {
        // ✅ Multiple rooms in this hotel row
        perNightPriceCell.innerHTML = '';
        totalPriceCell.innerHTML = '';

        perNightDivs.forEach((perNightDiv, index) => {
          const perNightText = perNightDiv.textContent?.trim() || '';
          const totalPriceText = totalPriceDivs[index]?.textContent?.trim() || '';

          const perNightPrice = parseFloat(perNightText.replace(/[₹,\s]/g, ''));
          const totalPrice = parseFloat(totalPriceText.replace(/[₹,\s]/g, ''));

          if (index > 0) {
            perNightPriceCell.innerHTML += '<div style="border-bottom:1px solid #ddd; margin:6px 0;"></div>';
            totalPriceCell.innerHTML += '<div style="border-bottom:1px solid #ddd; margin:6px 0;"></div>';
          }

          // ✅ Per Night Price — editable (yellow)
          perNightPriceCell.innerHTML += `
            <div>
              <input
                type="number"
                step="0.01"
                value="${perNightPrice.toFixed(2)}"
                data-per-night-input="true"
                data-row-index="${priceIndex}"
                data-nights="${numberOfNights}"
                style="
                  width: 100%;
                  padding: 4px 8px;
                  border: 2px solid #fbbf24;
                  border-radius: 4px;
                  font-family: 'Trebuchet MS', Helvetica, sans-serif;
                  font-size: 12px;
                  font-weight: bold;
                "
              />
            </div>
          `;

          // ✅ Total Price — read-only, auto-calculated (blue)
          totalPriceCell.innerHTML += `
            <div>
              <input
                type="number"
                step="0.01"
                value="${totalPrice.toFixed(2)}"
                data-total-price-input="true"
                data-row-index="${priceIndex}"
                readonly
                style="
                  width: 100%;
                  padding: 4px 8px;
                  border: 2px solid #3b82f6;
                  border-radius: 4px;
                  font-family: 'Trebuchet MS', Helvetica, sans-serif;
                  font-size: 12px;
                  font-weight: bold;
                  background-color: #f0f9ff;
                  cursor: not-allowed;
                "
              />
            </div>
          `;

          priceIndex++; // ✅ Increment for each room
        });

      } else {
        // ✅ Single room in this hotel row
        const perNightText = perNightPriceCell.textContent?.trim() || '';
        const totalPriceText = totalPriceCell.textContent?.trim() || '';

        const perNightPrice = parseFloat(perNightText.replace(/[₹,\s]/g, ''));
        const totalPrice = parseFloat(totalPriceText.replace(/[₹,\s]/g, ''));

        perNightPriceCell.innerHTML = `
          <input
            type="number"
            step="0.01"
            value="${perNightPrice.toFixed(2)}"
            data-per-night-input="true"
            data-row-index="${priceIndex}"
            data-nights="${numberOfNights}"
            style="
              width: 100%;
              padding: 4px 8px;
              border: 2px solid #fbbf24;
              border-radius: 4px;
              font-family: 'Trebuchet MS', Helvetica, sans-serif;
              font-size: 12px;
              font-weight: bold;
            "
          />
        `;

        totalPriceCell.innerHTML = `
          <input
            type="number"
            step="0.01"
            value="${totalPrice.toFixed(2)}"
            data-total-price-input="true"
            data-row-index="${priceIndex}"
            readonly
            style="
              width: 100%;
              padding: 4px 8px;
              border: 2px solid #3b82f6;
              border-radius: 4px;
              font-family: 'Trebuchet MS', Helvetica, sans-serif;
              font-size: 12px;
              font-weight: bold;
              background-color: #f0f9ff;
              cursor: not-allowed;
            "
          />
        `;

        priceIndex++; // ✅ Increment for single room
      }
    });

    // ✅ Add event listeners — when per night changes, auto-calculate total
    const perNightInputs = iframeDoc.querySelectorAll('input[data-per-night-input="true"]');
    perNightInputs.forEach((input) => {
      const inputElement = input as HTMLInputElement;
      inputElement.addEventListener('input', (e) => {
        const target = e.target as HTMLInputElement;
        const rowIndex = target.getAttribute('data-row-index');
        const nights = parseFloat(target.getAttribute('data-nights') || '1');
        const perNightPrice = parseFloat(target.value || '0');

        // Auto-calculate total
        const totalPrice = perNightPrice * nights;

        // Update corresponding total price input
        const totalPriceInput = iframeDoc.querySelector(
          `input[data-total-price-input="true"][data-row-index="${rowIndex}"]`
        ) as HTMLInputElement;

        if (totalPriceInput) {
          totalPriceInput.value = totalPrice.toFixed(2);
        }
      });
    });

    setIsEditing(true);
  }, [emailPreviewData]);

  const handleEdit = useCallback(() => {
    makeTableEditable();
  }, [makeTableEditable]);

  const handleBack = useCallback(() => {
    if (iframeRef.current && htmlContent) {
      const iframe = iframeRef.current;
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!iframeDoc) return;
      iframeDoc.open();
      iframeDoc.write(htmlContent);
      iframeDoc.close();
    }
    setIsEditing(false);
  }, [htmlContent]);

  const extractEditedPrices = useCallback((): EditedPrice[] | null => {
    const iframe = iframeRef.current;
    if (!iframe) return null;

    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!iframeDoc) return null;

    const perNightInputs = iframeDoc.querySelectorAll('input[data-per-night-input="true"]');
    const totalPriceInputs = iframeDoc.querySelectorAll('input[data-total-price-input="true"]');

    // Not in editing mode — no inputs exist
    if (perNightInputs.length === 0) return null;

    const basePrices = emailPreviewData?.basePrices || [];
    const editedPrices: EditedPrice[] = [];

    perNightInputs.forEach((input, index) => {
      const perNightInput = input as HTMLInputElement;
      const totalPriceInput = totalPriceInputs[index] as HTMLInputElement;

      const perNightPrice = parseFloat(perNightInput.value || '0');
      const totalPrice = parseFloat(totalPriceInput?.value || '0');
      const numberOfNights = parseFloat(perNightInput.getAttribute('data-nights') || '1');

      // ✅ Use data-row-index to look up correct base price
      // data-row-index = priceIndex set during makeTableEditable
      // = flatIndex in handleConfirmAndSendEmail
      // = position in basePrices[]
      // All three are in sync! ✅
      const rowIndex = parseInt(perNightInput.getAttribute('data-row-index') || `${index}`, 10);
      const basePrice = basePrices[rowIndex] ?? 0;
      const newMarkup = totalPrice - basePrice;

      editedPrices.push({
        rowIndex,
        basePrice,
        editedPrice: totalPrice,
        newMarkup,
        perNightPrice,
        numberOfNights,
      });
    });

    return editedPrices;
  }, [emailPreviewData]);

  // const validatePrices = useCallback((editedPrices: EditedPrice[]) => {
  //   const errors: ValidationError[] = [];
  //   editedPrices.forEach((price) => {
  //     if (price.editedPrice < price.basePrice) {
  //       errors.push({
  //         rowIndex: price.rowIndex,
  //         basePrice: price.basePrice,
  //         editedPrice: price.editedPrice,
  //         difference: price.editedPrice - price.basePrice,
  //       });
  //     }
  //   });
  //   return errors;
  // }, []);

  const validatePrices = useCallback((editedPrices: EditedPrice[]) => {
  const errors: ValidationError[] = [];

  // ✅ Build room info from emailPreviewData.hotels (same flatIndex order)
  const roomOrder = emailPreviewData?.hotels?.flatMap((hotel: any) =>
    hotel.Rooms.map((room: any) => ({
      hotelName: hotel.hotel_name,
      roomType: room.RoomType,
      mealPlan: room.MealPlan,
    }))
  ) || [];

  editedPrices.forEach((price) => {

    // ✅ Calculate base per night price
    const basePerNightPrice = price.numberOfNights > 0
      ? price.basePrice / price.numberOfNights
      : price.basePrice;

    // ✅ Validate per night price NOT total price
    if (price.perNightPrice < basePerNightPrice) {
      const roomInfo = roomOrder[price.rowIndex];

      errors.push({
        rowIndex: price.rowIndex,
        basePrice: price.basePrice,
        basePerNightPrice: basePerNightPrice,      // ✅ base per night
        editedPrice: price.perNightPrice,          // ✅ edited per night
        editedTotalPrice: price.editedPrice,       // ✅ calculated total
        difference: price.perNightPrice - basePerNightPrice, // ✅ per night diff
        hotelName: roomInfo?.hotelName || '',      // ✅ hotel name
        roomType: roomInfo?.roomType || '',        // ✅ room type
        mealPlan: roomInfo?.mealPlan || '',        // ✅ meal plan
      });
    }
  });

  return errors;
}, [emailPreviewData]);

  const handleConfirmSend = useCallback(async () => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!iframeDoc) return;

    const editedPrices = extractEditedPrices();

    // Validate prices if editing
    if (editedPrices) {
      const priceErrors = validatePrices(editedPrices);
      if (priceErrors.length > 0) {
        setValidationErrors(priceErrors);
        setShowValidationError(true);
        return;
      }
    }

    // If editing — replace inputs with plain text before sending HTML
    if (isEditing && iframeDoc) {
      const tables = iframeDoc.querySelectorAll('table');
      let targetTable: HTMLTableElement | null = null;

      tables.forEach(table => {
        const headerCells = table.querySelectorAll('th');
        headerCells.forEach(th => {
          if (th.textContent?.includes('Per Night Price') || th.textContent?.includes('Total Price')) {
            targetTable = table;
          }
        });
      });

      if (targetTable) {
        const tbody = (targetTable as HTMLElement).querySelector('tbody');
        if (tbody) {
          const rows = tbody.querySelectorAll('tr');

          rows.forEach((row: HTMLTableRowElement) => {
            const cells = row.querySelectorAll('td');
            if (cells.length === 0) return;

            const perNightPriceCell = cells[4];
            const totalPriceCell = cells[5];
            if (!perNightPriceCell || !totalPriceCell) return;

            const perNightInputs = perNightPriceCell.querySelectorAll('input[data-per-night-input="true"]');
            const totalPriceInputs = totalPriceCell.querySelectorAll('input[data-total-price-input="true"]');

            if (perNightInputs.length > 1) {
              // Multiple rooms
              let perNightHtml = '';
              let totalPriceHtml = '';

              perNightInputs.forEach((input, index) => {
                const perNightInput = input as HTMLInputElement;
                const totalPriceInput = totalPriceInputs[index] as HTMLInputElement;

                if (index > 0) {
                  perNightHtml += '<div style="border-bottom:1px solid #ddd; margin:6px 0;"></div>';
                  totalPriceHtml += '<div style="border-bottom:1px solid #ddd; margin:6px 0;"></div>';
                }

                perNightHtml += `<div>${parseFloat(perNightInput.value).toFixed(2)}</div>`;
                totalPriceHtml += `<div>${parseFloat(totalPriceInput.value).toFixed(2)}</div>`;
              });

              perNightPriceCell.innerHTML = perNightHtml;
              totalPriceCell.innerHTML = totalPriceHtml;

            } else if (perNightInputs.length === 1) {
              // Single room
              const perNightInput = perNightInputs[0] as HTMLInputElement;
              const totalPriceInput = totalPriceInputs[0] as HTMLInputElement;

              perNightPriceCell.innerHTML = parseFloat(perNightInput.value).toFixed(2);
              totalPriceCell.innerHTML = parseFloat(totalPriceInput.value).toFixed(2);
            }

            // Remove highlight classes
            perNightPriceCell.classList.remove('editable-cell');
            totalPriceCell.classList.remove('auto-calculated-cell');
            perNightPriceCell.removeAttribute('style');
            totalPriceCell.removeAttribute('style');
          });
        }
      }

      // Remove injected CSS
      const styleElements = iframeDoc.querySelectorAll('style');
      styleElements.forEach(styleEl => {
        if (styleEl.textContent?.includes('editable-cell') ||
          styleEl.textContent?.includes('auto-calculated-cell')) {
          styleEl.remove();
        }
      });
    }

    const editedHtml = iframeDoc.documentElement.outerHTML;

    setIsSending(true);
    try {
      await onConfirmSend(editedHtml, editedPrices);
      setIsSending(false);
    } catch (error) {
      setIsSending(false);
      console.error('Error sending email:', error);
    }
  }, [onConfirmSend, extractEditedPrices, validatePrices, isEditing]);

  const handleCloseValidation = useCallback(() => {
    setShowValidationError(false);
    setValidationErrors([]);
  }, []);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[95vh] h-full flex flex-col overflow-hidden">

          {/* Header */}
          <div className="bg-gradient-to-r from-[#0B5CAD] via-[#0A4F95] to-[#073B6D] text-white px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Email Preview</h2>
                <p className="text-purple-100 text-sm">
                  {isEditing
                    ? 'Edit per night price — total auto-calculates'
                    : 'Review before sending'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Info Banner — only shown in edit mode */}
          {isEditing && (
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-b-2 border-amber-200 px-6 py-3">
              <div className="flex items-center gap-3">
                <div className="bg-amber-100 p-2 rounded-lg">
                  <span className="text-xl">✏️</span>
                </div>
                <p className="text-amber-900 text-sm font-semibold">
                  📝 Only <span className="text-yellow-700">Per Night Price (yellow)</span> is editable.{' '}
                  <span className="text-blue-700">Total Price (blue)</span> auto-calculates based on number of nights.
                </p>
              </div>
            </div>
          )}

          {/* Body */}
          <div className="flex-1 overflow-hidden p-4 bg-gray-50">
            <div className="h-full bg-white rounded-lg shadow-sm border-2 border-gray-200 overflow-hidden">
              <iframe
                ref={iframeRef}
                title="Email Preview"
                className="w-full h-full border-0"
                sandbox="allow-same-origin"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="bg-white border-t-2 border-gray-200 px-6 py-4 flex justify-between items-center">
            <div className="flex gap-3">
              {isEditing && (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Preview
                </button>
              )}
              {!isEditing && (
                <div className="text-sm text-gray-600 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                  Ready to send with current prices
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-5 py-2 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>

              {!isEditing ? (
                <>
                  <button
                    onClick={handleEdit}
                    className="flex items-center gap-2 px-5 py-2 bg-white border-2 border-[#0B5CAD] text-[#0B5CAD] hover:bg-[#0B5CAD] hover:text-white font-semibold rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={handleConfirmSend}
                    disabled={isSending}
                    className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#0B5CAD] via-[#0A4F95] to-[#073B6D] hover:from-[#0A4F95] hover:via-[#073B6D] hover:to-[#052A4F] text-white font-semibold rounded-lg transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Email
                      </>
                    )}
                  </button>
                </>
              ) : (
                <button
                  onClick={handleConfirmSend}
                  disabled={isSending}
                  className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#0B5CAD] via-[#0A4F95] to-[#073B6D] hover:from-[#0A4F95] hover:via-[#073B6D] hover:to-[#052A4F] text-white font-semibold rounded-lg transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Confirm & Send Email
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <PriceValidationModal
        isOpen={showValidationError}
        onClose={handleCloseValidation}
        validationErrors={validationErrors}
      />
    </>
  );
};

export default EmailPreviewModal;
