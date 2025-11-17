import { Mail, Phone, MapPin } from 'lucide-react'
import { SiteSettings } from '@/types/domain'

interface ContactInfoSidebarProps {
  siteSettings?: SiteSettings
}

export default function ContactInfoSidebar({ siteSettings }: ContactInfoSidebarProps) {
  const contactEmail = siteSettings?.contactEmail || 'info@3fun.com'
  const contactPhone = siteSettings?.contactPhone || '+48 123 456 789'
  const contactAddress = siteSettings?.contactAddress || 'Warszawa, Polska'

  return (
    <div className="space-y-6 sticky top-8">
      {/* Email */}
      <div className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-[#253551] transition-colors">
        <div className="flex items-start space-x-4">
          <div className="bg-[#253551] p-3 rounded-full flex-shrink-0">
            <Mail size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#253551] mb-1">Email</h3>
            <a
              href={`mailto:${contactEmail}`}
              className="text-gray-700 hover:text-[#253551] transition-colors break-all text-sm"
            >
              {contactEmail}
            </a>
          </div>
        </div>
      </div>

      {/* Phone */}
      <div className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-[#253551] transition-colors">
        <div className="flex items-start space-x-4">
          <div className="bg-[#253551] p-3 rounded-full flex-shrink-0">
            <Phone size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#253551] mb-1">Telefon</h3>
            <a
              href={`tel:${contactPhone}`}
              className="text-gray-700 hover:text-[#253551] transition-colors text-sm"
            >
              {contactPhone}
            </a>
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-[#253551] transition-colors">
        <div className="flex items-start space-x-4">
          <div className="bg-[#253551] p-3 rounded-full flex-shrink-0">
            <MapPin size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#253551] mb-1">Adres</h3>
            <p className="text-gray-700 text-sm">{contactAddress}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
