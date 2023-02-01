import * as React from "react"
import { styled, alpha } from "@mui/material/styles"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import InputBase from "@mui/material/InputBase"
import MenuIcon from "@mui/icons-material/Menu"
import SearchIcon from "@mui/icons-material/Search"
import "./App.css"
import { useState } from "react"
import EmployeeDetails from "./components/employee-details"
import {
  getCompensationAsync,
  getEmployeeAsync,
  getNumberOfReportsAsync,
  useAppDispatch,
} from "./store"

interface AppState {
  searchQuery: string
}

function App() {
  const dispatch = useAppDispatch()
  const [searchState, setSearchState] = useState<AppState>({ searchQuery: "" })
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }))

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }))

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "40ch",
        },
      },
    },
  }))

  const onSearchInput = (event: any) => {
    setSearchState((currentState) => {
      currentState.searchQuery = event.nativeEvent?.target?.value
      return currentState
    })
  }

  const onSearchKeyPress = (event: any) => {
    if (event.code === "Enter") {
      dispatch(getEmployeeAsync(searchState?.searchQuery))
      dispatch(getCompensationAsync(searchState?.searchQuery))
      dispatch(getNumberOfReportsAsync(searchState?.searchQuery))
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Employees and Compensations
          </Typography>
        </Toolbar>
      </AppBar>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          fullWidth={true}
          placeholder="EmployeeId"
          inputProps={{ "aria-label": "search" }}
          onInput={onSearchInput}
          onKeyPress={onSearchKeyPress}
        />
      </Search>
      <EmployeeDetails />
    </Box>
  )
}

export default App
