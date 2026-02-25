import { fetchStrapiOrNull } from '@/lib/strapi'
import { StrapiSingle } from '@/types/strapi'
import { fromStrapiTermsAndConditionsPage } from '@/lib/adapters/terms-and-conditions-page'
import { POP_TERMS_AND_CONDITIONS_PAGE } from '@/lib/populate'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

export default async function TermsAndConditionsPage() {
  const termsPageRes = await fetchStrapiOrNull<StrapiSingle<any>>('/api/terms-and-condition', {
    params: POP_TERMS_AND_CONDITIONS_PAGE,
    revalidate: 3600,
  })

  const termsPage = termsPageRes?.data ? fromStrapiTermsAndConditionsPage(termsPageRes.data) : undefined

  return (
    <main className="min-h-screen bg-white">
      <section className="pt-12 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {termsPage?.pageTitle && (
            <h1 className="text-3xl font-bold mb-6">{termsPage.pageTitle}</h1>
          )}
          {termsPage?.pageDescription && (
            <p className="text-lg text-gray-600 mb-8">{termsPage.pageDescription}</p>
          )}
          {termsPage?.pageOverview && (
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              >
                {termsPage.pageOverview}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
