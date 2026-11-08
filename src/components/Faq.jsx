// FAQ for search and answer engines. Shows the questions on the page and adds
// matching FAQPage schema. Edit the text here; both update together.
import { Helmet } from 'react-helmet-async'

const faqs = [
  {
    q: 'Who is Charles Shima?',
    a: 'Charles Shima is the Architect of the Travelpreneur™ Economy, founder of Tourifique and ZaNiheza, and an entrepreneur, innovator, AI evangelist and global speaker. His work explores travel innovation, creator monetization, entrepreneurship and opportunities across Africa, Canada and the world.',
  },
  {
    q: 'What is the Travelpreneur™ Economy?',
    // TODO: replace with your own definition, in your own words
    a: 'The Travelpreneur™ Economy is the growing economy of creators, entrepreneurs and professionals who build income and businesses around travel, technology and living across borders.',
  },
  {
    q: 'What does Charles Shima speak about?',
    a: 'Charles Shima speaks on the Travelpreneur™ Economy, the travel creator economy and creator monetization, AI adoption for entrepreneurs, tourism innovation, and cross-border and diaspora entrepreneurship.',
  },
  {
    q: 'How can I book Charles Shima as a speaker?',
    a: 'Charles Shima is available worldwide for keynotes, panels, workshops and fireside chats, in English or French, in person or virtually. Visit shimacharles.ca/speaking to send a booking request.',
  },
]

const schema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}

export default function Faq({ heading = 'Frequently asked questions' }) {
  return (
    <section id="faq" className="faq">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schema).replace(/</g, '\\u003c')}</script>
      </Helmet>
      <h2>{heading}</h2>
      {faqs.map(({ q, a }) => (
        <div key={q} className="faq-item">
          <h3>{q}</h3>
          <p>{a}</p>
        </div>
      ))}
    </section>
  )
}
