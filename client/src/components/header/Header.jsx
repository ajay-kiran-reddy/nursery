import * as React from "react";
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
import GrassIcon from "@mui/icons-material/Grass";
import ForestIcon from "@mui/icons-material/Forest";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import { Link, Tooltip } from "@mui/material";
import LoginModal from "../login/LoginModal";
import { useState } from "react";
import SignUp from "../login/SignUp";
import Login from "../login/Login";
import { useDispatch } from "react-redux";
import { orderSlice } from "../orders/slices/slice";

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

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [showSignUp, setShowSignUp] = useState(false);
  const [disablePrimary, setDisablePrimary] = useState(true);
  const [disableSecondary, setDisableSecondary] = useState(true);
  const [openLogin, setOpenLogin] = useState(false);
  const [formData, setFormData] = useState();
  const dispatch = useDispatch();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
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
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>Admin Dashboard</MenuItem>
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
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={1} color="error">
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

  const signUpHelperText = (
    <Typography variant="caption" display="block" gutterBottom>
      Already have an account ?{" "}
      <Link
        style={{ cursor: "pointer" }}
        underline="hover"
        onClick={() => setShowSignUp(false)}
      >
        Login
      </Link>
    </Typography>
  );

  const loginHelperText = (
    <Typography variant="caption" display="block" gutterBottom>
      Don't have an account ?{" "}
      <Link
        style={{ cursor: "pointer" }}
        underline="hover"
        onClick={() => setShowSignUp(true)}
      >
        Sign Up
      </Link>
    </Typography>
  );

  const handleFormData = (data) => {
    setFormData(data);
  };

  React.useEffect(() => {
    if (formData) {
      /** if sign up screen is there, check for all three fields (email/password/userName) are entered or not */
      if (showSignUp) {
        const { userName, password, email } = formData;
        setDisablePrimary(!(userName && password && email));
      } else {
        /**if sign in screen is there, check for at least email field to enable forget password and check for email and password to enable login button */
        const { password, email } = formData;
        setDisablePrimary(!(password && email));
        setDisableSecondary(!email);
      }
    }
  }, [formData]);

  const handleActionButton = (data) => {
    if (data.buttonType === "primary") {
      if (showSignUp) {
        /**
         * dispatch sign up actions
         */
        dispatch(orderSlice.actions.storeSignUpInfo(formData));
      } else {
        /**
         * dispatch sign in actions
         */
        dispatch(orderSlice.actions.storeLoginInfo(formData));
      }
      // setOpenLogin(false);
    } else if (data.buttonType === "secondary") {
      dispatch(orderSlice.actions.storeForgotPasswordInfo(formData));
    } else if (data.buttonType === "close") {
      setOpenLogin(false);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <LoginModal
        open={openLogin}
        primaryButtonLabel={showSignUp ? "Sign Up" : "Sign In"}
        secondaryButtonLabel={!showSignUp && "Forgot Password"}
        onClose={handleActionButton}
        content={
          showSignUp ? (
            <SignUp handleFormDataCb={handleFormData} />
          ) : (
            <Login handleFormDataCb={handleFormData} />
          )
        }
        title={showSignUp ? "Sign Up" : "Login"}
        maxWidth="sm"
        helperText={showSignUp ? signUpHelperText : loginHelperText}
        disablePrimary={disablePrimary}
        disableSecondary={disableSecondary}
      ></LoginModal>

      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <GrassIcon fontSize="large" />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Green Nursery
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Tooltip title="Login">
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={() => setOpenLogin(true)}
              >
                <LoginIcon />
              </IconButton>
            </Tooltip>

            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={1} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
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
  );
}
