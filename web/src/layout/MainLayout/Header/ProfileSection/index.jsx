import { useState, useRef, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Chip,
  ClickAwayListener,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Typography
} from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
import User1 from 'assets/images/users/user-round.svg';
import useLogin from 'hooks/useLogin';

// assets
import { Icon } from '@iconify/react';

import { useTranslation } from 'react-i18next';

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const customization = useSelector((state) => state.customization);
  const account = useSelector((state) => state.account);
  const { logout } = useLogin();

  const [open, setOpen] = useState(false);
  /**
   * anchorRef is used on different componets and specifying one type leads to other components throwing an error
   * */
  const anchorRef = useRef(null);
  const handleLogout = async () => {
    logout();
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Chip
        sx={{
          height: '48px',
          alignItems: 'center',
          borderRadius: '27px',
          transition: 'all .2s ease-in-out',
          backgroundColor: 'transparent',
          border: 'none',
          '&[aria-controls="menu-list-grow"], &:hover': {
            boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)',
            borderRadius: '50%',
            '& svg': {
              stroke: theme.palette.primary.light
            }
          },
          '& .MuiChip-label': {
            display: 'none'
          }
        }}
        icon={
          <Avatar
            src={account.user?.avatar_url || User1}
            sx={{
              ...theme.typography.mediumAvatar,
              margin: '8px !important',
              cursor: 'pointer'
            }}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            color="inherit"
          />
        }
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
      />
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 14]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                  <List
                    component="nav"
                    sx={{
                      width: '100%',
                      maxWidth: 350,
                      minWidth: 150,
                      backgroundColor: theme.palette.background.paper,
                      borderRadius: '10px',
                      [theme.breakpoints.down('md')]: {
                        minWidth: '100%'
                      },
                      '& .MuiListItemButton-root': {
                        mt: 0.5
                      }
                    }}
                  >
                    <ListItemButton sx={{ borderRadius: `${customization.borderRadius}px` }} onClick={() => navigate('/panel/profile')}>
                      <ListItemIcon>
                        <Icon icon="solar:user-id-bold-duotone" width="1.3rem" />
                      </ListItemIcon>
                      <ListItemText primary={<Typography variant="body2">{t('setting')}</Typography>} />
                    </ListItemButton>

                    <ListItemButton sx={{ borderRadius: `${customization.borderRadius}px` }} onClick={handleLogout}>
                      <ListItemIcon>
                        <Icon icon="solar:logout-3-bold-duotone" width="1.3rem" />
                      </ListItemIcon>
                      <ListItemText primary={<Typography variant="body2">{t('menu.signout')}</Typography>} />
                    </ListItemButton>
                  </List>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  );
};

export default ProfileSection;
