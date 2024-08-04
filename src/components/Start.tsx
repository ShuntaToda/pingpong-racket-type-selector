import { Box, Button, Typography, Zoom } from "@mui/material";
import { Node } from "../types/node";

type Props = {
  currentNode: Node;
  setIsStart: (request: boolean) => void;
  setCurrentId: (request: string) => void;
};

export const Start: React.FC<Props> = ({ currentNode, setIsStart, setCurrentId }) => {
  const clickStartBtn = () => {
    setCurrentId(currentNode.nextId!);
    setIsStart(true);
  };
  return (
    <Zoom in={currentNode ? true : false}>
      <Box>
        <Box paddingY={8}>
          <Typography variant="h5" component={"h2"}>
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
