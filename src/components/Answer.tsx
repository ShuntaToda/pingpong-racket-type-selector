import { Box, Button, Typography, Zoom } from "@mui/material";
import { Node } from "../types/node";

type Props = {
  currentNode: Node;
  setIsStart: (request: boolean) => void;
};

export const Answer: React.FC<Props> = ({ currentNode, setIsStart }) => {
  const clickRetryBtn = () => {
    setIsStart(false);
  };
  return (
    <Zoom in={currentNode ? true : false} key={currentNode.id}>
      <Box>
        <Box paddingY={8}>
          <Typography marginY={4} variant="h6" component={"p"}>
            あなたに合ったラケットとラバー
          </Typography>
          {currentNode.text.split("\n").map((text, index) => {
            if (text.includes(",")) {
              return text.split(",").map((t, i) => (
                <Typography key={i} component={"p"}>
                  {t}
                </Typography>
              ));
            }
            return (
              <Typography key={index} paddingY={2} component={"p"}>
                {text}
              </Typography>
            );
          })}
        </Box>
        <Box>
          <Button size="large" color="warning" onClick={clickRetryBtn}>
            もう一度
          </Button>
        </Box>
      </Box>
    </Zoom>
  );
};
