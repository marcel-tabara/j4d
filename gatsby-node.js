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
                seoSub {
                  defaultTitle
                  defer
                  encodeSpecialCharacters
                  title
                  titleTemplate
                  titleAttributes {
                    itemprop
                  }
                  meta {
                    name
                    content
                  }
                  htmlAttributes {
                    lang
                    amp
                  }
                  bodyAttributes {
                    className
                  }
                  base {
                    href
                    target
                  }
                }
              }
              seo {
                titleTemplate
                titleAttributes {
                  itemprop
                }
                title
                meta {
                  content
                  name
                }
                htmlAttributes {
                  amp
                  lang
                }
                encodeSpecialCharacters
                defer
                defaultTitle
                bodyAttributes {
                  className
                }
                base {
                  href
                  target
                }
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
              titleTemplate
              titleAttributes {
                itemprop
              }
              title
              meta {
                content
                name
              }
              htmlAttributes {
                amp
                lang
              }
              encodeSpecialCharacters
              defer
              defaultTitle
              bodyAttributes {
                className
              }
              base {
                href
                target
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
      const seo = gqlCategories.find((e) => e.categoryId === cat).seo

      Array.from({
        length: Math.ceil(countCategories[cat] / postsPerPage),
      }).map((_, i) => {
        const skip = i * postsPerPage

        createPage({
          path: i === 0 ? link : `${link}/page/${i + 1}`,
          component: blogCategoryLayout,
          context: {
            category: cat,
            seo,
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
      const seo = gqlCategories
        .find((e) => e.categoryId === cat.node.category)
        .subcategories.find((e) => e.subcategoryId === subcat).seoSub

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
            seo,
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
