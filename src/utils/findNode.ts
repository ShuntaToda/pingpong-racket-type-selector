import flowchartJson from "../flowchartData.json";
import { FlowchartData, Node } from "../types/node";

const typedFlowchartData: FlowchartData = {
  nodes: [...flowchartJson.nodes] as Node[],
};
const nodes: Node[] = typedFlowchartData.nodes;

export const findNode = (id: string): Node | undefined => {
  return nodes.find((item) => item.id === id);
};
