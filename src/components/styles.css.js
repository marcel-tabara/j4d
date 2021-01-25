import { Link } from "gatsby"
import styled, { css } from "styled-components"

const infoStyles = css`
  color: #fff;
  margin-bottom: 0;
  font-size: 0.8rem;
  display: inline-block;
  margin-right: 2em;

  a {
    color: inherit;
  }
`

export const Footer = styled.footer`
  text-align: center;
  padding: 1em 0;
`
export const Article = styled.article`
  padding: 4em 0;
  border-bottom: 1px solid #eee;
`

export const Title = styled.h2`
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  color: 'red
`

export const DateText = styled.p`
  ${infoStyles}
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.6em;

  &:after {
    content: "";
    display: inline-block;
    border-top: 1px solid #ddd;
    position: relative;
    top: -2px;
  }
`

export const Category = styled.p`
  ${infoStyles}
  text-align: right;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.6em;
`

export const Image = styled.div`
  margin-left: -5em;
  border-radius: 2px;
  overflow: hidden;

  img {
    display: block;
    margin-bottom: 0;
  }
`

export const Pagination = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
`

export const PaginationItem = styled.li`
  min-width: 50px;
  margin: -1px 0.5em 0;
  padding: 1em 0;
  text-align: center;
  border-top: 1px solid transparent;

  ${({ current }) =>
    current &&
    css`
      border-top: 1px solid #000;
    `}
`

export const HeaderSectionWrapper = styled.div`
  background-color: "red";
  display: flex;
  justify-content: "center";
  width: "100%";
`

export const HeaderSectionTitle = styled.h1`
  margin-top: 1rem;
  font-size: 1rem;
  text-transform: uppercase;
`

export const HeaderSectionLink = styled(Link)`
  margin-right: 1em;
  margin-bottom: 1em;
`

export const HeaderSectionList = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const BlogContent = styled.div`
  margin: 6em 0;
`

export const NavigationPost = styled.div`
  display: flex;
  margin-bottom: 5em;
  padding-top: 3em;
  border-top: 1px solid #eee;
  font-size: 0.8rem;

  > div {
    margin: auto;
  }
`
