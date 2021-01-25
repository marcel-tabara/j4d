import { Row } from "griding"
import React from "react"
import { Container } from "../components/grid"
import Pagination from "../components/pagination"
import renderList from "../components/renderList"
import Seo from "../components/seo"
import Main from "./Main"

const BlogSubCategory = ({
  pageContext: {
    currentPage,
    numPages,
    category,
    subcategory,
    categories,
    posts,
  },
}) => {
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
          contextPage={`${category.node.category}/${subcategory}`}
        />
      </Container>
    </Main>
  )
}

export default BlogSubCategory
