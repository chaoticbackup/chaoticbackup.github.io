import React, { Fragment, MouseEvent } from 'react';
import {Link} from 'react-router-dom';
import { makeStyles, useTheme, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Toolbar, IconButton, AppBar, Typography, Container, Box, Menu,
  MenuItem
} from '@material-ui/core';
import {Menu as MenuIcon} from '@material-ui/icons';
import { blue } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[900],
    },
  }
})

export default function(props: { routing: any; }) {
  return (
    <ThemeProvider
      theme={theme}
    >
      <Base {...props} />
    </ThemeProvider>
  );
}


const headerStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  menu: {
    marginTop: theme.spacing(6),
  }
}));

const mainStyles = makeStyles(theme => ({
  root: {
    padding: 0,
  },
  content: {
    padding: "0 24px",
  }
}));

function Base(props: { routing: any; }) {
  const children = props.routing();
  const header = headerStyles(useTheme());
  const main = mainStyles(useTheme());
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <Menu
        id="top-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={header.menu}
      >
        <MenuItem onClick={handleClose}><Link to="/">Home</Link></MenuItem>
        <MenuItem onClick={handleClose}><Link to={`/collection/`}>Collect</Link></MenuItem>
        <MenuItem onClick={handleClose}><Link to="create">Build</Link></MenuItem>
        <MenuItem onClick={handleClose}><a href="http://chaoticbackup.forumotion.com">Forums</a></MenuItem>
        <MenuItem onClick={handleClose}><Link to={`/portal/`}>Portal</Link></MenuItem>
        <MenuItem onClick={handleClose}><a href="https://untap.in">Play</a></MenuItem>
      </Menu>
      <AppBar className={header.root} position="static">
        <Toolbar>
          <IconButton 
            edge="start" 
            className={header.menuButton} 
            color="inherit" 
            aria-label="menu"
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={header.title}>Chaotic Backup</Typography>
        </Toolbar>
      </AppBar>
      <Container className={main.root}>
        <Box 
          className={main.content}
          bgcolor="text.secondary"
          color="background.paper"
        >
          {children}
        </Box>
      </Container>
    </Fragment>
  );
}