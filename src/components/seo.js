import React from "react"
import { Helmet } from "react-helmet"

const SEO = ({ data }) => {
  const { title, meta } = data

  return (
    <Helmet>
      {title && <title>{title}</title>}
      {meta &&
        meta.length > 0 &&
        meta.map((e) => (
          <meta property={e.name} content={e.content} key={e.name} />
        ))}
    </Helmet>
  )
}

export default SEO
