import { useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
// @mui
import { alpha } from "@mui/material/styles";
import {
  Box,
  Divider,
  Typography,
  Stack,
  MenuItem,
  Avatar,
  IconButton,
} from "@mui/material";
// components
import MenuPopover from "../../components/MenuPopover";
// mocks_
import account from "../../_mock/account";
// redux
import { useSelector } from "react-redux";
import { useEffect } from "react";

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: "Home",
    icon: "eva:home-fill",
    linkTo: "/",
  },
  {
    label: "Profile",
    icon: "eva:person-fill",
    linkTo: "#",
  },
  {
    label: "Settings",
    icon: "eva:settings-2-fill",
    linkTo: "#",
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const anchorRef = useRef(null);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [userDocID, setUserDocID] = useState();
  //   let name;

  // redux
  //   const userData = useSelector((state) => state.authdata);
  //   const { name, email, token, userDocID } = userData;

  const [open, setOpen] = useState(null);

  useEffect(async () => {
    // cookieData = document.cookie;
    // console.log("sessionStorage data => ", state.name);
    setName(sessionStorage.getItem("name"))
    setEmail(sessionStorage.getItem("email"))
    setUserDocID(sessionStorage.getItem("userDocID"))
    // name = await sessionStorage.getItem('name'),
    // setState({
    //   name: sessionStorage.getItem("name"),
    //   email: sessionStorage.getItem("email"),
    //   token: sessionStorage.getItem("token"),
    //   userDocID: sessionStorage.getItem("userDocID"),
    // });
    // cookieData = {
    //   name: sessionStorage.getItem("name"),
    //   email: sessionStorage.getItem("email"),
    //   token: sessionStorage.getItem("token"),
    //   userDocID: sessionStorage.getItem("userDocID"),
    // };
  },[]);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          "& .MuiMenuItem-root": {
            typography: "body2",
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {name}
            {/* {state.name == undefined ? null : state.name} */}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem
              key={option.label}
              to={option.linkTo}
              component={RouterLink}
              onClick={handleClose}
            >
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem onClick={handleClose} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </MenuPopover>
    </>
  );
}
