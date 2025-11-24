import { fetchStrapiOrNull } from '@/lib/strapi'
import { StrapiSingle } from '@/types/strapi'
import { fromStrapiRatePage } from '@/lib/adapters/rate-page'
import { POP_RATE_PAGE } from '@/lib/populate'
import PageHero from '@/components/walden/PageHero'
import RateItemCard from '@/components/RateItemCard'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

export default async function RatePage() {
  // Fetch rate page data from Strapi with deep population
  const ratePageRes = await fetchStrapiOrNull<StrapiSingle<any>>('/api/rate', {
    params: {
      populate: {
        pageImage: true,
        includedDetails: {
          populate: '*'
        },
        extraPaidItemsDetails: {
          populate: '*'
        }
      }
    },
    revalidate: 3600,
  })

  const ratePage = ratePageRes?.data ? fromStrapiRatePage(ratePageRes.data) : null

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <PageHero
        title={ratePage?.pageTitle || 'Cennik'}
        description={ratePage?.pageDescription || ''}
        backgroundImage={ratePage?.pageImage || null}
      />

      {/* Content Area */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-[3vw]">

          {/* Included Details Section */}
          {ratePage?.includedDetails && (
            <div className="mb-24">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-[#253551] mb-4">
                  {ratePage.includedDetails.header}
                </h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  {ratePage.includedDetails.description}
                </p>
              </div>

              {ratePage.includedDetails.items.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {ratePage.includedDetails.items.map((item, index) => (
                    <RateItemCard key={index} item={item} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Booking Details Section (Markdown) */}
          {ratePage?.bookingDetails && (
            <div className="mb-24 max-w-4xl mx-auto">
              <div className="prose prose-lg prose-headings:text-[#253551] prose-p:text-gray-700 prose-ul:text-gray-700 prose-img:rounded-lg max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    img: ({ node, ...props }) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        {...props}
                        src={props.src?.startsWith('http') ? props.src : `http://localhost:1340${props.src}`}
                        alt={props.alt || ''}
                        className="w-full h-auto rounded-lg"
                      />
                    ),
                  }}
                >
                  {ratePage.bookingDetails}
                </ReactMarkdown>
              </div>
            </div>
          )}

          {/* Extra Paid Items Section */}
          {ratePage?.extraPaidItemsDetails && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-[#253551] mb-4">
                  {ratePage.extraPaidItemsDetails.header}
                </h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  {ratePage.extraPaidItemsDetails.description}
                </p>
              </div>

              {ratePage.extraPaidItemsDetails.items.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {ratePage.extraPaidItemsDetails.items.map((item, index) => (
                    <RateItemCard key={index} item={item} />
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </section>
    </main>
  )
}
