import { RateItem } from '@/types/domain'

interface RateItemCardProps {
  item: RateItem
}

export default function RateItemCard({ item }: RateItemCardProps) {
  return (
    <div className="text-center">
      <h3 className="text-xl md:text-2xl font-semibold mb-4 text-[#253551]" style={{ whiteSpace: 'pre-wrap' }}>
        {item.title}
      </h3>
      <p className="text-base text-gray-700 mb-4" style={{ whiteSpace: 'pre-wrap' }}>
        {item.description}
      </p>
      {item.price && (
        <p className="text-base font-bold text-[#253551]" style={{ whiteSpace: 'pre-wrap' }}>
          {item.price}
        </p>
      )}
    </div>
  )
}
