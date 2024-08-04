import { AppBar, Box, Toolbar, Typography } from "@mui/material";

export const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            marginLeft={8}
            paddingY={3}
            color={"white"}
            variant="h4"
            fontWeight={"bold"}
            component="h1"
            sx={{ flexGrow: 1 }}
          >
            卓球ラケット選択 App
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
