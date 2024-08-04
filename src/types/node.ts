export type NodeType = "start" | "question" | "answer" | "result";

export interface Option {
  text: string;
  nextId: string;
}

export interface Node {
  id: string;
  text: string;
  type: NodeType;
  options?: Option[];
  nextId?: string;
}

export interface FlowchartData {
  nodes: Node[];
}
