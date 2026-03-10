
import React, { useCallback, useRef,} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { hotelTypes, icons, ui } from '@/index';

export const ShareModal = React.memo<hotelTypes.ShareModalProps>(({
  isOpen = false,
  onClose,
  formData = {},
  toEmailList = [],
  ccEmailList = [],
  errors = {},
  isLoading = false,
  onSubmit,
  handleChange,
  handleAddEmail,
  handleDeleteEmail,
  handleApproverEmailBlur,
  toEmail = '',
  setToEmail,
  ccEmail = '',
  setCcEmail
}) => {

  const inputRefs = useRef<{[key: string]: HTMLInputElement | HTMLTextAreaElement | null}>({});

  const handleKeyDown = useCallback((
    e: React.KeyboardEvent<HTMLInputElement>,
    email: string,
    field: 'toEmail' | 'ccEmail'
  ) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      handleAddEmail(email, field);
    }
  }, [handleAddEmail]);

  const handleCcEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCcEmail(e.target.value);
  }, [setCcEmail]);

  const handleCcEmailBlur = useCallback(() => {
    if (ccEmail) {
      handleAddEmail(ccEmail, 'ccEmail');
    }
  }, [ccEmail, handleAddEmail]);

  const handleCcEmailKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    handleKeyDown(e, ccEmail, 'ccEmail');
  }, [ccEmail, handleKeyDown]);

  const handleMarkupChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  // Allow only digits and max one decimal point
  if (/^\d*\.?\d*$/.test(value)) {
    handleChange({ ...e, target: { ...e.target, name: 'markup', value } });
  }
}, [handleChange]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <DialogPrimitive.Root open={isOpen} onOpenChange={onClose}>
        <DialogPrimitive.Portal forceMount>
          <DialogPrimitive.Overlay asChild forceMount>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-9999 bg-black/60 backdrop-blur-sm"
            />
          </DialogPrimitive.Overlay>
          <DialogPrimitive.Content asChild forceMount>
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="fixed left-[50%] top-[50%] z-9999 translate-x-[-50%] translate-y-[-50%] w-full max-w-2xl max-h-[95vh] overflow-hidden"
            >
              <div className="bg-white rounded-2xl shadow-2xl border-2 border-purple-200/50 overflow-hidden">
                {/* Custom Header with Enhanced Gradient */}
                <div className="relative bg-linear-to-br from-[#0B5CAD] via-[#0A4F95] to-[#073B6D] text-white px-6 py-5 overflow-hidden">
                  {/* Animated background elements */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24 blur-2xl"></div>
                  <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-purple-300/10 rounded-full blur-xl"></div>

                  <div className="relative flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="bg-white/20 backdrop-blur-md p-3 rounded-xl shadow-lg">
                        <icons.Send className="w-6 h-6" />
                      </div>
                      {/* <div>
                        <h2 className="text-2xl font-bold tracking-tight">Share Options</h2>
                        <p className="text-purple-100 text-sm mt-0.5">Send hotel details to your client</p>
                      </div> */}

                      <div>
  <DialogPrimitive.Title asChild>
    <h2 className="text-2xl font-bold tracking-tight">Share Options</h2>
  </DialogPrimitive.Title>
  <DialogPrimitive.Description asChild>
    <p className="text-purple-100 text-sm mt-0.5">Send hotel details to your client</p>
  </DialogPrimitive.Description>
</div>
                    </div>
                    <DialogPrimitive.Close asChild>
                      <ui.Button className="text-white/80 hover:text-white hover:bg-white/20 rounded-xl p-2.5 transition-all hover:rotate-90 duration-300">
                        <icons.X className="w-5 h-5" />
                      </ui.Button>
                    </DialogPrimitive.Close>
                  </div>
                </div>

                {/* Body with enhanced styling */}
                <div className="py-6 px-6 overflow-y-auto max-h-[calc(100vh-200px)] custom-scrollbar">
                  <div className="space-y-6">
                    {/* Booking ID & Client Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-3">

                      <div className="space-y-2">
                        <ui.Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <div className="w-1.5 h-5 bg-linear-to-b from-[#0B5CAD] to-[#0A4F95] rounded-full"></div>
                          SPOC Name <span className="text-red-500">*</span>
                        </ui.Label>
                        <div className="relative group">
                          <icons.UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#0B5CAD] transition-colors" />
                          <ui.Input
                            ref={(el) => { inputRefs.current['spocName'] = el; }}
                            name="spocName"
                            type="text"
                            placeholder="Enter SPOC name"
                            className={`pl-10 h-11 transition-all ${errors?.spocName
                                ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-200'
                                : 'border-gray-200 focus:border-[#0B5CAD] focus:ring-[#0B5CAD]/20'
                              }`}
                            value={formData?.spocName || ''}
                            onChange={handleChange}
                            disabled
                          />
                        </div>
                        {errors?.spocName && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-xs flex items-center gap-1.5 bg-red-50 px-2 py-1 rounded-md"
                          >
                            <icons.AlertCircle className="w-3.5 h-3.5" />
                            {errors.spocName}
                          </motion.p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <ui.Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <div className="w-1.5 h-5 bg-linear-to-b from-[#0B5CAD] to-[#0A4F95] rounded-full"></div>
                          Client Name
                        </ui.Label>
                        <div className="relative group">
                          <icons.User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#0B5CAD] transition-colors" />
                          <ui.Input
                            name="clientName"
                            type="text"
                            className="pl-10 bg-linear-to-br from-gray-50 to-gray-100 border-gray-200 h-11 font-medium"
                            value={formData?.clientName || ''}
                            disabled
                          />
                        </div>
                      </div>
                    </div>

                    {/* SPOC Name & Markup */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-3">
                      
                       <div className="space-y-2">
                        <ui.Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <div className="w-1.5 h-5 bg-linear-to-b from-[#0B5CAD] to-[#0A4F95] rounded-full"></div>
                          Reference No
                        </ui.Label>
                        <div className="relative group">
                          <icons.Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#0B5CAD] transition-colors" />
                          <ui.Input
                            name="referenceNo"
                            type="text"
                            className="pl-10 bg-linear-to-br from-gray-50 to-gray-100 border-gray-200 h-11 font-medium"
                            value={formData?.bookingId || ''}
                            disabled
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        {/* <ui.Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <div className="w-1.5 h-5 bg-linear-to-b from-[#0B5CAD] to-[#0A4F95] rounded-full"></div>
                          Markup (₹)
                        </ui.Label> */}
                       <div className="flex items-center gap-1 flex-nowrap">
  <ui.Label className="text-sm font-semibold text-gray-700 flex items-center gap-2 whitespace-nowrap">
    <div className="w-1.5 h-5 bg-linear-to-b from-[#0B5CAD] to-[#0A4F95] rounded-full"></div>
    Markup (₹)
  </ui.Label>

  <span className="text-[9px] font-normal text-gray-500 truncate">
    This amount will be added to each room price
  </span>
</div>


                        <div className="relative group">
                          <icons.TrendingUp className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#0B5CAD] transition-colors" />
                          <ui.Input
                            ref={(el) => { inputRefs.current['markup'] = el; }}
                            name="markup"
                            // type="number"
                            type="text"
                            // step="0.01"
                            placeholder="0.00"
                            className="pl-10 h-11 transition-all border-gray-200 focus:border-[#0B5CAD] focus:ring-[#0B5CAD]/20"
                            value={formData?.markup || ''}
                            // onChange={handleChange}
                            onChange={handleMarkupChange}
                          />
                        </div>
                        {/* <p className="text-xs text-gray-500">This amount will be added to each room price</p> */}
                      </div>
                    </div>

                    {/* Approver Email */}
                    <div className="space-y-2 mb-3">
                      <ui.Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <div className="w-1.5 h-5 bg-linear-to-b from-[#0B5CAD] to-[#0A4F95] rounded-full"></div>
                        Approver Email <span className="text-red-500">*</span>
                      </ui.Label>
                      <div className="relative group">
                        <icons.Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#0B5CAD] transition-colors" />
                        <ui.Input
                          ref={(el) => { inputRefs.current['spocEmail'] = el; }}
                          name="spocEmail"
                          type="email"
                          placeholder="approver@company.com"
                          className={`pl-10 h-11 transition-all ${errors?.spocEmail
                              ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-200'
                              : 'border-gray-200 focus:border-[#0B5CAD] focus:ring-[#0B5CAD]/20'
                            }`}
                          value={formData?.spocEmail || ''}
                          onChange={handleChange}
                          onBlur={handleApproverEmailBlur}
                          disabled
                        />
                      </div>
                      {errors?.spocEmail && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-xs flex items-center gap-1.5 bg-red-50 px-2 py-1 rounded-md"
                        >
                          <icons.AlertCircle className="w-3.5 h-3.5" />
                          {errors.spocEmail}
                        </motion.p>
                      )}
                    </div>

                    {/* CC Email with enhanced tags */}
                    <div className="space-y-2 mb-3">
                      <ui.Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <div className="w-1.5 h-5 bg-linear-to-b from-[#0B5CAD] to-[#0A4F95] rounded-full"></div>
                        CC Email
                        <span className="text-xs text-gray-500 font-normal">(Optional)</span>
                      </ui.Label>
                      <div className={`flex flex-wrap gap-2 border rounded-lg p-3 min-h-14 transition-all ${errors?.ccEmail
                          ? 'border-red-300 bg-red-50'
                          : 'border-gray-200 bg-white hover:border-[#0B5CAD]/50'
                        } focus-within:border-[#0B5CAD] focus-within:ring-2 focus-within:ring-[#0B5CAD]/20 focus-within:bg-blue-50/30`}>
                        <AnimatePresence mode="popLayout">
                          {ccEmailList && ccEmailList.length > 0 && ccEmailList.map((email) => (
                            <motion.div
                              key={email}
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.8, opacity: 0 }}
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            >
                              <ui.Badge
                                variant="default"
                                className="bg-linear-to-r from-[#0B5CAD] to-[#0A4F95] hover:from-[#0A4F95] hover:to-[#073B6D] text-white px-3 py-1 gap-2 shadow-sm hover:shadow-md transition-all"
                              >
                                <icons.Mail className="w-3 h-3" />
                                <span className="break-all font-medium">{email}</span>
                                <ui.Button
                                  type="button"
                                  onClick={() => handleDeleteEmail(email, 'ccEmail')}
                                  className="hover:bg-white/30 rounded-full p-1 transition-colors"
                                >
                                  <icons.X className="w-3 h-3" />
                                </ui.Button>
                              </ui.Badge>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                        <ui.Input
                          type="email"
                          placeholder="Type email and press Enter or comma"
                          className="flex-1 min-w-50 outline-none text-sm bg-transparent placeholder:text-gray-400 border border-gray-200 focus:border-[#0B5CAD] focus:ring-2 focus:ring-[#0B5CAD]/20"
                          value={ccEmail}
                          onChange={handleCcEmailChange}
                          onBlur={handleCcEmailBlur}
                          onKeyDown={handleCcEmailKeyDown}
                        />
                      </div>
                      {errors?.ccEmail && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-xs flex items-center gap-1.5 bg-red-50 px-2 py-1 rounded-md"
                        >
                          <icons.AlertCircle className="w-3.5 h-3.5" />
                          {errors.ccEmail}
                        </motion.p>
                      )}
                    </div>

                    {/* Remark with enhanced styling */}
                    <div className="space-y-2 mb-3">
                      <ui.Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <div className="w-1.5 h-5 bg-linear-to-b from-[#0B5CAD] to-[#0A4F95] rounded-full"></div>
                        Remark
                        <span className="text-xs text-gray-500 font-normal">(Optional)</span>
                      </ui.Label>
                      <div className="relative group">
                        <icons.MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400 group-focus-within:text-[#0B5CAD] transition-colors" />
                        <ui.Textarea
                          ref={(el) => { inputRefs.current['remark'] = el; }}
                          name="remark"
                          rows={3}
                          placeholder="Add any additional notes or instructions..."
                          className="pl-10 resize-none border-gray-200 focus:border-[#0B5CAD] focus:ring-[#0B5CAD]/20 hover:border-[#0B5CAD]/50 transition-all"
                          value={formData?.remark || ''}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Footer */}
                <div className="px-6 py-4 bg-linear-to-br from-gray-50 via-blue-50/30 to-gray-50 border-t-2 border-purple-100/50 flex justify-end gap-3">
                  <ui.Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="font-semibold border-2 text-gray-400 hover:bg-gray-100 hover:border-[#0B5CAD] hover:text-[#0B5CAD] transition-all"
                  >
                    <icons.X className="w-4 h-4 mr-2" />
                    Cancel
                  </ui.Button>
                  <ui.Button
                    type="button"
                    onClick={onSubmit}
                    disabled={isLoading}
                    className="bg-linear-to-r from-[#0B5CAD] via-[#0A4F95] to-[#073B6D] hover:from-[#0A4F95] hover:via-[#073B6D] hover:to-[#052A4F] text-white font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed px-6"
                  >
                    {isLoading ? (
                      <>
                        <icons.Loader2 className="w-4 h-4 animate-spin mr-1" />
                        SENDING...
                      </>
                    ) : (
                      <>
                        <icons.Send className="w-4 h-4 mr-2" />
                        PREVIEW
                      </>
                    )}
                  </ui.Button>
                </div>
              </div>
            </motion.div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </AnimatePresence>
  );
}, (prevProps, nextProps) => {
  // ✅ OPTIMIZED: Fast shallow comparisons only
  
  // Fast primitive checks
  if (prevProps.isOpen !== nextProps.isOpen) return false;
  if (prevProps.isLoading !== nextProps.isLoading) return false;
  if (prevProps.toEmail !== nextProps.toEmail) return false;
  if (prevProps.ccEmail !== nextProps.ccEmail) return false;
  

  // ✅ Shallow compare formData keys (NO JSON.stringify!)
const formDataKeys: Array<keyof hotelTypes.ShareFormData> = 
  ['bookingId', 'clientName', 'spocName', 'spocEmail', 'markup', 'remark'];

for (const key of formDataKeys) {
  if (prevProps.formData?.[key] !== nextProps.formData?.[key]) return false;
}

// ✅ Array length + reference check (fast enough)
if (prevProps.toEmailList?.length !== nextProps.toEmailList?.length) return false;
if (prevProps.ccEmailList?.length !== nextProps.ccEmailList?.length) return false;
if (prevProps.toEmailList !== nextProps.toEmailList) return false;
if (prevProps.ccEmailList !== nextProps.ccEmailList) return false;

// ✅ Errors object check
if (prevProps.errors !== nextProps.errors) {
  const errorKeys: Array<keyof hotelTypes.ShareFormErrors> = 
    ['bookingId', 'clientName', 'spocName', 'spocEmail', 'markup', 'remark', 'ccEmail', 'toEmail'];
  
  for (const key of errorKeys) {
    if (prevProps.errors?.[key] !== nextProps.errors?.[key]) return false;
  }
}

// ✅ All props are the same, skip re-render
return true;
});

ShareModal.displayName = 'ShareModal';
