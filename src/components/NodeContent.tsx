import { Box, Button, ButtonGroup, Typography, Zoom } from "@mui/material";
import { Node } from "../types/node";

type Props = {
  currentNode: Node;
  setIsStart: (request: boolean) => void;
  setCurrentId: (request: string) => void;
};

export const NodeContent: React.FC<Props> = ({ currentNode, setCurrentId, setIsStart }) => {
  console.log(currentNode);
  const options = currentNode?.options;

  const clickOptionBtn = (option: { nextId: string; text: string }) => {
    setCurrentId(option.nextId);
  };

  const clickRetryBtn = () => {
    setIsStart(false);
  };
  return (
    <Zoom in={currentNode ? true : false} key={currentNode.id}>
      <Box>
        <Box paddingY={8}>
          <Typography variant="h5" component={"h2"}>
            {currentNode.text}
          </Typography>
        </Box>
        <Box>
          <ButtonGroup size="large" variant="outlined" aria-label="Basic button group">
            {options ? (
              options?.map((option, index) => (
                <Button key={index} onClick={() => clickOptionBtn(option)}>
                  {option.text}
                </Button>
              ))
            ) : (
              <Button color="warning" onClick={clickRetryBtn}>
                もう一度
              </Button>
            )}
          </ButtonGroup>
        </Box>
      </Box>
    </Zoom>
  );
};
