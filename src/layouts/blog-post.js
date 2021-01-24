import { Cell, Row } from "griding"
// import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"
import ReactMarkdownWithHtml from "react-markdown/with-html"
import { Container } from "../components/grid"
import SEO from "../components/seo"
import * as S from "../components/styles.css"
import Main from "./Main"
import Link from "@material-ui/core/Link"

const BlogPostTemplate = (props) => {
  const { prev, next, categories, posts, slug } = props.pageContext
  const { node } = posts.find((e) => e.node.slug === slug)

  return (
    <Main categories={categories}>
      <SEO title={node.title} description={node.description} />
      <Container>
        <S.Title>{node.title}</S.Title>
        <S.Category>
          <Link to={`/blog/${node.category}`}>{node.category}</Link>
          {" / "}
          <Link to={`/blog/${node.category}/${node.subcategory}`}>
            {node.subcategory}
          </Link>
        </S.Category>
        <div style={{ justifyContent: "flex-end" }}>
          <S.DateText>{node.created}</S.DateText>
        </div>
        <hr />
        <S.BlogContent>
          <ReactMarkdownWithHtml children={node.markdown} allowDangerousHtml />
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
