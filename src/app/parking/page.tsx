import { fetchStrapiOrNull } from '@/lib/strapi'
import { StrapiSingle } from '@/types/strapi'
import { fromStrapiParkingPage } from '@/lib/adapters/parking-page'
import { POP_PARKING_PAGE } from '@/lib/populate'
import PageHero from '@/components/walden/PageHero'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

export default async function ParkingPage() {
  // Fetch parking page data
  const parkingPageRes = await fetchStrapiOrNull<StrapiSingle<any>>('/api/parking', {
    params: POP_PARKING_PAGE,
    revalidate: 3600,
  })

  const parkingPage = parkingPageRes?.data ? fromStrapiParkingPage(parkingPageRes.data) : undefined

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <PageHero
        title={parkingPage?.pageTitle || 'Parking'}
        description={parkingPage?.pageDescription || ''}
        backgroundImage={parkingPage?.pageImage || null}
      />

      {/* Content Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {parkingPage?.pageOverview && (
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
                  {parkingPage.pageOverview}
                </ReactMarkdown>
              </div>
            </div>
          )}

        </div>
      </section>
    </main>
  )
}
