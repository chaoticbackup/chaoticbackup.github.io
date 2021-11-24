import React, { useState, useEffect } from 'react';
import { ClickAwayListener, Grow, IconButton, MenuItem, MenuList, Paper, Popper } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const NavMenu = () => {
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

  return (<>
    <IconButton
      size="large"
      edge="start"
      color="inherit"
      aria-label="menu"
      ref={anchorRef}
      onClick={handleToggle}
      sx={{ margin: "auto", mr: 1, p: 2 }}
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

export default NavMenu;
