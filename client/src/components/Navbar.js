import * as React from "react";
import { Link, Outlet } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import NightlightIcon from "@mui/icons-material/Nightlight";

import WbSunnyIcon from "@mui/icons-material/WbSunny";
import '../Style/navbar.css'

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [logged, setLogged] = React.useState(false);
  const [businessUser, setBusinessUser] = React.useState(false);
  const [adminUser, setAdminUser] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(false);
  const [searchValue , setSearchValue] = React.useState("");

  React.useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    if (user) setLogged(true);
    if (user && user.isBusiness) setBusinessUser(true);
    if (user && user.admin) setAdminUser(true);
  }, []);

 

  function changeDarkMode() {
    setDarkMode(!darkMode);
    console.log(darkMode);
    if (darkMode) {
      document.body.style.background = "#161647";
      document.body.style.color = "white";
    } else {
      document.body.style.background = "white";
    }
  }

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const logout = () => {
    handleMenuClose();
    localStorage.removeItem("user");
    setLogged(false);
    setBusinessUser(false);
    setAdminUser(false);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={logout}>Logout</MenuItem>
      {/* <MenuItem onClick={handleMenuClose}>My account</MenuItem> */}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
            <Link to="/">
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                Bcard
              </Typography>
            </Link>
            <Link to="/about">
              <h4 style={{ color: "white", marginLeft: "20px" }}>About</h4>
            </Link>
            {logged ? (
              <div>
                <Link to="/favcards">
                  <h4 style={{ color: "white", marginLeft: "20px" }}>
                    Fav cards
                  </h4>
                </Link>
              </div>
            ) : (
              <></>
            )}
            {/* <Link to="/newcard">
              <h4 style={{ color: "white", marginLeft: "20px" }}>
                Add new card
              </h4>
            </Link> */}
            {businessUser ? (
              <div>
                <Link to="/newcard">
                  <h4 style={{ color: "white", marginLeft: "20px" }}>
                    Add new card
                  </h4>
                </Link>
              </div>
            ) : (
              <></>
            )}
            {adminUser ? (
              <div>
                <Link to="/newcard">
                  <h4 style={{ color: "white", marginLeft: "20px" }}>
                    Add new card
                  </h4>
                </Link>
                <Link to="/favcards">
                  <h4 style={{ color: "white", marginLeft: "20px" }}>
                    sandbox
                  </h4>
                </Link>
              </div>
            ) : (
              <></>
            )}
            {/* <Link to="/favcards">
              <h4 style={{ color: "white", marginLeft: "20px" }}>Fav cards</h4>
            </Link> */}
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={searchValue}
                onChange={(e)=>setSearchValue(e.target.value)}
              />
            </Search>
           
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {darkMode ? (
              <WbSunnyIcon
                onClick={changeDarkMode}
                style={{ color: "white", marginLeft: "20px" }}
              />
            ) : (
              <NightlightIcon
                onClick={changeDarkMode}
                style={{ color: "black", marginLeft: "20px" }}
              />
            )}
              {!logged ? (
                <div style={{ display: "flex" }}>
                  <Link to="/signup">
                    <h4 style={{ color: "white", marginLeft: "20px" }}>
                      sign up
                    </h4>
                  </Link>
                  <Link to="/login">
                    <h4 style={{ color: "white", marginLeft: "20px" }}>
                      log in
                    </h4>
                  </Link>
                </div>
              ) : (
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              )}
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
      <Outlet context={{searchValue:searchValue}}/>
    </div>
  );
}
