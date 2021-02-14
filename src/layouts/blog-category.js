import React from "react"
import { Container } from "../components/grid"
import Pagination from "../components/pagination"
import renderList from "../components/renderList"
import SEO from "../components/seo"
import Main from "./Main"
import * as S from "../components/styles.css"

const BlogCategory = ({
  pageContext: { currentPage, numPages, category, categories, posts },
}) => {
  return (
    <Main categories={categories}>
      {/* <SEO data={category} /> */}

      <Container>
        <hr />
        <S.HeaderSectionTitleBlog>{category}</S.HeaderSectionTitleBlog>
        <hr />
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
