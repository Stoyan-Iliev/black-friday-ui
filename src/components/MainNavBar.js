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
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import AddProduct from "./AddProduct";
import { Link } from "react-router-dom";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import UpgradeUserModal from "./UpgradeUserModal";
import Cart from "./Cart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CreateCampaignModal from "./CreateCmpaignModal";
import { useSelector, useDispatch } from 'react-redux'
import { sliceSignOut } from '../redux/features/UserSlice';
import { clearCart } from '../redux/features/CartSlice';


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

export default function MainNavBar() {
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.cart.products)
  console.log("USER: ", user)
  const isSignedIn = user.isLoggedIn;
  const isAdmin = user.roles && user.roles.includes("ROLE_ADMIN");
  const isEmployee = user.roles &&  user.roles.includes("ROLE_EMPLOYEE") || isAdmin;
  console.log("IS_ADMIN: ", isAdmin)
  console.log("IS_EMPLOYEE: ", isEmployee )
  const isClient = user.roles &&  user.roles.includes("ROLE_CLIENT");
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = React.useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const [isUpgradeModalOpen, setUpgradeModalOpen] = React.useState(false);
  const handleUpgradeModalOpen = () => setUpgradeModalOpen(true);
  const handleUpgradeModalClose = () => setUpgradeModalOpen(false);

  const [isCampaignModalOpen, setCampaignModalOpen] = React.useState(false);
  const handleCampaignModalOpen = () => setCampaignModalOpen(true);
  const handleCampaignModalClose = () => setCampaignModalOpen(false);

  const [isCartModalOpen, setCartModalOpen] = React.useState(false);
  const handleCartModalOpen = () => setCartModalOpen(true);
  const handleCartModalClose = () => setCartModalOpen(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

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

  const signOutUser = () => {
    console.log("SIGN OUT")
    dispatch(clearCart())
    dispatch(sliceSignOut());
    handleMenuClose();
  }

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
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
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={signOutUser}>Sign Out</MenuItem>
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
      <MenuItem onClick={handleModalOpen}>
        <IconButton size="large" color="inherit">
          <AddBoxIcon open={isModalOpen} onClose={handleModalClose} />
        </IconButton>
        <p>Add Product</p>
      </MenuItem>
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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              display: {
                xs: "none",
                sm: "block",
                textDecoration: "none",
                color: "inherit",
              },
            }}
          >
            Black Friday Store
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {!isSignedIn ? <><Typography
            variant="h6"
            noWrap
            component={Link}
            to="/signIn"
            sx={{
              display: {
                xs: "none",
                sm: "block",
                textDecoration: "none",
                color: "inherit",
                marginLeft: "10px",
              },
            }}
          >
            Sign In
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/signUp"
            sx={{
              display: {
                xs: "none",
                sm: "block",
                textDecoration: "none",
                color: "inherit",
                marginLeft: "10px",
              },
            }}
          >
            Sign Up
          </Typography></> : null}
          {isSignedIn ?
            <><Box sx={{ display: { xs: "none", md: "flex" } }}>
              {isEmployee ? <><IconButton size="large" color="inherit" onClick={handleModalOpen}>
                <AddBoxIcon />
              </IconButton>
              <AddProduct open={isModalOpen} onClose={handleModalClose} />
              <IconButton
                size="large"
                color="inherit"
                onClick={handleUpgradeModalOpen}
              >
                <UpgradeIcon />
              </IconButton>
              {isAdmin ? <UpgradeUserModal
                open={isUpgradeModalOpen}
                onClose={handleUpgradeModalClose}
              /> : null}
              <IconButton
                size="large"
                color="inherit"
                onClick={handleCampaignModalOpen}
              >
                <CreateOutlinedIcon />
              </IconButton>
              <CreateCampaignModal
                open={isCampaignModalOpen}
                onClose={handleCampaignModalClose}
              /></> : null}
              {isClient ? <IconButton
                size="large"
                color="inherit"
                component={Link}
                to="/cart"
                // onClick={handleCartModalOpen}
              >
                <Badge badgeContent={products.length} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton> : null}
              {/* <Cart open={isCartModalOpen} onClose={handleCartModalClose} /> */}
              {isSignedIn ? <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton> : null}
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
            </Box></> 
          : null}
        </Toolbar>
      </AppBar>
      <Toolbar />
      {isSignedIn && renderMobileMenu}
      {isSignedIn && renderMenu}
    </Box>
  );
}
