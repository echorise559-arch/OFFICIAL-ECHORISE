import { useEffect } from 'react'

/**
 * useSEO — lightweight per-page SEO without react-helmet dependency.
 * Sets document.title, meta description, and canonical URL.
 * Also sets og:title, og:description, og:url so each page gets
 * the correct social preview when shared.
 *
 * @param {{ title: string, description: string, canonical?: string }} opts
 */
export default function useSEO({ title, description, canonical }) {
  useEffect(() => {
    // Page title
    document.title = title

    // Meta description
    let metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) metaDesc.setAttribute('content', description)

    // Canonical
    const canonicalURL = canonical || window.location.href
    let linkCanon = document.querySelector('link[rel="canonical"]')
    if (linkCanon) linkCanon.setAttribute('href', canonicalURL)

    // OG tags
    const setOG = (prop, val) => {
      let el = document.querySelector(`meta[property="${prop}"]`)
      if (el) el.setAttribute('content', val)
    }
    setOG('og:title', title)
    setOG('og:description', description)
    setOG('og:url', canonicalURL)

    // Twitter tags
    const setTW = (name, val) => {
      let el = document.querySelector(`meta[name="${name}"]`)
      if (el) el.setAttribute('content', val)
    }
    setTW('twitter:title', title)
    setTW('twitter:description', description)
  }, [title, description, canonical])
}
