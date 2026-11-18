// Questions and answers for search engines and AI answer engines (ChatGPT, Perplexity,
// Google AI Overviews). Shows on the page and adds matching FAQPage schema, so both
// always say the same thing. Edit the text here.
import { Helmet } from 'react-helmet-async'
import Diamond from './Diamond'
import Reveal from './Reveal'

export const FAQS = [
  {
    q: 'What is a Travelpreneur™?',
    a: 'A Travelpreneur™ is a travel creator or travel-savvy entrepreneur who earns from what they know about travel, through offers they own — such as webinars, coaching, e-guides, digital services and curated experiences — instead of relying only on brand deals.',
  },
  {
    q: 'What is the Travelpreneur™ Economy?',
    a: 'The Travelpreneur™ Economy is the growing economy of travel creators, entrepreneurs and suppliers who turn travel knowledge into income and bookable experiences. Charles Shima is known as its architect, and builds it through Tourifique, speaking and coaching.',
  },
  {
    q: 'How can travel creators earn beyond brand deals?',
    a: 'Charles Shima is building and testing five ways with creators: webinars, coaching, e-guides, digital services and curated, bookable experiences. His free guide, "5 Ways Travel Creators Can Earn Beyond Brand Deals", explains them.',
  },
  {
    q: 'How can AI help travel creators?',
    a: 'Charles Shima focuses on four concrete jobs: scripting reels, repurposing one reel into a guide, itinerary or e-guide, following up on enquiries, and researching destinations. The creator stays the expert; AI does the repetitive work.',
  },
  {
    q: 'Who is Charles Shima?',
    a: 'Charles Shima is the Architect of the Travelpreneur™ Economy, founder of Tourifique and ZaNiheza, and a global speaker on the creator economy, AI in travel, and Rwanda beyond safari. He helps travel creators turn what they know into income, beyond brand deals.',
  },
  {
    q: 'What is Tourifique?',
    a: 'Tourifique connects Travellers, Travelpreneurs and Suppliers through short-form travel reels: people discover through video, book the experience behind it, and creators earn from their knowledge. Website: tourifique.com.',
  },
  {
    q: 'What is ZaNiheza?',
    a: 'ZaNiheza is a travel tour company for immersive and cultural experiences in Rwanda, founded by Charles Shima. Website: zaniheza.com.',
  },
  {
    q: 'What does Charles Shima speak about, and how do I book him?',
    a: 'Charles Shima gives keynotes, panels and workshops on turning travel knowledge into income, AI in travel and TikTok as a travel agent, and Rwanda beyond safari. Send the date, audience and theme through shimacharles.ca/work-with-me and he will reply with availability.',
  },
]

const schema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}

export default function Faq({ heading = 'Questions people ask' }) {
  return (
    <section id="faq" className="section faq" aria-labelledby="faq-title">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schema).replace(/</g, '\\u003c')}</script>
      </Helmet>
      <Reveal className="wrap faq__grid">
        <h2 className="h2" id="faq-title">
          <Diamond /> {heading}
        </h2>
        <div className="faq__list">
          {FAQS.map(({ q, a }) => (
            <details key={q} className="faq-item reveal-item">
              <summary>
                <h3>{q}</h3>
                <span className="faq-item__icon" aria-hidden="true" />
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
