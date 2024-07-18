import { Edge, Node, isEdge } from "reactflow";
import { has, isEmpty } from "lodash-es";
import {
  DefaultNodeProps,
  NodeType,
  PositionType,
  ExpandNodeProps,
  TERMINAL_NODE_TYPES,
  GroupNodesProps,
  GroupOrientation,
} from "../types";
import {
  ANCHOR_NODE_ID,
  ANCHOR_NODE_HEIGHT,
  ANCHOR_NODE_WIDTH,
  STEP_NODE_HEIGHT,
  STEP_NODE_WIDTH,
  ROOT_NODE_WIDTH,
  PLUS_NODE_WIDTH,
  ROOT_NODE_HEIGHT,
  PLUS_NODE_HEIGHT,
  NODE_DEFAULT_HEIGHT,
  NODE_DEFAULT_WIDTH,
  NODE_HORIZONTAL_MARGIN,
  NODE_VERTICAL_MARGIN,
} from "./LROrientation/Constants";

export const getLayoutableNodes = (nodes: Node[]): Node[] => {
  return nodes.filter(
    (node: Node) =>
      (node.data as DefaultNodeProps)?.positionType === PositionType.ABSOLUTE
  );
};

export const getNonLayoutableNodes = (nodes: Node[]): Node[] => {
  return nodes.filter(
    (node: Node) =>
      (node.data as DefaultNodeProps)?.positionType === PositionType.RELATIVE
  );
};

export const partitionNodesForLayout = (
  nodes: Node[]
): { selfLayoutable: Node[]; dependents: Node[] } => {
  return {
    selfLayoutable: getLayoutableNodes(nodes),
    dependents: getNonLayoutableNodes(nodes),
  };
};

export const getNodePositionType = (node: Node): PositionType => {
  return (node.data as DefaultNodeProps)?.positionType;
};

export const updateNodePositionType = (
  node: Node,
  positionType: PositionType
): Node => {
  const cloneNode = { ...node };
  (cloneNode.data as DefaultNodeProps).positionType = positionType;
  return node;
};

export const getChildNodes = (parentNodeId: string, nodes: Node[]): Node[] => {
  return nodes.filter((node) => isParentOfNode(parentNodeId, node));
};

export const isParentOfNode = (parentNodeId: string, node: Node) =>
  node.parentNode === parentNodeId;

export const getNodeById = (
  nodes: Node[],
  nodeId: string
): Node | undefined => {
  return nodes.find((node: Node) => node.id === nodeId);
};

export const getStartAnchorNodeId = (parentId: string) =>
  `${parentId}_${ANCHOR_NODE_ID}_start`;

export const getEndAnchorNodeId = (parentId: string) =>
  `${parentId}_${ANCHOR_NODE_ID}_end`;

/* Parallel nodes should not be connected to any of their siblings */
const getSequentialNodes = (nodes: Node[]): Node[] => {
  return nodes.filter((node) => !(node.data as DefaultNodeProps)?.parallel);
};

const getParallelNodes = (nodes: Node[]): Node[] => {
  return nodes.filter((node) => (node.data as DefaultNodeProps)?.parallel);
};

export const partitionNodesByParallelism = (
  nodes: Node[]
): { parallel: Node[]; sequential: Node[] } => {
  return {
    parallel: getParallelNodes(nodes),
    sequential: getSequentialNodes(nodes),
  };
};

export const isNodeOfTypeParent = (nodeId: string, nodes: Node[]): boolean => {
  return getChildNodes(nodeId, nodes).length > 0;
};

export const isNodeOfTypeGroup = (node: Node): boolean => {
  return (
    has(node.data, "groupId") &&
    !isEmpty((node.data as DefaultNodeProps).groupId)
  );
};

export const excludeAnchorNodes = (nodes: Node[]): Node[] => {
  return nodes.filter((node) => node?.type !== NodeType.ANCHOR);
};

export const excludeTerminalNodes = (nodes: Node[]): Node[] => {
  const result = nodes.filter(
    (node) => node?.type && !TERMINAL_NODE_TYPES.includes(node.type as NodeType)
  );
  return result;
};

export const findIntersection = (array1: Node[], array2: Node[]): Node[] => {
  const ids2 = new Set(array2.map((node) => node.id));
  return array1.filter((node) => ids2.has(node.id));
};

export const dedupeNodes = (nodes: Node[]): Node[] => {
  const uniqueNodesMap = new Map<string, Node>();

  nodes.forEach((node) => {
    uniqueNodesMap.set(node.id, node);
  });

  return Array.from(uniqueNodesMap.values());
};

export const fetchNodeConnections = (nodeId: string, edges: Edge[]): Edge[] => {
  if (!nodeId || isEmpty(edges)) {
    return [];
  }

  return edges.filter(
    (edge) => isEdge(edge) && (edge.source === nodeId || edge.target === nodeId)
  );
};

/**
 * Required when adding children nodes inside a parent
 */
export const sortNodes = (a: Node, b: Node): number => {
  if (a.parentNode && !b.parentNode) {
    return 1;
  } else if (!a.parentNode && b.parentNode) {
    return -1;
  } else {
    return 0;
  }
};

export const getNodeDimensions = (
  node: Node
): { width: number; height: number } => {
  return { width: getNodeWidth(node), height: getNodeHeight(node) };
};

