import { graphql } from "gatsby"
import { Row } from "griding"
import React from "react"
import { Container } from "../components/grid"
import Pagination from "../components/pagination"
import renderList from "../components/renderList"
import Seo from "../components/seo"
import Main from "./Main"

const BlogSubCategory = ({ data, pageContext }) => {
  const { allMongodbJ4DadminPosts } = data
  const { currentPage, numPages, subcategory } = pageContext

  return (
    <Main>
      <Seo title={subcategory} />

      <Container>
        <Row>
          <h1>{subcategory}</h1>

          {allMongodbJ4DadminPosts.edges.map(renderList)}
        </Row>

        <Pagination
          currentPage={currentPage}
          numPages={numPages}
          contextPage={subcategory}
        />
      </Container>
    </Main>
  )
}

export default BlogSubCategory

export const query = graphql`
  query blogPostsListBySubCategory(
    $subcategory: String
    $skip: Int!
    $limit: Int!
  ) {
    allMongodbJ4DadminPosts(
      sort: { fields: [datetime], order: DESC }
      filter: { subcategory: { in: [$subcategory] } }
      limit: $limit
      skip: $skip
    ) {
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
`
