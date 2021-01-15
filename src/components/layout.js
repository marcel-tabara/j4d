/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import { graphql, StaticQuery } from "gatsby"
import { Provider as GridProvider } from "griding"
import PropTypes from "prop-types"
import React from "react"
import Typography from "typography"
import moragaTheme from "typography-theme-moraga"
import * as S from "../components/styles.css"



const typography = new Typography(moragaTheme)
typography.injectStyles()

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={(data) => (
      <GridProvider>
        <>
          <main>{children}</main>

          <S.Footer>
            Footer
          </S.Footer>
        </>
      </GridProvider>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
