import { Box, Typography, Zoom } from "@mui/material";
import { Node } from "../types/node";

type Props = {
  currentNode: Node;
};

export const NodeContent: React.FC<Props> = ({ currentNode }) => {
  return (
    <Zoom in={currentNode ? true : false}>
      <Box>
        <Box paddingY={8}>
          <Typography variant="h4" component={"h2"}>
            {currentNode.text}
          </Typography>
        </Box>
        <Box></Box>
      </Box>
    </Zoom>
  );
};
