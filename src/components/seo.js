import React from "react"
import { Helmet } from "react-helmet"
// import { traverse } from "../utils/seoUtils"

const SEO = ({ data }) => {
  console.log("########## data111", data)
  const { title, meta } = data

  return (
    <Helmet>
      {title && <title>{title}</title>}
      {meta.length > 0 &&
        meta.map((e) => <meta property={e.name} content={e.content} />)}
    </Helmet>
  )
}

export default SEO
