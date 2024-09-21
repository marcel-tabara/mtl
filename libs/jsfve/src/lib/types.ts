export interface IValidateAddFld {
  allowed: boolean;
  msg?: string;
}

export interface FlatItem {
  id: number | null;
  parent_id: number | null;
  type:
    | 'string'
    | 'number'
    | 'integer'
    | 'boolean'
    | 'null'
    | 'object'
    | 'array';
  title?: string;
  [key: string]: any;
}

export interface TreeNode extends Omit<FlatItem, 'parent_id' | 'id'> {
  items?: TreeNode[];
  properties?: { [key: string]: TreeNode };
}
