import { Box, Container, Typography, Zoom } from "@mui/material";
import { useState } from "react";
import { FlowchartData, Node } from "../types/node";

import flowchartJson from "../flowchartData.json";

export const Main = () => {
  const typedFlowchartData: FlowchartData = {
    nodes: [...flowchartJson.nodes] as Node[],
  };
  const nodes: Node[] = typedFlowchartData.nodes;
  const [currentId, setCurrentId] = useState("A");

  const findNode = (id: string): Node | undefined => {
    return nodes.find((item) => item.id === id);
  };
  const currentNode: Node | undefined = findNode(currentId);

  return (
    <Container maxWidth="sm">
      <Box marginY={8}>
        <Zoom in={currentNode ? true : false}>
          <Box>
            <Typography variant="h4" component={"h2"}>
              {currentNode ? currentNode.text : ""}
            </Typography>
          </Box>
        </Zoom>
      </Box>
    </Container>
  );
};
