import AppBar from "@material-ui/core/AppBar"
import Hidden from "@material-ui/core/Hidden"
import IconButton from "@material-ui/core/IconButton"
import { makeStyles } from "@material-ui/core/styles"
import Toolbar from "@material-ui/core/Toolbar"
import Menu from "@material-ui/icons/Menu"
import classNames from "classnames"
import React from "react"
import styles from "../assets/jss/material-dashboard-react/components/headerStyle.js"

const useStyles = makeStyles(styles)

const NavBar = ({ color, handleDrawerToggle }) => {
  const classes = useStyles()
  const appBarClasses = classNames({
    [" " + classes[color]]: color,
  })
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex} />
        <Hidden smDown implementation="css">
          <div className={classes.searchWrapper} />
        </Hidden>
        <Hidden mdUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
