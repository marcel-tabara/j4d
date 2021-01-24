import { Link } from "gatsby"
import React from "react"
import * as S from "../components/styles.css"

const Breadcrumb = ({ category, subcategory }) => {
  if (!category) return null

  return (
    <S.Category>
      <Link className="breadcrumb" to={`/blog/${category}`}>
        {category}
      </Link>
      {" / "}
      {subcategory && (
        <Link className="breadcrumb" to={`/blog/${category}/${subcategory}`}>
          {subcategory}
        </Link>
      )}
    </S.Category>
  )
}

export default Breadcrumb
