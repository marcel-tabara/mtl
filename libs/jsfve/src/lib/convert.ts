import { FlatItem, TreeNode } from './types';

function removeEmptyFields(obj: Record<string, any>): Record<string, any> {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) => value !== undefined && value !== null && value !== ''
    )
  );
}

function isPrimitiveType(type: FlatItem['type']): boolean {
  return ['string', 'number', 'integer', 'boolean', 'null'].includes(type);
}

export function flatMapToTree(items: FlatItem[]): TreeNode[] {
  const itemMap: Map<number, TreeNode> = new Map();
  const roots: TreeNode[] = [];

  // First pass: create TreeNode objects for each item
  items.forEach((item, index) => {
    const { id, parent_id, type, title, ...rest } = item;
    const cleanedRest = removeEmptyFields(rest);
    const node = { type, ...cleanedRest };

    if (type === 'object') {
      node.properties = {};
    } else if (type === 'array') {
      node.items = [];
    }

    if (id !== null) {
      itemMap.set(id, node);
    } else {
      // For items with null id, we'll use a temporary id based on the index
      itemMap.set(-index - 1, node);
    }
  });

  // Second pass: build the tree structure
  items.forEach((item, index) => {
    const { id, parent_id, type, title } = item;
    const nodeId = id !== null ? id : -index - 1;
    const node = itemMap.get(nodeId);

    if (!node) return; // Skip if node is not found (shouldn't happen)

    if (parent_id === null) {
      roots.push(node);
    } else {
      const parent = itemMap.get(parent_id);
      if (parent) {
        if (parent.type === 'object' && title) {
          parent.properties![title] = node;
        } else if (parent.type === 'array') {
          parent.items!.push(node);
        }
        // Note: We don't add children to primitive types
      }
    }
  });

  console.log('########## roots', roots);
  return roots;
}
