import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import Link from "next/link";

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#4a84e0" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Simple blog</h2>
        <Box>
          <Button>
            <Link style={{ color: "#fff", textDecoration: "none" }} href="/">
              Home
            </Link>
          </Button>
          <Button color="inherit">
            <Link style={{ color: "#fff", textDecoration: "none" }} href="/adm">
              Admin
            </Link>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
