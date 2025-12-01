'use client';

import { X } from 'lucide-react';
import { useEffect } from 'react';
import MachineGallery from './MachineGallery';
import { mediaURL } from '@/lib/images';

interface MachineDetailsModalProps {
  machine: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function MachineDetailsModal({ machine, isOpen, onClose }: MachineDetailsModalProps) {
  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !machine) return null;

  const machineAttrs = machine.attributes || machine;
  const cardPhoto = machineAttrs.cardPhoto?.data?.attributes || machineAttrs.cardPhoto;
  const cardPhotoUrl = mediaURL(cardPhoto);
  const gallery = machineAttrs.gallery?.data || machineAttrs.gallery || [];
  const galleryUrls = gallery.map((img: any) => {
    const imgAttrs = img.attributes || img;
    return mediaURL(imgAttrs);
  }).filter(Boolean);

  const specifications = machineAttrs.specifications?.data || machineAttrs.specifications || [];
  const features = machineAttrs.features?.data || machineAttrs.features || [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black bg-opacity-50">
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl my-8 mx-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-6 h-6 text-gray-700" />
        </button>

        {/* Modal Content */}
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
          {/* Header with Image */}
          {cardPhotoUrl && (
            <div className="relative h-64 md:h-80 bg-gray-200">
              <img
                src={cardPhotoUrl}
                alt={machineAttrs.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {machineAttrs.name}
                </h2>
                <div className="flex items-center gap-4 text-white">
                  <span className="text-sm">Typ: {machineAttrs.type}</span>
                  {machineAttrs.basePricePerDay && (
                    <span className="text-lg font-semibold">
                      Od {machineAttrs.basePricePerDay} zł/dzień
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-6 md:p-8 max-h-[60vh] overflow-y-auto">
            {/* Fleet Overview */}
            {machineAttrs.fleetOverview && (
              <div className="mb-8">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {machineAttrs.fleetOverview}
                </p>
              </div>
            )}

            {/* Features */}
            {features.length > 0 && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[#253551] mb-4">Cechy</h3>
                <div className="space-y-6">
                  {features.map((feature: any, index: number) => {
                    const featureAttrs = feature.attributes || feature;
                    const featureImageUrl = mediaURL(featureAttrs.image);
                    return (
                      <div key={index} className="border-l-4 border-[#253551] pl-4">
                        <h4 className="text-xl font-semibold text-gray-900 mb-2">
                          {featureAttrs.title}
                        </h4>
                        <div
                          className="prose prose-sm max-w-none text-gray-700"
                          dangerouslySetInnerHTML={{ __html: featureAttrs.content }}
                        />
                        {featureImageUrl && (
                          <img
                            src={featureImageUrl}
                            alt={featureAttrs.title}
                            className="mt-3 rounded-lg w-full max-h-64 object-cover"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Gallery */}
            {galleryUrls.length > 0 && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[#253551] mb-4">Galeria</h3>
                <MachineGallery images={galleryUrls} machineName={machineAttrs.name} />
              </div>
            )}

            {/* Specifications */}
            {specifications.length > 0 && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[#253551] mb-4">Specyfikacja</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {specifications.map((spec: any, index: number) => {
                    const specAttrs = spec.attributes || spec;
                    return (
                      <div key={index} className="flex items-start gap-2 text-gray-700">
                        {specAttrs.icon && (
                          <span className="text-[#253551] font-medium">{specAttrs.icon}</span>
                        )}
                        <div>
                          <span className="font-medium">{specAttrs.label}:</span>{' '}
                          <span>{specAttrs.value}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t">
            <button
              onClick={onClose}
              className="w-full bg-[#253551] text-white py-3 rounded-lg hover:bg-[#1a2840] transition-colors font-medium"
            >
              Zamknij
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
