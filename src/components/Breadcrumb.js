import Breadcrumbs from "@material-ui/core/Breadcrumbs"
import Link from "@material-ui/core/Link"
import React from "react"

const Breadcrumb = ({ category, subcategory, categories }) => {
  if (!category) return null

  return (
    <Breadcrumbs aria-label="breadcrumb" className="breadCrumbWrapper">
      <Link style={{ boxShadow: `none` }} to={`/blog/${category}`}>
        {category}
      </Link>
      {subcategory && (
        <Link
          style={{ boxShadow: `none` }}
          to={`/blog/${category}/${subcategory}`}
        >
          {subcategory}
        </Link>
      )}
    </Breadcrumbs>
  )
}

export default Breadcrumb
