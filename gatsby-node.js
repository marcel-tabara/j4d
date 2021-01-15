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
      allMongodbJ4DadminPosts {
        edges {
          node {
            id
            title
            category
            subcategory
            shortDescription
            postMetaCharSet
            postMetaKeywords {
              name
            }
            datetime(formatString: "MMMM DD, YYYY")
            slug
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
    const postsPerPage = 3
    const numPages = Math.ceil(posts.length / postsPerPage)
    const categories = []
    const subcategories = []

    // Creating blog list with pagination
    Array.from({ length: numPages }).map((_, i) => {
      createPage({
        path: i === 0 ? `/blog` : `/blog/page/${i + 1}`,
        component: blogListLayout,
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          currentPage: i + 1,
          numPages,
        },
      })
    })

    // Creating blog posts
    posts.map((post, index, arr) => {
      categories.push(post.node.category)
      subcategories.push(post.node.subcategory)

      const prev = arr[index - 1]
      const next = arr[index + 1]

      createPage({
        path:
          "blog/" +
          post.node.category +
          "/" +
          post.node.subcategory +
          "/" +
          post.node.slug,
        component: blogLayout,
        context: {
          category: post.node.category,
          subcategory: post.node.subcategory,
          slug: post.node.slug,
          prev: prev,
          next: next,
        },
      })
    })

    // Creating category page
    const countCategories = categories.reduce((prev, curr) => {
      prev[curr] = (prev[curr] || 0) + 1
      return prev
    }, {})
    const allCategories = Object.keys(countCategories)

    allCategories.map((cat, i) => {
      const link = `/blog/${cat}`

      Array.from({
        length: Math.ceil(countCategories[cat] / postsPerPage),
      }).map((_, i) => {
        createPage({
          path: i === 0 ? link : `${link}/page/${i + 1}`,
          component: blogCategoryLayout,
          context: {
            category: cat,
            limit: postsPerPage,
            skip: i * postsPerPage,
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
        createPage({
          path: i === 0 ? link : `${link}/page/${i + 1}`,
          component: blogSubCategoryLayout,
          context: {
            category: cat,
            subcategory: subcat,
            limit: postsPerPage,
            skip: i * postsPerPage,
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
