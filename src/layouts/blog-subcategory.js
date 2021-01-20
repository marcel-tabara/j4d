import { Row } from "griding"
import React from "react"
import { Container } from "../components/grid"
import Pagination from "../components/pagination"
import renderList from "../components/renderList"
import Seo from "../components/seo"
import Main from "./Main"

const BlogSubCategory = ({ pageContext }) => {
  const { currentPage, numPages, subcategory, categories, posts } = pageContext

  return (
    <Main categories={categories}>
      <Seo title={subcategory} />

      <Container>
        <Row>
          <h1>{subcategory}</h1>

          {posts.map(renderList)}
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
