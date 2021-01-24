import { makeStyles } from "@material-ui/core/styles"
import { navigate } from "gatsby"
import { Provider as GridProvider } from "griding"
import React, { useState } from "react"
import bgImage from "../assets/img/prog-5.jpg"
import logo from "../assets/img/reactlogo.png"
import styles from "../assets/jss/material-dashboard-react/layouts/adminStyle.js"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import "./styles.scss"
import { Container } from "../components/grid"

const useStyles = makeStyles(styles)

const Main = ({ children, categories }) => {
  const classes = useStyles()
  const [mobileOpen, setMobileOpen] = useState(false)

  const onClick = ({ text, cat, subCat }) => {
    if (text) {
      navigate(`/blog/${text}/`)
    } else if (subCat && cat) {
      navigate(`/blog/${cat}/${subCat}/`)
    } else if (cat) {
      navigate(`/blog/${cat}/`)
    } else {
      navigate("/blog")
    }
    return null
  }

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen)

  return (
    <Container>
      <GridProvider>
        <div className={classes.wrapper}>
          <Sidebar
            logoText={"just 4 dev"}
            logo={logo}
            image={bgImage}
            handleDrawerToggle={handleDrawerToggle}
            open={mobileOpen}
            color="white"
            categories={categories}
            onClick={onClick}
          />
          <div className={classes.mainPanel}>
            <Navbar handleDrawerToggle={handleDrawerToggle} />
            <div className={classes.content}>{children}</div>
          </div>
        </div>
      </GridProvider>
    </Container>
  )
}

export default Main
