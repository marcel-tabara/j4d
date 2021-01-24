import { makeStyles } from "@material-ui/core/styles"
import React from "react"
import styles from "../assets/jss/material-dashboard-react/components/headerStyle.js"
import CustomInput from "./CustomInput/CustomInput.js"

const useStyles = makeStyles(styles)

const SearchBar = ({ color, onSearchChange }) => {
  const classes = useStyles()

  return (
    <div className={classes.searchWrapper}>
      <CustomInput
        onChange={onSearchChange}
        formControlProps={{
          className: classes.margin + " " + classes.search,
        }}
        inputProps={{
          placeholder: "Search",
          inputProps: {
            "aria-label": "Search",
          },
        }}
      />
    </div>
  )
}

export { SearchBar }
