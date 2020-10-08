import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navrbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link className="nav_links" to="/">
              <i class="fas fa-home"></i> Home
            </Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Link className="nav_links" to="/player">
              <i class="fas fa-trophy"></i> 1 Vs 1
            </Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Link className="nav_links" to="/News">
              <i class="far fa-newspaper"></i> News
            </Link>
          </Typography>

          <Button color="inherit">
            <i class="fas fa-sign-in-alt"></i> Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

// const Navbar = () => {
//     return (
//         <nav>
//             <ul className="nav_links">
//                 <li >
//                     <Link className="nav_links" to="/player">1 Vs 1</Link>
//                 </li>
//                 <li>One</li>
//                 <li>One</li>
//                 <li>One</li>
//             </ul>
//         </nav>
//     )
// }

// export default Navbar
