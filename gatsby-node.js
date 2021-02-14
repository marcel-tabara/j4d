const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)

exports.createPages = ({ graphql, actions: { createPage } }) => {
  const blogLayout = path.resolve(`./src/layouts/blog-post.js`)
  const blogListLayout = path.resolve(`./src/layouts/blog-list.js`)
  const blogCategoryLayout = path.resolve(`./src/layouts/blog-category.js`)
  const blogSubCategoryLayout = path.resolve(
    `./src/layouts/blog-subcategory.js`
  )

  return graphql(`
    query blogPosts {
      allMongodbJ4DadminCategories {
        edges {
          node {
            categories {
              categoryActive
              categoryId
              categoryMetaCharset
              categoryMetaViewport
              categoryTitle
              subcategories {
                subcategoryActive
                subcategoryId
                subcategoryMetaCharset
                subcategoryMetaViewport
                subcategoryTitle
              }
            }
          }
        }
      }
      allMongodbJ4DadminPosts {
        edges {
          node {
            id
            category
            subcategory
            seo {
              allSeoProps_defer
              allSeoProps_noindex
              allSeoProps_nofollow
              allSeoProps_dangerouslySetAllPagesToNoIndex
              allSeoProps_dangerouslySetAllPagesToNoFollow
              allSeoProps_language
              allSeoProps_title
              allSeoProps_titleTemplate
              allSeoProps_description
              allSeoProps_canonical
              allSeoProps_mobileAlternate {
                media
                href
              }
              allSeoProps_languageAlternates {
                href
                hrefLang
              }
              allSeoProps_defaultOpenGraphImageWidth
              allSeoProps_defaultOpenGraphImageHeight
              allSeoProps_defaultOpenGraphVideoWidth
              allSeoProps_defaultOpenGraphVideoHeight
              allSeoProps_linkTags {
                link
              }
              faqJsonLdProps_questions {
                answer
                question
              }
              logoJsonLdProps_logo
              logoJsonLdProps_url
              productJsonLdProps_productName
              productJsonLdProps_name
              productJsonLdProps_description
              productJsonLdProps_brand
              productJsonLdProps_images
              productJsonLdProps_reviews {
                author
                datePublished
                name
                reviewBody
                reviewRating {
                  bestRating
                  worstRating
                  ratingValue
                }
              }
              productJsonLdProps_offers {
                price
                priceCurrency
                priceValidUntil
                itemCondition
                availability
                url
                seller {
                  type
                  name
                }
              }
              productJsonLdProps_offersType
              productJsonLdProps_gtin
              productJsonLdProps_gtin8
              productJsonLdProps_gtin12
              productJsonLdProps_gtin13
              productJsonLdProps_gtin14
              productJsonLdProps_mpn
              productJsonLdProps_sku
              socialProfileJsonLdProps_defer
              socialProfileJsonLdProps_type
              socialProfileJsonLdProps_name
              socialProfileJsonLdProps_url
              socialProfileJsonLdProps_sameAs
              localBusinessAddress_addressCountry
              localBusinessAddress_addressLocality
              localBusinessAddress_addressRegion
              localBusinessAddress_postalCode
              localBusinessAddress_postOfficeBoxNumber
              localBusinessAddress_streetAddress
              corporateContactJsonLdProps_defer
              corporateContactJsonLdProps_url
              corporateContactJsonLdProps_logo
              corporateContactJsonLdProps_contactPoint {
                areaServed
                availableLanguage
                contactOption
                contactType
                telephone
              }
              breadcrumbJsonLdProps_itemListElements {
                name
                position
                item
              }
              blogJsonLdProps_title
              blogJsonLdProps_url
              blogJsonLdProps_datePublished
              blogJsonLdProps_dateModified
              blogJsonLdProps_authorName
              blogJsonLdProps_authorType
              blogJsonLdProps_description
              blogJsonLdProps_publisherName
              blogJsonLdProps_publisherLogo
              blogJsonLdProps_headline
              blogJsonLdProps_keywords
              blogJsonLdProps_images
              blogJsonLdProps_posts {
                datePublished
                headline
                image
              }
              blogJsonLdProps_issn
              allSeoProps_twitter {
                cardType
                handle
                site
              }
              productJsonLdProps_aggregateRating {
                ratingExplanation
                reviewAspect
                ratingCount
                reviewCount
                bestRating
                ratingValue
                worstRating
              }
              allSeoProps_facebook {
                appId
              }
              allSeoProps_metaTags {
                content
                name
                property
              }
              allSeoProps_openGraph {
                article {
                  authors
                  expirationTime
                  modifiedTime
                  publishedTime
                  section
                  tags
                }
                book {
                  authors
                  isbn
                  releaseDate
                  tags
                }
                defaultImageHeight
                defaultImageWidth
                description
                images {
                  alt
                  height
                  url
                  width
                }
                locale
                profile {
                  firstName
                  gender
                  lastName
                  username
                }
                site_name
                title
                type
                url
                video {
                  actors {
                    profile
                    role
                  }
                  directors
                  duration
                  releaseDate
                  series
                  tags
                  writers
                }
              }
            }
            created(formatString: "MMMM DD, YYYY")
            slug
            markdown
            title
            description
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      console.error(result.errors)
      reject(result.errors)
    }

    const posts = result.data.allMongodbJ4DadminPosts.edges
    const gqlCategories =
      result.data.allMongodbJ4DadminCategories.edges[0].node.categories
    const postsPerPage = 2
    const numPages = Math.ceil(posts.length / postsPerPage)
    const categories = []
    const subcategories = []
    const activeCategories = []

    // Creating blog posts
    posts.map((post, index, arr) => {
      const cat = gqlCategories.find((e) => e.categoryId === post.node.category)
      const categoryActive = (cat && cat.categoryActive) || false
      const subcat = cat.subcategories.find(
        (e) => e.subcategoryId === post.node.subcategory
      )
      const subcategoryActive = (subcat && subcat.subcategoryActive) || false
      const existingActiveCat = activeCategories.some(
        (e) => e.categoryId === post.node.category
      )

      categoryActive &&
        !existingActiveCat &&
        activeCategories.push({ ...cat, subcategories: [] })

      categoryActive && categories.push(post.node.category)
      subcategoryActive && subcategories.push(post.node.subcategory)

      const activeCat = activeCategories.find(
        (e) => e.categoryId === post.node.category
      )

      const existingActiveSubCat = activeCat.subcategories.some(
        (e) => e.subcategoryId === post.node.subcategory
      )

      categoryActive &&
        subcategoryActive &&
        !existingActiveSubCat &&
        activeCat.subcategories.push(subcat)

      const prev = arr[index - 1]
      const next = arr[index + 1]

      categoryActive &&
        subcategoryActive &&
        createPage({
          path:
            "blog/" +
            post.node.category +
            "/" +
            post.node.subcategory +
            "/" +
            post.node.slug,
          component: blogLayout,
          posts,
          context: {
            category: post.node.category,
            subcategory: post.node.subcategory,
            categories: activeCategories,
            posts,
            slug: post.node.slug,
            prev: prev,
            next: next,
            seo: post.node.seo,
          },
        })
    })

    // Creating blog list with pagination
    Array.from({ length: numPages }).map((_, i) => {
      const skip = i * postsPerPage
      createPage({
        path: i === 0 ? `/blog` : `/blog/page/${i + 1}`,
        component: blogListLayout,
        context: {
          limit: postsPerPage,
          skip,
          currentPage: i + 1,
          numPages,
          posts: posts.slice(skip, skip + postsPerPage),
          categories: activeCategories,
        },
      })
    })

    // Creating category page
    const countCategories = categories.reduce((prev, curr) => {
      prev[curr] = (prev[curr] || 0) + 1
      return prev
    }, {})

    categories.map((cat, i) => {
      const link = `/blog/${cat}`

      Array.from({
        length: Math.ceil(countCategories[cat] / postsPerPage),
      }).map((_, i) => {
        const skip = i * postsPerPage

        createPage({
          path: i === 0 ? link : `${link}/page/${i + 1}`,
          component: blogCategoryLayout,
          context: {
            category: cat,
            categories: activeCategories,
            posts: posts
              .filter((e) => e.node.category === cat)
              .slice(skip, skip + postsPerPage),
            limit: postsPerPage,
            skip,
            currentPage: i + 1,
            numPages: Math.ceil(countCategories[cat] / postsPerPage),
          },
        })
      })
    })

    // Creating subcategory page
    const countSubCategories = subcategories.reduce((prev, curr) => {
      prev[curr] = (prev[curr] || 0) + 1
      return prev
    }, {})

    const allSubCategories = Object.keys(countSubCategories)
    allSubCategories.map((subcat, i) => {
      const cat = posts.find((e) => e.node.subcategory === subcat)
      const link = `/blog/${cat.node.category}/${subcat}`

      Array.from({
        length: Math.ceil(countSubCategories[subcat] / postsPerPage),
      }).map((_, i) => {
        const skip = i * postsPerPage
        createPage({
          path: i === 0 ? link : `${link}/page/${i + 1}`,
          component: blogSubCategoryLayout,
          context: {
            categories: activeCategories,
            category: cat,
            subcategory: subcat,
            posts: posts
              .filter(
                (e) =>
                  e.node.category === cat.node.category &&
                  e.node.subcategory === subcat
              )
              .slice(skip, skip + postsPerPage),
            limit: postsPerPage,
            skip,
            currentPage: i + 1,
            numPages: Math.ceil(countSubCategories[subcat] / postsPerPage),
          },
        })
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    const slug = value.replace("/blog/", "").replace(/\/$/, "")
    const url = `/blog/${node.category}${slug}`

    createNodeField({
      name: `slug`,
      node,
      value: url,
    })
  }
}
