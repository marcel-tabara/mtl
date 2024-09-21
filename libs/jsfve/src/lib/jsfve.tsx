import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditNoteIcon from '@mui/icons-material/EditNote';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Grid2, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Form from '@rjsf/mui';
import { RJSFSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
import {
  addToFlatData,
  removeByIdInFlatData,
  sortFlatData,
  useHeTree,
} from 'he-tree-react';
import { useEffect, useState } from 'react';
import {
  arrayFieldschema,
  fldTypes,
  objectFieldschema,
  singleFieldschema,
} from './constants';
import { flatMapToTree } from './convert';
import { FlatItem } from './types';
import { validateAddFld } from './utils';

let id = 0;

export const Jsfve = () => {
  const keys = { idKey: 'id', parentIdKey: 'parent_id' };
  const [data, setData] = useState(() => sortFlatData([] as FlatItem[], keys));
  const [selectedNodeId, setSelectedNodeId] = useState<number | null>(null);
  const [nodeToAdd, setNodeToAdd] = useState<string | undefined>('object');
  const [editNode, setEditNode] = useState<FlatItem | undefined>(undefined);
  const [err, setErr] = useState('');
  const [schema, setSchema] = useState<any>(undefined);

  console.log('########## data', data);
  console.log('########## schema', schema);

  const editNodeSchemaType =
    editNode?.type === 'object'
      ? objectFieldschema
      : editNode?.type === 'array'
      ? arrayFieldschema
      : singleFieldschema;
  const rnd = () => Math.floor(Math.random() * (10000000 - 1 + 1) + 1);

  useEffect(() => {
    if (data.length === 1) {
      setSelectedNodeId(data[0].id);
    }
  }, [data]);

  useEffect(() => {
    if (data.length > 0) {
      const sc = flatMapToTree(data);
      setSchema(sc);
    }
  }, [data]);

  const editNodeFn = (id: number) => {
    const node = data.find((e) => e.id === id);
    if (node) {
      setEditNode({
        ...node,
      });
    }
  };

  const deleteNode = (id: number) => {
    const newData = [...data];
    removeByIdInFlatData(newData, id, keys);
    setData(newData);
  };

  const addNode = () => {
    setErr('');
    const node = fldTypes.find((e) => e.type === nodeToAdd);
    if (node) {
      const validate = validateAddFld({
        allData: data,
        newFldParentId: selectedNodeId,
      });
      if (validate.allowed) {
        const newData = [...data];
        const newId = ++id;
        const title = `${node?.type}_${newId}_${selectedNodeId}_${rnd()}`;

        addToFlatData(
          newData,
          {
            ...node,
            id: newId,
            parent_id: selectedNodeId,
            title,
          },
          0,
          keys
        );
        setData(newData);
      } else {
        validate?.msg && setErr(validate.msg);
      }
    }
  };

  const handleChange = (event: SelectChangeEvent) =>
    setNodeToAdd(event.target.value);

  const onSubmitPreview = ({ formData }: RJSFSchema) => {
    console.log('########## formData', formData);
  };

  const onSubmit = ({ formData }: RJSFSchema) => {
    const idx = data.findIndex((e) => {
      return e.id === editNode?.id;
    });

    Object.keys(formData).forEach((e) => {
      data[idx][e] = formData[e];
    });

    setEditNode(undefined);
  };

  const { renderTree, placeholder } = useHeTree({
    ...keys,
    data,
    dataType: 'flat',
    onChange: setData,
    renderNodeBox: ({ stat, attrs, isPlaceholder }) => {
      return (
        <div {...attrs} key={`${attrs.key}`} className="my-node-box">
          {isPlaceholder ? (
            <div className="my-placeholder">DROP HERE</div>
          ) : (
            <div
              key={stat.node.type}
              className="my-node"
              onClick={() => setSelectedNodeId(stat.node.id)}
              style={{
                border:
                  selectedNodeId === stat.node.id ? '1px solid black' : '',
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                }}
              >
                <Grid2 container spacing={2}>
                  <Grid2
                    size={8}
                    sx={{
                      alignItems: 'center',
                      alignContent: 'center',
                    }}
                  >
                    <span className="drag-handler" draggable={stat.draggable}>
                      {dragIcon()}
                    </span>
                    {stat.node.title}
                  </Grid2>
                  <Grid2 size={4}>
                    <span
                      style={{ display: 'flex', justifyContent: 'flex-end' }}
                    >
                      <IconButton
                        aria-label="close"
                        onClick={() => editNodeFn(stat.node?.id ?? 0)}
                      >
                        <EditNoteIcon />
                      </IconButton>
                      <IconButton
                        aria-label="close"
                        onClick={() => deleteNode(stat.node?.id ?? 0)}
                      >
                        <HighlightOffIcon />
                      </IconButton>
                    </span>
                  </Grid2>
                </Grid2>
              </Box>
            </div>
          )}
        </div>
      );
    },
  });
  return (
    <Box>
      <Grid2 container spacing={2}>
        <Grid2>
          {schema !== undefined && (
            <div className="my-tree no-dragging">
              <Form
                schema={schema[0]}
                validator={validator}
                //formData={editNode}
                onSubmit={onSubmitPreview}
              />
            </div>
          )}
          <div className="my-tree no-dragging">
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={nodeToAdd?.toString()}
              label="type"
              onChange={handleChange}
              sx={{ minWidth: '250px' }}
            >
              {fldTypes.map((e) => (
                <MenuItem value={e.type} key={`${e.type}_${rnd()}`}>
                  {e.type}
                </MenuItem>
              ))}
            </Select>
            <IconButton aria-label="close" onClick={addNode}>
              <AddCircleOutlineIcon />
            </IconButton>
          </div>
          {err && (
            <div
              className="my-tree no-dragging"
              style={{
                border: '1px solid red',
                backgroundColor: '#D32F2F',
                color: 'white',
              }}
            >
              <Typography>{err}</Typography>
            </div>
          )}
          <div>
            {renderTree({
              className: `my-tree ${placeholder ? 'dragging' : 'no-dragging'}`,
            })}
          </div>
          <style>{`
    .my-tree{
      width: 300px;
      border: 1px solid #ccc;
      border-radius: 5px;
      margin: 20px;
      padding: 20px;
    }
    .my-placeholder{
      height:40px;
      border: 1px dashed blue;
      border-radius: 3px;
      background-color: #f3ffff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: small;
    }
    /*.no-dragging .my-node-box:hover{
      background-color: #eee;
    }*/
    .my-node-box:not(:last-child){
      margin-bottom: 10px;
    }
    .my-node{
      padding: 5px 10px;
      padding-left: 30px;
      border: 1px solid #e2e2e2;
      border-radius: 3px;
      background-color: #f0f0f0;
      display: flex;
      align-items: center;
      position: relative;
      box-shadow: 1px 1px 3px 0px rgb(0 0 0 / 19%);
    }
    .no-dragging .my-node:hover{
      background-color: #ebfeff;
    }
    .drag-handler{
      position: absolute;
      left: 0;
      top: 0;
      width: 30px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: grab;
    }
    .drag-handler:hover{
      background-color: #f0f0f0;
    }
    .my-node svg{
      width:16px;
    }
    `}</style>
        </Grid2>
        {editNode && (
          <Grid2>
            <div className="my-tree no-dragging">
              <Form
                schema={editNodeSchemaType}
                validator={validator}
                formData={editNode}
                onSubmit={onSubmit}
              />
            </div>
          </Grid2>
        )}
      </Grid2>
    </Box>
  );
};

function dragIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <title>drag-horizontal-variant</title>
      <path d="M21 11H3V9H21V11M21 13H3V15H21V13Z" />
    </svg>
  );
}
