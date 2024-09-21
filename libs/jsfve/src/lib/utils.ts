import { FlatItem, IValidateAddFld } from './types';

export const validateAddFld = ({
  allData,
  newFldParentId,
}: {
  allData: FlatItem[];
  newFldParentId: number | null;
}): IValidateAddFld => {
  const root = allData.find((e) => e.parent_id === null);

  // check root has only one element
  if (root && newFldParentId === null) {
    return {
      allowed: false,
      msg: 'only one root aloowed',
    };
  }

  return { allowed: true };
};
