import React from "react"
import { Container } from "../components/grid"
import Pagination from "../components/pagination"
import renderList from "../components/renderList"
import Seo from "../components/seo"
import Main from "./Main"
import * as S from "../components/styles.css"

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
  console.log("########## category", category)
  return (
    <Main categories={categories}>
      <Seo title={subcategory} />

      <Container>
        <hr />
        <S.HeaderSectionTitle>{`${category.node.category} / ${subcategory}`}</S.HeaderSectionTitle>
        <hr />

        {posts.map(renderList)}

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
