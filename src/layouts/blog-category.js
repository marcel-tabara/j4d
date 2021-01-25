import React from "react"
import { Container } from "../components/grid"
import Pagination from "../components/pagination"
import renderList from "../components/renderList"
import Seo from "../components/seo"
import Main from "./Main"

const BlogCategory = ({
  pageContext: { currentPage, numPages, category, categories, posts },
}) => {
  return (
    <Main categories={categories}>
      <Seo title={category} />

      <Container>
        <h1>{category}</h1>

        {posts.map(renderList)}

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
