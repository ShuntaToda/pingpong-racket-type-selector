import { Box, Container } from "@mui/material";
import { useState } from "react";
import { FlowchartData, Node } from "../types/node";

import flowchartJson from "../flowchartData.json";
import { Start } from "./Start";
import { NodeContent } from "./NodeContent";

export const Main = () => {
  const typedFlowchartData: FlowchartData = {
    nodes: [...flowchartJson.nodes] as Node[],
  };
  const nodes: Node[] = typedFlowchartData.nodes;
  const [currentId, setCurrentId] = useState<string>("A");
  const [isStart, setIsStart] = useState<boolean>(false);

  const findNode = (id: string): Node | undefined => {
    return nodes.find((item) => item.id === id);
  };
  const currentNode: Node | undefined = findNode(currentId);

  return (
    <Container maxWidth="sm">
      <Box marginY={8} textAlign={"center"}>
        {isStart === false ? (
          <Start currentNode={currentNode as Node} setIsStart={setIsStart} setCurrentId={setCurrentId} />
        ) : (
          <NodeContent currentNode={currentNode as Node} setIsStart={setIsStart} setCurrentId={setCurrentId} />
        )}
      </Box>
    </Container>
  );
};
