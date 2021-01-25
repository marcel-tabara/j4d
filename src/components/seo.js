import React from "react"
import { GatsbySeo } from "gatsby-plugin-next-seo"
import { useStaticQuery, graphql } from "gatsby"

const SEO = (data) => {
  return (
    <GatsbySeo
      openGraph={{
        type: "website",
        url: "https://www.example.com/page",
        title: "Open Graph Title",
        description: "Open Graph Description",
        images: [
          {
            url: "https://www.example.ie/og-image.jpg",
            width: 800,
            height: 600,
            alt: "Og Image Alt",
          },
          {
            url: "https://www.example.ie/og-image-2.jpg",
            width: 800,
            height: 600,
            alt: "Og Image Alt 2",
          },
        ],
      }}
    />
  )
}

export default SEO
