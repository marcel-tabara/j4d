import { graphql, Link } from "gatsby"
import { Cell, Row } from "griding"
import React from "react"
import ReactMarkdownWithHtml from "react-markdown/with-html"
import { Container } from "../components/grid"
import SEO from "../components/seo"
import * as S from "../components/styles.css"
import Main from "./Main"

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.mongodbJ4DadminPosts
    //const siteTitle = this.props.data.site.siteMetadata.title
    const { prev, next } = this.props.pageContext

    return (
      <Main>
        <SEO title={post.title} description={post.shortDescription} />
        <Container>
          <S.Title>{post.title}</S.Title>
          <S.Category>
            <Link to={`/blog/${post.category}`}>{post.category}</Link>
            {" / "}
            <Link to={`/blog/${post.category}/${post.subcategory}`}>
              {post.subcategory}
            </Link>
          </S.Category>
          <p style={{ justifyContent: "flex-end" }}>
            <S.DateText>{post.datetime}</S.DateText>
          </p>
          <hr />
          <S.BlogContent>
            <ReactMarkdownWithHtml children={post.content} allowDangerousHtml />
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
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    mongodbJ4DadminPosts(slug: { eq: $slug }) {
      id
      title
      content
      category
      subcategory
      postMetaCharSet
      postMetaKeywords {
        name
      }
      datetime(formatString: "MMMM DD, YYYY")
      slug
      shortDescription
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`
