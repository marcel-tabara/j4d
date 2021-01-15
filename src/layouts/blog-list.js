import { makeStyles } from "@material-ui/core/styles"
import { graphql, Link, StaticQuery } from "gatsby"
import React from "react"
import Breadcrumb from "../components/Breadcrumb"
import Card from "../components/Card/Card.js"
import CardBody from "../components/Card/CardBody.js"
import CardHeader from "../components/Card/CardHeader.js"
import SEO from "../components/seo"
import Main from "./Main"

const styles = {
  typo: {
    paddingLeft: "25%",
    marginBottom: "40px",
    position: "relative",
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: "10px",
    top: "10px",
    color: "#c0c1c2",
    display: "block",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "13px",
    left: "0",
    marginLeft: "20px",
    position: "absolute",
    width: "260px",
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
}

const useStyles = makeStyles(styles)
const IndexPage = () => {
  const classes = useStyles()

  return (
    <Main>
      <SEO title="All posts" />

      <div style={{ margin: "20px 0 40px" }}>
        <StaticQuery
          query={graphql`
            query BlogListQuery {
              site {
                siteMetadata {
                  title
                }
              }
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
            }
          `}
          render={(data) => {
            const posts = data.allMongodbJ4DadminPosts.edges
            const categories = data.allMongodbJ4DadminCategories.edges

            return posts.map((post) => {
              const {
                id,
                title,
                slug,
                shortDescription,
                //imageName,
                datetime,
                category,
                subcategory,
                //keywords,
              } = post.node

              return (
                <Card key={id}>
                  <CardHeader color="primary">
                    <Link
                      style={{ boxShadow: `none` }}
                      to={`${category}/${subcategory}/${slug}`}
                    >
                      <h4 className={classes.cardTitleWhite}>{title}</h4>
                    </Link>
                    <div>{datetime}</div>
                    <Breadcrumb
                      category={category}
                      subcategory={subcategory}
                      categories={categories}
                    />
                  </CardHeader>
                  <CardBody>
                    <div>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: shortDescription,
                        }}
                      />
                      {/* <div className="keywords">
                        <Keywords keywords={keywords} />
                      </div> */}
                    </div>
                  </CardBody>
                </Card>
              )
            })
          }}
        />
      </div>
    </Main>
  )
}

export default IndexPage
