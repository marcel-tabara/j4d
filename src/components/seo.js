import React from "react"
import { Helmet } from "react-helmet"
// import { traverse } from "../utils/seoUtils"

const SEO = ({ data }) => {
  console.log("########## data111", data)
  //const xxx = traverse(data)

  return (
    <Helmet>
      <title>title</title>
      <meta name="description" content="description" />
    </Helmet>
  )
}

export default SEO
