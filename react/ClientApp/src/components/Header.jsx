import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserService from "../services/UserService";

import Logo from "../pictures/logo.png";

import "../styles/generalStyle.css";
import "../styles/headerStyle.css";

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElNav2, setAnchorElNav2] = React.useState(null);
  const [hideAfterLogin, setHideAfterLogin] = React.useState(true);

  React.useEffect(() => {
    try {
      if (UserService.getUser().email == null) {
        setHideAfterLogin(true);
      } else {
        setHideAfterLogin(false);
      }
    } catch (error) {
      setHideAfterLogin(true);
    }
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenNavMenu2 = (event) => {
    setAnchorElNav2(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseNavMenu2 = () => {
    setAnchorElNav2(null);
  };

  const handleLogout = () => {
    UserService.logout();
    window.location.reload();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "white" }}>
      <Container maxWidth="x2">
        <Toolbar disableGutters>
          <Box
            sx={{
              borderRadius: 10,
              display: { xs: "flex", lg: "none" },
              ":hover": { bgcolor: "lightblue" },
            }}
          >
            <IconButton
              size="small"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu2}
              color="black"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav2}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav2)}
              onClose={handleCloseNavMenu2}
              sx={{
                display: { xs: "flex", lg: "none" },
                textDecoration: "none",
              }}
              color="black"
            >
              <div className="flex-container-vertical" id="menu">
                <Button size="large" variant="text">
                  <Link className="nav" to="/">
                    Startpagina
                  </Link>
                </Button>
                <Button size="large" variant="text">
                  <Link className="nav" to="/voorstellingen">
                    Voorstellingen
                  </Link>
                </Button>
                <Button size="large" variant="text">
                  <Link className="nav" to="/toegankelijkheid">
                    Toegankelijkheid
                  </Link>
                </Button>

                <Button size="large" variant="text">
                  <Link className="nav" to="/contactgegevens">
                    Contactgegevens
                  </Link>
                </Button>
                <div
                  className={`AfterLogin ${
                    hideAfterLogin ? "hide-AfterLogin" : ""
                  }`}
                >
                  <Button size="large" variant="text">
                    <Link className="nav" to="/bezoekersportaal">
                      Bezoekersportaal
                    </Link>
                  </Button>
                </div>
              </div>
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            size="small"
            sx={{
              display: { xs: "none", lg: "flex" },
            }}
          >
            <img className="logo" src={Logo} alt="Theater Laak" />
          </Typography>

          <Typography
            variant="h2"
            noWrap
            component="a"
            href=""
            size="small"
            sx={{
              display: { xs: "flex", lg: "none" },
              width: "35%",
              transform: "translateX(110%)",
            }}
          >
            <img src={Logo} alt="Theater Laak" />
          </Typography>

          <Box
            sx={{
              borderRadius: 10,
              display: { xs: "flex", lg: "none" },
              ":hover": { bgcolor: "lightblue" },
              position: "absolute",
              right: 0,
            }}
          >
            <IconButton
              size="small"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="black"
            >
              <AccountCircleIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "flex", lg: "none" },
                textDecoration: "none",
              }}
            >
               {UserService.isLoggedIn() ? (
              <li className="User">
                <Button onClick={handleLogout()}>Uitloggen</Button>
              </li>
            ) : (
              <>
                <li className="User">
                  <Button variant="outlined" disableElevation>
                    <Link to="/inloggen">Inloggen</Link>
                  </Button>
                </li>
                <li className="User">
                  <Button variant="contained" disableElevation>
                    <Link to="/registreren">Registreren</Link>
                  </Button>
                </li>
              </>
            )}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", lg: "flex" } }}>
            <li>
              <a>
                <Button variant="text">
                  <Link to="/">Startpagina</Link>
                </Button>
              </a>
            </li>
            <li>
              <a>
                <Button variant="text">
                  <Link to="/voorstellingen">Voorstellingen</Link>
                </Button>
              </a>
            </li>
            <li>
              <a>
                <Button variant="text">
                  <Link to="/toegankelijkheid">Toegankelijkheid</Link>
                </Button>
              </a>
            </li>
            <li>
              <a>
                <Button variant="text">
                  <Link to="/contactgegevens">Contactgegevens</Link>
                </Button>
              </a>
            </li>
            <div
              className={`AfterLogin ${
                hideAfterLogin ? "hide-AfterLogin" : ""
              }`}
            >
              <li>
                <a>
                  <Button variant="text">
                    <Link to="/bezoekersportaal">Bezoekersportaal</Link>
                  </Button>
                </a>
              </li>
            </div>
          </Box>
          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
              marginRight: { lg: "50px" },
            }}
          >
            {UserService.isLoggedIn() ? (
              <li className="User">
                <Button onClick={handleLogout()}>Uitloggen</Button>
              </li>
            ) : (
              <>
                <li className="User">
                  <Button variant="outlined" disableElevation>
                    <Link to="/inloggen">Inloggen</Link>
                  </Button>
                </li>
                <li className="User">
                  <Button variant="contained" disableElevation>
                    <Link to="/registreren">Registreren</Link>
                  </Button>
                </li>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
