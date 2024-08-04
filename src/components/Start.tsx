import { Box, Button, Typography, Zoom } from "@mui/material";
import { Node } from "../types/node";

type Props = {
  currentNode: Node;
  setIsStart: (request: boolean) => void;
};

export const Start: React.FC<Props> = ({ currentNode, setIsStart }) => {
  const clickStartBtn = () => {
    setIsStart(true);
  };
  return (
    <Zoom in={currentNode ? true : false}>
      <Box>
        <Box paddingY={8}>
          <Typography variant="h4" component={"h2"}>
            {currentNode.text}
          </Typography>
        </Box>
        <Box>
          <Button variant="contained" size="large" color="warning" onClick={clickStartBtn}>
            <Typography>スタート</Typography>
          </Button>
        </Box>
      </Box>
    </Zoom>
  );
};
