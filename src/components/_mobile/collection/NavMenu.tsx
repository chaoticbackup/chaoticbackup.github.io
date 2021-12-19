import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, IconButton, MenuItem, MenuList, Toolbar, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavMenu = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (<>
    <IconButton
      size="large"
      edge="start"
      color="inherit"
      aria-label="menu"
      onClick={handleToggle}
      sx={{ mr: 1, p: 2,
        [theme.breakpoints.up("sm")]: {
          margin: "auto",
        },
        [theme.breakpoints.down("sm")]: {
          // top: `-${theme.spacing(2)}`,
          marginBottom: 0,
          marginLeft: 1
        }
      }}
    >
      <MenuIcon />
    </IconButton>
    <Drawer
      anchor="left"
      open={open}
      onClose={handleToggle}
    >
      <Toolbar />
      <MenuList
        autoFocusItem={open}
        id="composition-menu"
        aria-labelledby="composition-button"
      >
        <MenuItem component={Link} to="/">Home</MenuItem>
        <MenuItem onClick={handleToggle}>Collection</MenuItem>
        <MenuItem component={Link} to="/portal/">Portal</MenuItem>
        <MenuItem component="a" href="https://chaoticbackup.forumotion.com">Forum</MenuItem>
        <MenuItem component="a" href="https://chaoticrecode.com">Play</MenuItem>
      </MenuList>
    </Drawer>
  </>);
};

export default NavMenu;

/* 
const NavMenu = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const prevOpen = React.useRef(open);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current &&
        anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  // return focus to the button when we transitioned from !open -> open
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  // TODO change from popper to drawer

  return (<>
    <IconButton
      size="large"
      edge="start"
      color="inherit"
      aria-label="menu"
      ref={anchorRef}
      onClick={handleToggle}
      sx={{ mr: 1, p: 2,
        [theme.breakpoints.down("sm")]: {
          top: `-${theme.spacing(2)}`,
          marginBottom: 0
        }
      }}
    >
      <MenuIcon />
    </IconButton>
    <Popper
      open={open}
      anchorEl={anchorRef.current}
      role={undefined}
      placement="bottom-start"
      transition
      disablePortal
      popperOptions={{
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 16],
            },
          },
        ]
      }}
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin: (placement === 'bottom-start') ? 'left top' : 'left bottom',
          }}
        >
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList
                autoFocusItem={open}
                id="composition-menu"
                aria-labelledby="composition-button"
                onKeyDown={handleListKeyDown}
              >
                <MenuItem component={Link} to="/">Home</MenuItem>
                <MenuItem onClick={handleClose}>Collection</MenuItem>
                <MenuItem component={Link} to="/portal/">Portal</MenuItem>
                <MenuItem component="a" href="https://chaoticbackup.forumotion.com">Forum</MenuItem>
                <MenuItem component="a" href="https://chaoticrecode.com">Play</MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  </>);
};

*/
