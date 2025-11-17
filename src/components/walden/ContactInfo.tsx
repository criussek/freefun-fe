import { Mail, Phone, MapPin } from 'lucide-react'
import { SiteSettings } from '@/types/domain'

interface ContactInfoProps {
  siteSettings?: SiteSettings
}

export default function ContactInfo({ siteSettings }: ContactInfoProps) {
  const contactEmail = siteSettings?.contactEmail || 'info@3fun.com'
  const contactPhone = siteSettings?.contactPhone || '+48 123 456 789'
  const contactAddress = siteSettings?.contactAddress || 'Warszawa, Polska'

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Email Card */}
      <div className="bg-white p-8 rounded-lg border-2 border-gray-200 hover:border-[#253551] transition-colors text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-[#253551] p-4 rounded-full">
            <Mail size={32} className="text-white" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-[#253551] mb-2">Email</h3>
        <a
          href={`mailto:${contactEmail}`}
          className="text-gray-700 hover:text-[#253551] transition-colors break-all"
        >
          {contactEmail}
        </a>
      </div>

      {/* Phone Card */}
      <div className="bg-white p-8 rounded-lg border-2 border-gray-200 hover:border-[#253551] transition-colors text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-[#253551] p-4 rounded-full">
            <Phone size={32} className="text-white" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-[#253551] mb-2">Telefon</h3>
        <a
          href={`tel:${contactPhone}`}
          className="text-gray-700 hover:text-[#253551] transition-colors"
        >
          {contactPhone}
        </a>
      </div>

      {/* Address Card */}
      <div className="bg-white p-8 rounded-lg border-2 border-gray-200 hover:border-[#253551] transition-colors text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-[#253551] p-4 rounded-full">
            <MapPin size={32} className="text-white" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-[#253551] mb-2">Adres</h3>
        <p className="text-gray-700">{contactAddress}</p>
      </div>
    </div>
  )
}
