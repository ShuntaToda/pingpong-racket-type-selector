import { Box, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { Start } from "./Start";
import { NodeContent } from "./NodeContent";
import { findNode } from "../utils/findNode";
import { Node } from "../types/node";
import { Answer } from "./Answer";

export const Main = () => {
  const [currentId, setCurrentId] = useState<string>("A");
  const [isStart, setIsStart] = useState<boolean>(false);

  useEffect(() => {
    if (isStart == false) setCurrentId("A");
  }, [isStart]);

  const currentNode: Node | undefined = findNode(currentId);

  return (
    <Container maxWidth="sm">
      <Box marginY={8} textAlign={"center"}>
        {isStart === false ? (
          <Start currentNode={currentNode as Node} setIsStart={setIsStart} setCurrentId={setCurrentId} />
        ) : currentNode?.type === "result" ? (
          <Answer currentNode={currentNode as Node} setIsStart={setIsStart} />
        ) : (
          <NodeContent currentNode={currentNode as Node} setIsStart={setIsStart} setCurrentId={setCurrentId} />
        )}
      </Box>
    </Container>
  );
};
