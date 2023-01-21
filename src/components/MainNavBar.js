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
import { useNavigate, Link } from "react-router-dom";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import UpgradeUserModal from "./UpgradeUserModal";
import Cart from "./Cart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CreateCampaignModal from "./CreateCmpaignModal";
import { useSelector, useDispatch } from 'react-redux'
import { sliceSignOut } from '../redux/features/UserSlice';
import { clearCart } from '../redux/features/CartSlice';
import SettingsIcon from '@mui/icons-material/Settings';
import Tooltip from '@mui/material/Tooltip';
import Popover from '@mui/material/Popover';
import MaterialUISwitch from "./MaterialUISwitch";
import { productTypes } from "../utils/constants";


export default function MainNavBar(props) {
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.cart.products)
  const navigate = useNavigate();
  const isSignedIn = user.isLoggedIn;
  const isAdmin = isSignedIn && user.roles.includes("ROLE_ADMIN");
  const isEmployee = isSignedIn &&  user.roles.includes("ROLE_EMPLOYEE") || isAdmin;
  const isClient = isSignedIn &&  user.roles.includes("ROLE_CLIENT");

  const [themeSwitchChecked, setThemeSwitchChecked] = React.useState(true);

  const handleThemeSwitchChange = (event) => {
    setThemeSwitchChecked(event.target.checked);
  };

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
  // const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const [anchorElSettings, setAnchorElSettings] = React.useState(null);
  // const [mobileMoreAnchorElSettings, setMobileMoreAnchorElSettings] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const isSettingsMenuOpen = Boolean(anchorElSettings);
  // const isMobileSettingsMenuOpen = Boolean(mobileMoreAnchorElSettings);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // const handleMobileMenuClose = () => {
  //   setMobileMoreAnchorEl(null);
  // };

  const handleMenuClose = () => {
    setAnchorEl(null);
    // handleMobileMenuClose();
  };

  // const handleMobileMenuOpen = (event) => {
  //   setMobileMoreAnchorEl(event.currentTarget);
  // };

  const handleSettingsMenuOpen = (event) => {
    setAnchorElSettings(event.currentTarget);
  };

  // const handleMobileSettingsClose = () => {
  //   setMobileMoreAnchorElSettings(null);
  // };

  const handleSettingsMenuClose = () => {
    setAnchorElSettings(null);
    // handleMobileSettingsClose();
  };

  // const handleSettingsMobileMenuOpen = (event) => {
  //   setMobileMoreAnchorElSettings(event.currentTarget);
  // };

  const signOutUser = () => {
    dispatch(clearCart())
    dispatch(sliceSignOut());
    handleMenuClose();
    navigate("/");
  }

  const handleMyAccountClick = () => {
    handleMenuClose();
    navigate("/myAccount");
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
      {/* <MenuItem onClick={handleMenuClose}>Profile</MenuItem> */}
      <MenuItem onClick={handleMyAccountClick}>My account</MenuItem>
      <MenuItem onClick={signOutUser}>Sign Out</MenuItem>
    </Menu>
  );

  // const mobileMenuId = "primary-search-account-menu-mobile";
  // const renderMobileMenu = (
  //   <Menu
  //     anchorEl={mobileMoreAnchorEl}
  //     anchorOrigin={{
  //       vertical: "top",
  //       horizontal: "right",
  //     }}
  //     id={mobileMenuId}
  //     keepMounted
  //     transformOrigin={{
  //       vertical: "top",
  //       horizontal: "right",
  //     }}
  //     open={isMobileMenuOpen}
  //     onClose={handleMobileMenuClose}
  //   >
  //     <MenuItem onClick={handleModalOpen}>
  //       <IconButton size="large" color="inherit">
  //         <AddBoxIcon open={isModalOpen} onClose={handleModalClose} />
  //       </IconButton>
  //       <p>Add Product</p>
  //     </MenuItem>
  //     <MenuItem>
  //       <IconButton size="large" aria-label="show 4 new mails" color="inherit">
  //         <Badge badgeContent={4} color="error">
  //           <MailIcon />
  //         </Badge>
  //       </IconButton>
  //       <p>Messages</p>
  //     </MenuItem>
  //     <MenuItem>
  //       <IconButton
  //         size="large"
  //         aria-label="show 17 new notifications"
  //         color="inherit"
  //       >
  //         <Badge badgeContent={17} color="error">
  //           <NotificationsIcon />
  //         </Badge>
  //       </IconButton>
  //       <p>Notifications</p>
  //     </MenuItem>
  //     <MenuItem onClick={handleProfileMenuOpen}>
  //       <IconButton
  //         size="large"
  //         aria-label="account of current user"
  //         aria-controls="primary-search-account-menu"
  //         aria-haspopup="true"
  //         color="inherit"
  //       >
  //         <AccountCircle />
  //       </IconButton>
  //       <p>Profile</p>
  //     </MenuItem>
  //   </Menu>
  // );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
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
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              display: {
                // xs: "none",
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
            </Typography></> 
          : null}

          {/* {isSignedIn ? */}
            {/* <Box sx={{ display: { xs: "none", md: "flex" } }}> */}
            <Box sx={{ display: "flex" }}>
              {isEmployee ? <><IconButton size="large" color="inherit" onClick={handleModalOpen}>
                  <AddBoxIcon />
                </IconButton>
                <AddProduct open={isModalOpen} onClose={handleModalClose} /></>
              : null}

              {isAdmin ? <><IconButton
                  size="large"
                  color="inherit"
                  onClick={handleUpgradeModalOpen}
                >
                  <UpgradeIcon />
                </IconButton>
                <UpgradeUserModal
                  open={isUpgradeModalOpen}
                  onClose={handleUpgradeModalClose}
                /></> 
              : null}

              {isEmployee ? <><IconButton
                  size="large"
                  color="inherit"
                  onClick={handleCampaignModalOpen}
                >
                  <CreateOutlinedIcon />
                </IconButton>
                <CreateCampaignModal
                  open={isCampaignModalOpen}
                  onClose={handleCampaignModalClose}
                /></> 
              : null}

              {isClient ? <><IconButton
                  size="large"
                  color="inherit"
                  component={Link}
                  to="/cart"
                  // onClick={handleCartModalOpen}
                >
                  <Badge badgeContent={products.length} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton></> 
              : null}

              {/* {isSignedIn ?  */}
              <><IconButton size="large" onClick={handleSettingsMenuOpen} color="inherit">
                  <SettingsIcon/>
                </IconButton>
                <Popover
                  id="menu-appbar"
                  open={isSettingsMenuOpen}
                  anchorEl={anchorElSettings}
                  onClose={handleSettingsMenuClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <Box
                    sx={{
                    marginY: 3,
                    marginX: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    }}
                  >
                    <Typography sx={{mb: 1}}>Change Theme</Typography>
                    <MaterialUISwitch 
                      handleSwitch={() => props.changeTheme() }
                    />
                  </Box>
                </Popover></> 
              {/* // : null} */}
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
                </IconButton> 
              : null}
             </Box>

            {/* <Box sx={{ display: { xs: "flex", md: "none" } }}>
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
            </Box> */}
        </Toolbar>
      </AppBar>
      <Toolbar />
      {/* {isSignedIn && renderMobileMenu} */}
      {isSignedIn && renderMenu}
    </Box>
  );
}
