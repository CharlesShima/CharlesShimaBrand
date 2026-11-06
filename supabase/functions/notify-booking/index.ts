// OPTIONAL: emails you whenever someone sends a booking request.
// Uses Resend (free for 3,000 emails/month). Setup steps are in README.md, section 6.
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!
const NOTIFY_TO = Deno.env.get('NOTIFY_TO')! // your email
const NOTIFY_FROM = Deno.env.get('NOTIFY_FROM') || 'ShimaCharles.ca <onboarding@resend.dev>'

Deno.serve(async (req) => {
  const { record: b } = await req.json() // sent by the database webhook
  if (!b) return new Response('no record', { status: 400 })
  const esc = (s: string) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!))
  const html = `
    <h2>New request: ${esc(b.booking_type)}</h2>
    <p><b>${esc(b.name)}</b> ${b.organisation ? '(' + esc(b.organisation) + ')' : ''}<br>
    ${esc(b.email)}${b.phone ? '<br>' + esc(b.phone) : ''}</p>
    ${b.preferred_date ? `<p>Preferred: ${esc(b.preferred_date)} ${esc(b.preferred_time)}</p>` : ''}
    <p style="white-space:pre-wrap">${esc(b.message)}</p>
    <p>Manage it at https://shimacharles.ca/admin/bookings</p>`
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: NOTIFY_FROM, to: NOTIFY_TO, reply_to: b.email, subject: `New booking request from ${b.name}`, html }),
  })
  return new Response(await res.text(), { status: res.status })
})
