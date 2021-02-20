import { Cell, Row } from "griding"
// import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"
import ReactMarkdownWithHtml from "react-markdown/with-html"
import { Container } from "../components/grid"
import SEO from "../components/seo"
import * as S from "../components/styles.css"
import Main from "./Main"
import { Link } from "gatsby"
import Breadcrumb from "../components/Breadcrumb"
import Card from "../components/Card/Card.js"
import CardHeader from "../components/Card/CardHeader.js"
import { makeStyles } from "@material-ui/core/styles"
import CardBody from "../components/Card/CardBody.js"

const styles = {
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    fontSize: "1.2rem",
  },
}

const useStyles = makeStyles(styles)

const BlogPostTemplate = ({
  pageContext: { prev, next, categories, posts, slug, seo },
}) => {
  const {
    node: { title, category, subcategory, created, markdown },
  } = posts.find((e) => e.node.slug === slug)
  const classes = useStyles()

  return (
    <Main categories={categories}>
      <SEO data={seo} />
      <Container>
        <Card>
          <CardHeader color="primary">
            <Link
              style={{ boxShadow: `none`, textDecoration: "none" }}
              to={`/blog/${category}/${subcategory}/${slug}`}
            >
              <h2 className={classes.cardTitleWhite}>{title}</h2>
            </Link>
            <div className="twoCol">
              <Breadcrumb category={category} subcategory={subcategory} />
              <S.DateText>{created}</S.DateText>
            </div>
          </CardHeader>
          <CardBody>
            <S.BlogContent>
              <ReactMarkdownWithHtml children={markdown} allowDangerousHtml />
            </S.BlogContent>
          </CardBody>
        </Card>

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
