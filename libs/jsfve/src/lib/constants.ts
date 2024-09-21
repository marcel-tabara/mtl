import { RJSFSchema } from '@rjsf/utils';
import { FlatItem } from './types';

export const fldTypes1: FlatItem[] = [
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
  uniqueItems: false,
};

export const fldTypes = [
  {
    type: 'string' as FlatItem['type'],
    ...baseSingleField,
  },
  {
    type: 'number' as FlatItem['type'],
    ...baseSingleField,
  },
  {
    type: 'integer' as FlatItem['type'],
    ...baseSingleField,
  },
  {
    type: 'boolean' as FlatItem['type'],
    ...baseSingleField,
  },
  {
    type: 'null' as FlatItem['type'],
    ...baseSingleField,
  },
  {
    type: 'object' as FlatItem['type'],
    ...baseObjectField,
  },
  {
    type: 'array' as FlatItem['type'],
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
