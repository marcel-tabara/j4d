import { makeStyles } from "@material-ui/core/styles"
import { Link } from "gatsby"
import React from "react"
import Breadcrumb from "../components/Breadcrumb"
import Card from "../components/Card/Card.js"
import CardBody from "../components/Card/CardBody.js"
import CardHeader from "../components/Card/CardHeader.js"
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

const RenderList = ({ node }) => {
  const {
    id,
    title,
    slug,
    description,
    //imageName,
    created,
    category,
    subcategory,
    //keywords,
  } = node
  const classes = useStyles()
  return (
    <Card key={id} style={{ marginTop: "4rem" }}>
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
}

export default RenderList
