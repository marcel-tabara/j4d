import { Link } from "gatsby"
import { Cell, Row } from "griding"
import React from "react"
import * as S from "../components/styles.css"
import formatDate from "../utils/formatDate"

const renderList = ({ node }) => {
  return (
    <Cell xs={12} key={node.slug}>
      <S.Article>
        <Row>
          <Cell xs={9}>
            <Link
              to={`/blog/${node.category}/${node.subcategory}/${node.slug}/`}
            >
              <S.Title>{node.title}</S.Title>
            </Link>

            <S.DateText>{formatDate(node.datetime)}</S.DateText>
            <p
              dangerouslySetInnerHTML={{
                __html: node.shortDescription,
              }}
            />
          </Cell>
        </Row>
      </S.Article>
    </Cell>
  )
}

export default renderList
