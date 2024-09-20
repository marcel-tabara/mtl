import { RJSFSchema } from '@rjsf/utils';
import { IFldtype } from './types';

export const fldTypes1: IFldtype[] = [
  {
    id: null,
    parent_id: null,
    type: 'string',
    title: '',
    description: '',
    props: {},
  },
  {
    id: null,
    parent_id: null,
    type: 'number',
    title: '',
    description: '',
    props: {},
  },
  {
    id: null,
    parent_id: null,
    type: 'integer',
    title: '',
    description: '',
    props: {},
  },
  {
    id: null,
    parent_id: null,
    type: 'boolean',
    title: '',
    description: '',
    props: {},
  },
  {
    id: null,
    parent_id: null,
    type: 'object',
    title: '',
    description: '',
    props: {},
  },
  {
    id: null,
    parent_id: null,
    type: 'array',
    title: '',
    description: '',
    props: {},
  },
  {
    id: null,
    parent_id: null,
    type: 'null',
    title: '',
    description: '',
    props: {},
  },
];

const baseSingleField = {
  id: null,
  parent_id: null,
  title: '',
  description: '',
  enum: '',
  enumNames: '',
};

const baseObjectField = {
  id: null,
  parent_id: null,
  title: '',
  description: '',
  required: '',
  additionalProperties: '',
  dependencies: '',
};

const baseArrayField = {
  id: null,
  parent_id: null,
  title: '',
  description: '',
  required: '',
  additionalItems: '',
  uniqueItems: '',
};

export const fldTypes = [
  {
    type: 'string',
    ...baseSingleField,
  },
  {
    type: 'number',
    ...baseSingleField,
  },
  {
    type: 'integer',
    ...baseSingleField,
  },
  {
    type: 'boolean',
    ...baseSingleField,
  },
  {
    type: 'null',
    ...baseSingleField,
  },
  {
    type: 'object',
    ...baseObjectField,
  },
  {
    type: 'array',
    ...baseArrayField,
  },
];

export const singleFieldschema: RJSFSchema = {
  title: 'Single Field',
  type: 'object',
  properties: {
    title: {
      type: 'string',
      title: 'Title',
    },
    description: {
      type: 'string',
      title: 'Description',
    },
    enum: {
      type: 'string',
      title: 'Enum',
    },
    enumNames: {
      type: 'string',
      title: 'EnumNames',
    },
    // anyOf: {
    //   type: 'array',
    //   items: {
    //     type: 'number',
    //     title: 'title',
    //     enum: [],
    //   },
    // },
    // oneOf: {
    //   type: 'array',
    //   items: {
    //     title: 'title',
    //     const: 'const',
    //   },
    // },
  },
};

export const objectFieldschema: RJSFSchema = {
  title: 'Object Field',
  type: 'object',
  properties: {
    title: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    required: {
      type: 'string',
      default: '[]',
    },
  },
};

export const arrayFieldschema: RJSFSchema = {
  title: 'Array Field',
  type: 'object',
  properties: {
    title: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    required: {
      type: 'string',
      default: '[]',
    },
    uniqueItems: {
      type: 'boolean',
      default: false,
    },
  },
};
