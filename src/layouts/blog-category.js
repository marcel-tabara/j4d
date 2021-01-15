import { graphql } from "gatsby"
import { Row } from "griding"
import React from "react"
import { Container } from "../components/grid"
import Pagination from "../components/pagination"
import renderList from "../components/renderList"
import Seo from "../components/seo"
import Main from "./Main"

const BlogCategory = ({ data, pageContext }) => {
  const { allMongodbJ4DadminPosts } = data
  const { currentPage, numPages, category } = pageContext

  return (
    <Main>
      <Seo title={category} />

      <Container>
        <Row>
          <h1>{category}</h1>
          {allMongodbJ4DadminPosts.edges.map(renderList)}
        </Row>

        <Pagination
          currentPage={currentPage}
          numPages={numPages}
          contextPage={category}
        />
      </Container>
    </Main>
  )
}

export default BlogCategory

export const query = graphql`
  query blogPostsListByCategory($category: String, $skip: Int!, $limit: Int!) {
    allMongodbJ4DadminPosts(
      sort: { fields: [datetime], order: DESC }
      filter: { category: { in: [$category] } }
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
