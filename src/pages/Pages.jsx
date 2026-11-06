import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { useContent } from '../lib/content'
import {
  AboutBlock,
  ConnectBand,
  ContributeList,
  HeroOrbit,
  PageHero,
  PressList,
  SpeakingStrip,
  VenturesBlock,
} from '../components/Sections'

export function Home() {
  return (
    <>
      <Seo />
      <HeroOrbit />
      <AboutBlock />
      <ContributeList />
      <SpeakingStrip />
      <VenturesBlock />
      <PressList limitPosts={3} />
      <ConnectBand />
    </>
  )
}

export function About() {
  const { settings } = useContent()
  return (
    <>
      <Seo title="Who is Shima" description={settings.aboutQuote || settings.seoDescription} image={settings.aboutImage} />
      <PageHero title="Who is Shima" />
      <AboutBlock full />
      <ConnectBand />
    </>
  )
}

export function Contribute() {
  return (
    <>
      <Seo title="How I contribute" description="Coaching and mentorship, advisory and collaboration, content and storytelling, and cross-border living between Canada and Rwanda." />
      <PageHero title="How I contribute" intro="Different ways to work together, all rooted in building across borders." />
      <ContributeList showHead={false} />
      <ConnectBand />
    </>
  )
}

export function Speaking() {
  return (
    <>
      <Seo title="Speaking" description="Keynotes, panels and appearances by Charles Shima on travel, technology, entrepreneurship and building across borders." />
      <PageHero title="Speaking" intro="Keynotes, panels, fireside chats and moderation on travel, technology and building across borders." />
      <SpeakingStrip showHead={false} />
      <section className="section">
        <div className="wrap narrow">
          <h2 className="h3">Invite Charles to your event</h2>
          <p>Share the date, audience and theme, and Charles will reply with availability.</p>
          <Link to="/work-with-me?type=Speaking%20invitation" className="btn btn--primary">
            Send a speaking invitation
          </Link>
        </div>
      </section>
    </>
  )
}

export function Ventures() {
  return (
    <>
      <Seo title="Ventures" description="Tourifique, ZaNiheza and other ventures built by Charles Shima." />
      <PageHero title="Ventures" intro="The companies and initiatives I'm building." />
      <VenturesBlock showHead={false} />
      <ConnectBand />
    </>
  )
}

export function Perspectives() {
  return (
    <>
      <Seo title="Perspectives" description="Interviews, press features and articles by and about Charles Shima." />
      <PageHero title="Perspectives" intro="Interviews, features and things I've written." />
      <PressList showHead={false} />
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
