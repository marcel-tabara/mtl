// export interface IFldtype {
//   id: number;
//   parent_id: number | null;
//   title?: string;
//   description?: string;
//   type: string;
//   props?: object;
// }

export interface IValidateAddFld {
  allowed: boolean;
  msg?: string;
}

// export interface ISingleField {
//   title?: string;
//   description?: string;
//   type: string;
//   enum?: [];
//   enumNames?: [];
//   anyOf?: [];
//   oneOf?: [];
//   allOf?: [];
// }

// export interface IObjectField {
//   title?: string;
//   description?: string;
//   type: string;
//   required?: [];
//   additionalProperties?: object;
//   dependencies?: object;
//   // enum?: [];
//   // enumNames?: [];
//   // anyOf?: [];
//   // oneOf?: [];
// }

// export interface IArrayField {
//   title?: string;
//   description?: string;
//   type: string;
//   required?: [];
//   additionalItems?: object;
//   uniqueItems?: boolean;
//   // enum?: [];
//   // enumNames?: [];
//   // anyOf?: [];
//   // oneOf?: [];
// }

// export interface FlatItem {
//   id: number | null;
//   parent_id: number | null;
//   type:
//     | 'string'
//     | 'number'
//     | 'integer'
//     | 'boolean'
//     | 'null'
//     | 'object'
//     | 'array';
//   [key: string]: any;
// }

// export interface TreeNode extends Omit<FlatItem, 'parent_id' | 'id'> {
//   node: {}
//   [x: string]: {}
//   items?: TreeNode[];
//   properties?: TreeNode[];
// }

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

export interface TreeNode extends Omit<FlatItem, 'parent_id' | 'id' | 'title'> {
  items?: TreeNode[];
  properties?: { [key: string]: TreeNode };
}
