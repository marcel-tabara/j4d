import { Cell, Row } from "griding"
// import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"
import ReactMarkdownWithHtml from "react-markdown/with-html"
import { Container } from "../components/grid"
import SEO from "../components/seo"
import * as S from "../components/styles.css"
import Main from "./Main"
import Link from "@material-ui/core/Link"
import Breadcrumb from "../components/Breadcrumb"

const BlogPostTemplate = (props) => {
  const { prev, next, categories, posts, slug } = props.pageContext
  const {
    node: { description, title, category, subcategory, created, markdown },
  } = posts.find((e) => e.node.slug === slug)

  return (
    <Main categories={categories}>
      <SEO title={title} description={description} />
      <Container>
        <S.Category>{title}</S.Category>

        <Breadcrumb category={category} subcategory={subcategory} />

        <div style={{ justifyContent: "flex-end" }}>
          <S.DateText>{created}</S.DateText>
        </div>
        <hr />
        <S.BlogContent>
          <ReactMarkdownWithHtml children={markdown} allowDangerousHtml />
        </S.BlogContent>
        <Row>
          {prev && (
            <Cell xs={6}>
              <Link
                to={`/blog/${prev.node.category}/${prev.node.subcategory}/${prev.node.slug}`}
              >
                <S.NavigationPost>
                  <div>
                    {" "}
                    {"<"} {prev.node.title}
                  </div>
                </S.NavigationPost>
              </Link>
            </Cell>
          )}

          {next && (
            <Cell xs={6}>
              <Link
                to={`/blog/${next.node.category}/${next.node.subcategory}/${next.node.slug}`}
              >
                <S.NavigationPost>
                  <div>
                    {" "}
                    {next.node.title} {">"}
                  </div>
                </S.NavigationPost>
              </Link>
            </Cell>
          )}
        </Row>
      </Container>
    </Main>
  )
}

export default BlogPostTemplate
