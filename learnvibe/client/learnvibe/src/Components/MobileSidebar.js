import React from "react";
import { Drawer, IconButton, List, ListItem, ListItemText, Box, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

const MobileSidebar = ({ open, toggleSidebar, isAdmin, token, setToken }) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={toggleSidebar}
      sx={{
        "& .MuiDrawer-paper": {
          width: "280px",
          backgroundColor: "#0c0d3a", // Match your UI color
          color: "white",
          padding: "16px",
        },
      }}
    >
      {/* Close Button */}
      <Box display="flex" justifyContent="flex-end">
        <IconButton onClick={toggleSidebar} sx={{ color: "white", fontSize: "30px" }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Navigation Links */}
      <List>
        {[
          { name: "Home", path: "/" },
          { name: "Courses", path: "/courses" },
          { name: "Playground", path: "/playground" },
          { name: "About", path: "/about" },
          isAdmin && { name: "Dashboard", path: "/adddata" },
        ]
          .filter(Boolean)
          .map(({ name, path }) => (
            <ListItem key={name} button component={Link} to={path} onClick={toggleSidebar}>
              <ListItemText primary={name} sx={{ color: "white" }} />
            </ListItem>
          ))}
      </List>

      <Divider sx={{ backgroundColor: "white", marginY: "10px" }} />

      {/* Authentication Section */}
      {token ? (
        <Box mt={2}>
          <button
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
            onClick={() => {
              setToken(null);
              toggleSidebar();
            }}
          >
            Logout
          </button>
        </Box>
      ) : (
        <Box display="flex" flexDirection="column" gap={2} mt={2}>
          <Link to="/signin" className="text-white text-sm" onClick={toggleSidebar}>
            Sign in
          </Link>
          <Link
            to="/signup"
            className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 text-white text-center"
            onClick={toggleSidebar}
          >
            Sign up
          </Link>
        </Box>
      )}
    </Drawer>
  );
};

export default MobileSidebar;
