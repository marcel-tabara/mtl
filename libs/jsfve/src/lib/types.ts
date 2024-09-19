export interface IFldtype {
  id: number | null;
  parent_id: number | null;
  name: string;
  type: string;
}

export interface IValidateAddFld {
  allowed: boolean;
  msg?: string;
}
