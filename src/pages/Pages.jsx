import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Faq from '../components/Faq'
import { useContent } from '../lib/content'
import {
  AboutBlock,
  ConnectBand,
  HeroPromise,
  Newsletter,
  Offers,
  PageHero,
  Paths,
  PressList,
  Proof,
  SpeakingStrip,
  SpeakingTopics,
  Steps,
  Ticker,
  VenturesBlock,
} from '../components/Sections'

// Order follows one promise first, then a door for each visitor, then the proof.
export function Home() {
  return (
    <>
      <Seo type="profile" />
      <HeroPromise />
      <Ticker />
      <Paths />
      <Offers />
      <Steps />
      <Proof />
      <SpeakingStrip />
      <VenturesBlock />
      <Newsletter />
      <PressList limitPosts={3} />
      <Faq />
      <ConnectBand />
    </>
  )
}

export function About() {
  const { settings } = useContent()
  return (
    <>
      <Seo
        title="Who is Charles Shima"
        description="Born in Kinshasa, raised in Rwanda, orphaned at 13, in Canada at 19 with no money. Charles Shima is now the Architect of the Travelpreneur™ Economy and founder of Tourifique and ZaNiheza."
        image={settings.aboutImage}
        type="profile"
      />
      <PageHero title="Who is Shima" intro={settings.proofLine} />
      <AboutBlock />
      <VenturesBlock />
      <ConnectBand />
    </>
  )
}

export function Contribute() {
  return (
    <>
      <Seo
        title="How I help travel creators"
        description="Build with Tourifique, storytelling and content, AI for travel creators, speaking, and coaching and mentorship: five ways Charles Shima helps travel creators earn beyond brand deals."
      />
      <PageHero title="How I help" intro="Five ways to turn what you know about travel into income, beyond brand deals." tone="lilac" />
      <Paths />
      <Offers showHead={false} />
      <Steps />
      <Newsletter />
      <ConnectBand />
    </>
  )
}

export function Speaking() {
  return (
    <>
      <Seo
        title="Book Charles Shima as a speaker"
        description="Keynotes, panels and workshops on the Travelpreneur™ Economy, AI in travel and TikTok as a travel agent, and Rwanda beyond safari. Web Summit Vancouver, Black Travel Expo, Phocuswright."
      />
      <PageHero
        title="Speaking"
        intro="Keynotes, panels and workshops on the Travelpreneur™ Economy, AI in travel, and Rwanda beyond safari."
        tone="marigold"
      />
      <SpeakingTopics />
      <SpeakingStrip pageMode />
      <ConnectBand />
    </>
  )
}

export function Ventures() {
  return (
    <>
      <Seo
        title="Ventures: Tourifique and ZaNiheza"
        description="Tourifique connects Travellers, Travelpreneurs and Suppliers through short-form travel reels. ZaNiheza is a travel tour company for immersive and cultural experiences in Rwanda."
      />
      <PageHero title="What I'm building" intro="The companies behind the advice." tone="emerald" />
      <VenturesBlock showHead={false} />
      <ConnectBand />
    </>
  )
}

export function Perspectives() {
  return (
    <>
      <Seo title="Perspectives" description="Interviews, press features and articles by and about Charles Shima, founder of Tourifique." />
      <PageHero title="Perspectives" intro="Interviews, features and things I've written." />
      <PressList showHead={false} />
      <Newsletter />
    </>
  )
}

export function NotFound() {
  return (
    <>
      <Seo title="Page not found" noindex />
      <PageHero title="This page doesn't exist" intro="The link may be old or mistyped." />
      <div className="wrap narrow section--tight">
        <Link className="btn btn--primary" to="/">
          Go to the home page
        </Link>
      </div>
    </>
  )
}
