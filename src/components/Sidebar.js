import Drawer from "@material-ui/core/Drawer"
import Hidden from "@material-ui/core/Hidden"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import { makeStyles } from "@material-ui/core/styles"
import classNames from "classnames"
import React from "react"
import styles from "../assets/jss/material-dashboard-react/components/sidebarStyle.js"

const useStyles = makeStyles(styles)

const Sidebar = (props) => {
  const classes = useStyles()
  const activeRoute = () => false

  const {
    color,
    logo,
    image,
    logoText,
    categories = [],
    layout,
    path,
    onClick,
  } = props
  const cats = categories.map((e) => e.categoryId)

  const brand = (
    <div className={classes.logo}>
      <a
        href="http://localhost:1234"
        className={classNames(classes.logoLink, {
          [classes.logoLinkRTL]: props.rtlActive,
        })}
        target="_blank"
        rel="noreferrer"
      >
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
        {logoText}
      </a>
    </div>
  )

  const renderSubCategories = (cat) => {
    const selectedCat = categories.find(
      (category) => category.categoryId === cat
    )
    const subCats = (selectedCat.subcategories || []).map(
      (e) => e.subcategoryId
    )
    const listItemClasses = classNames({
      [" " + classes[color]]: activeRoute(),
    })
    return subCats.map((subCat, i) => (
      <ListItem
        button
        className={classes.itemLink + listItemClasses}
        key={`${subCat}_${i}_item}`}
      >
        <ListItemText
          primary={subCat}
          className={classNames(classes.itemText, whiteFontClasses)}
          disableTypography={true}
          key={`${subCat}_${i}_text}`}
          onClick={() => onClick({ cat, subCat })}
        />
      </ListItem>
    ))
  }

  const whiteFontClasses = classNames({
    [" " + classes.whiteFont]: activeRoute(layout + path),
  })

  const links = (
    <List className={classes.list}>
      <ListItem button key={`all_posts_item}`}>
        <ListItemText
          primary="All Posts"
          className={classNames(classes.itemText, whiteFontClasses)}
          disableTypography={true}
          key={`all_posts_text}`}
          onClick={() => onClick({ text: "" })}
        />
        All Posts
      </ListItem>
      {cats.map((cat, i) => {
        let listItemClasses = null
        if (path === "/upgrade-to-pro") {
          listItemClasses = classNames({
            [" " + classes[color]]: true,
          })
        } else {
          listItemClasses = classNames({
            [" " + classes[color]]: activeRoute(),
          })
        }
        const whiteFontClasses = classNames({
          [" " + classes.whiteFont]: activeRoute(),
        })
        return (
          <ListItem
            button
            className={classes.itemLink + listItemClasses}
            key={`${cat}_${i}_item}`}
          >
            <ListItemText
              primary={cat}
              className={classNames(classes.itemText, whiteFontClasses)}
              disableTypography={true}
              key={`${cat}_${i}_text}`}
              onClick={() => onClick({ cat })}
            />
            {renderSubCategories(cat)}
          </ListItem>
        )
      })}
    </List>
  )

  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={props.rtlActive ? "left" : "right"}
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive,
            }),
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {brand}
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{
                backgroundImage: "url(" + image + ")",
              }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor={props.rtlActive ? "right" : "left"}
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive,
            }),
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{
                backgroundImage: "url(" + image + ")",
              }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  )
}

export default Sidebar
