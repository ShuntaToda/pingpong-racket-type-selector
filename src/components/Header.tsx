import { AppBar, Box, Toolbar, Typography } from "@mui/material";

export const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography paddingY={3} color={"white"} variant="h5" fontWeight={"bold"} component="h1" sx={{ flexGrow: 1 }}>
            卓球ラケット選択App
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
