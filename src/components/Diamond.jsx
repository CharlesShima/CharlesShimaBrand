// The small diamond from the logo, used as the site's only marker.
export default function Diamond({ className = '' }) {
  return <span className={`diamond ${className}`} aria-hidden="true" />
}
