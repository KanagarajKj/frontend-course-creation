import React from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { X } from 'lucide-react';

const PreviewModal = ({ isOpen, setIsOpen, formData }) => {
  if (!formData) {
    return null;
  }

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <DialogBackdrop
        className="fixed inset-0 bg-black/30"
        aria-hidden="true"
      />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-3xl rounded-lg bg-white">
            {/* Header */}
            <div className="flex items-center justify-between border-b p-4">
              <DialogTitle className="text-lg font-semibold">
                Course Preview
              </DialogTitle>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-6 p-4 max-h-[70vh] overflow-y-auto">
              {/* Cover Image */}
              <div>
                <h3 className="font-semibold mb-2">Cover Image</h3>
                {formData?.coverImage ? (
                  <img 
                    src={formData.coverImage} 
                    alt="Course cover" 
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">No cover image uploaded</span>
                  </div>
                )}
              </div>

              {/* Sales Video */}
              <div>
                <h3 className="font-semibold mb-2">Sales Video</h3>
                {formData?.salesVideo ? (
                    formData.salesVideo.includes("youtube.com") ? (
                    <iframe
                        src={formData.salesVideo.replace("watch?v=", "embed/")}
                        title="Sales Video"
                        className="w-full rounded-lg"
                        allowFullScreen
                    />
                    ) : (
                    <video 
                        src={formData.salesVideo} 
                        controls 
                        className="w-full rounded-lg"
                    />
                    )
                ) : (
                    <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">No video uploaded</span>
                    </div>
                )}
              </div>

              {/* Course Details */}
              <div>
                <h3 className="font-semibold mb-2">Course Details</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Title</p>
                      <p className="font-medium">{formData?.title || 'Not set'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Category</p>
                      <p className="font-medium">{formData?.category || 'Not set'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-medium">{`${formData?.duration} Hours` || 'Not set'}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Description</p>
                    <p className="font-medium">{formData?.description || 'No description provided'}</p>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              {(formData?.faqQuestion || formData?.faqAnswer) && (
                <div>
                  <h3 className="font-semibold mb-2">FAQ</h3>
                  <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                    {formData?.faqQuestion && (
                      <div>
                        <p className="text-sm text-gray-500">Question</p>
                        <p className="font-medium">{formData.faqQuestion}</p>
                      </div>
                    )}
                    {formData?.faqAnswer && (
                      <div>
                        <p className="text-sm text-gray-500">Answer</p>
                        <p className="font-medium">{formData.faqAnswer}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t p-4 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Close Preview
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default PreviewModal;