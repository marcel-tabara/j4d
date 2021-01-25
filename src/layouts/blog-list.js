import { makeStyles } from "@material-ui/core/styles"
import { Link } from "gatsby"
import React from "react"
import Breadcrumb from "../components/Breadcrumb"
import Card from "../components/Card/Card.js"
import CardBody from "../components/Card/CardBody.js"
import CardHeader from "../components/Card/CardHeader.js"
import Pagination from "../components/pagination"
import SEO from "../components/seo"
import Main from "./Main"
import * as S from "../components/styles.css"

const styles = {
  typo: {
    paddingLeft: "25%",
    marginBottom: "40px",
    position: "relative",
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: "10px",
    top: "10px",
    color: "#c0c1c2",
    display: "block",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "13px",
    left: "0",
    marginLeft: "20px",
    position: "absolute",
    width: "260px",
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
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

const IndexPage = ({
  pageContext: { categories, posts, currentPage, numPages, skip, limit },
}) => {
  const classes = useStyles()

  return (
    <Main categories={categories}>
      <SEO title="All posts" />

      <div style={{ margin: "20px 0 40px" }}>
        {posts.map((post) => {
          const {
            id,
            title,
            slug,
            description,
            category,
            subcategory,
            created,
          } = post.node

          return (
            <Card key={id}>
              <CardHeader color="primary">
                <Link
                  style={{ boxShadow: `none`, textDecoration: "none" }}
                  to={`/blog/${category}/${subcategory}/${slug}`}
                >
                  <h2 className={classes.cardTitleWhite}>{title}</h2>
                </Link>
                <div className="twoCol">
                  <Breadcrumb
                    category={category}
                    subcategory={subcategory}
                    categories={categories}
                  />
                  <S.DateText>{created}</S.DateText>
                </div>
              </CardHeader>
              <CardBody>
                <div>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: description,
                    }}
                  />
                </div>
              </CardBody>
            </Card>
          )
        })}
        <Pagination currentPage={currentPage} numPages={numPages} />
      </div>
    </Main>
  )
}

export default IndexPage