export const getNodeWidth = (node: Node): number => {
  const isNodeExpanded = (node.data as ExpandNodeProps)?.expanded || false;
  switch (node.type) {
    case NodeType.GROUP:
      return getGroupNodeWidth(
        isNodeExpanded,
        (node.data as GroupNodesProps).memberNodes
      );
    case NodeType.STAGE:
      return getStageNodeWidth(
        isNodeExpanded,
        (node.data as GroupNodesProps)?.memberNodes
      );
    case NodeType.ATOMIC:
      return STEP_NODE_WIDTH;
    case NodeType.ANCHOR:
      return ANCHOR_NODE_WIDTH;
    case NodeType.ROOT:
      return ROOT_NODE_WIDTH;
    case NodeType.PLUS:
      return PLUS_NODE_WIDTH;
    default:
      return 0;
  }
};

export const getNodeHeight = (node: Node): number => {
  if (!node) {
    return 0;
  }
  const isNodeExpanded = (node.data as ExpandNodeProps)?.expanded || false;
  switch (node.type) {
    case NodeType.GROUP:
      return getGroupNodeHeight({
        childNodes: (node.data as GroupNodesProps).memberNodes,
        isExpanded: isNodeExpanded,
      });
    case NodeType.STAGE:
      return getStageNodeHeight(
        isNodeExpanded,
        (node.data as GroupNodesProps)?.memberNodes
      );
    case NodeType.ATOMIC:
      return STEP_NODE_HEIGHT;
    case NodeType.ANCHOR:
      return ANCHOR_NODE_HEIGHT;
    case NodeType.ROOT:
      return ROOT_NODE_HEIGHT;
    case NodeType.PLUS:
      return PLUS_NODE_HEIGHT;
    default:
      return 0;
  }
};

export const isContainerNode = (node: Node): boolean =>
  node.type
    ? [NodeType.GROUP, NodeType.STAGE].includes(node.type as NodeType)
    : false;

/* Stage node dimensions */
export const getStageNodeDimensions = ({
  isExpanded,
  childNodes,
}: {
  isExpanded: boolean;
  childNodes: Node[];
}): { width: number; height: number } => {
  return {
    width: getStageNodeWidth(isExpanded, childNodes),
    height: getStageNodeHeight(isExpanded, childNodes),
  };
};

const getStageNodeWidth = (isExpanded: boolean, childNodes: Node[]): number => {
  if (!isExpanded || !childNodes.length) {
    return NODE_DEFAULT_WIDTH;
  }

  return (
    childNodes.reduce(
      (totalWidth, currentNode) =>
        totalWidth +
        NODE_VERTICAL_MARGIN +
        getNodeWidth(currentNode) +
        NODE_VERTICAL_MARGIN,
      0
    ) +
    2 * NODE_VERTICAL_MARGIN
  );
};

const getStageNodeHeight = (
  isExpanded: boolean,
  childNodes: Node[]
): number => {
  if (!isExpanded || !childNodes.length) {
    return NODE_DEFAULT_HEIGHT;
  }

  return (
    childNodes.reduce(
      (maxHeight, currentNode) =>
        Math.max(maxHeight, getNodeHeight(currentNode)),
      0
    ) +
    2 * 45
  );
};

/* Stage group node dimensions */
export const getStageGroupNodeDimensions = ({
  isExpanded,
  childNodes,
  orientation,
}: {
  isExpanded: boolean;
  childNodes: Node[];
  orientation?: GroupOrientation;
}): { width: number; height: number } => {
  return {
    width: getGroupNodeWidth(isExpanded, childNodes),
    height: getGroupNodeHeight({
      isExpanded,
      childNodes,
      orientation,
    }),
  };
};

const getGroupNodeWidth = (
  isExpanded: boolean,
  nodeChildren: Node[]
): number => {
  if (!isExpanded || !nodeChildren.length) {
    return NODE_DEFAULT_WIDTH;
  }
  const maxWidth = nodeChildren.reduce((acc: number, currNode: Node) => {
    const currentNodeWidth = getNodeWidth(currNode);
    if (currentNodeWidth) {
      return Math.max(acc, currentNodeWidth);
    }
    return 0;
  }, 0);
  return (
    maxWidth +
    2 * NODE_VERTICAL_MARGIN +
    /* To adjust for node offset with GROUP_NODE_VERTICAL_ALIGNMENT_MARGIN */
    2 * NODE_VERTICAL_MARGIN
  );
};

const getGroupNodeHeight = ({
  isExpanded,
  childNodes,
}: {
  isExpanded: boolean;
  childNodes: Node[];
  orientation?: GroupOrientation;
}): number => {
  if (!isExpanded || !childNodes.length) {
    return NODE_DEFAULT_HEIGHT;
  }
  return childNodes.reduce((totalHeight, currentNode) => {
    const currentNodeHeight = getNodeHeight(currentNode);
    return (
      totalHeight +
      NODE_HORIZONTAL_MARGIN +
      currentNodeHeight +
      NODE_HORIZONTAL_MARGIN
    );
  }, 0);
};

export const getGroupNodeOrientation = (
  memberNodes: Node[]
): GroupOrientation => {
  return memberNodes.every((node) => (node.data as DefaultNodeProps)?.parallel)
    ? GroupOrientation.TB
    : GroupOrientation.LR;
};