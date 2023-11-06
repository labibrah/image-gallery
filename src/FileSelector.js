import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import "./FileSelector.css";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Container from "@mui/material/Container";
import DeleteIcon from "@mui/icons-material/Delete";
import GridLayout from "react-grid-layout";
import { pink, red } from "@mui/material/colors";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  InputLabel,
  Stack,
  Typography,
} from "@mui/material";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

// A custom component that renders a file item <span>&#10004;</span>
const FileItem = ({ file, onDelete, selectionMade }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleClick = () => {
    setIsChecked(!isChecked);
    selectionMade(file);
  };
  // border: isChecked ? '2px solid green' : 'none'
  return (
    <div className="file-item" onClick={handleClick}>
      <Card>
        <img src={file.url} alt={file.name} style={{ cursor: "pointer" }} />
        {(isChecked && <CheckBoxIcon color="success" />) || (
          <CheckBoxOutlineBlankIcon color="disabled" />
        )}
        {/* <button onClick={() => onDelete(file)}>Delete</button> */}
      </Card>
    </div>
  );
};

// A custom component that renders a file grid
const FileGrid = ({ files, onDelete, onChange, selectionMade }) => {
  return (
    <div className="file-grid">
      {files.map((file) => (
        <FileItem
          key={file.name}
          file={file}
          onDelete={onDelete}
          selectionMade={selectionMade}
        />
      ))}

      <Card key = "b" sx={{ minWidth: 200 }}>
        <CardContent>
          <WallpaperIcon sx={{ fontSize: 80 }} />
        </CardContent>
        {/* <Stack
          spacing={3}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <WallpaperIcon sx={{ fontSize: 40 }} /> */}

        <input
          type="file"
          id="file-input"
          multiple
          accept="image/*"
          onChange={onChange}
          hidden
        />

        <InputLabel htmlFor="file-input">Add Images</InputLabel>
        {/* </Stack> */}
      </Card>
    </div>
  );
};

// The main component that handles the file selection logic
const FileSelector = () => {
  // A state variable that stores the selected files as an array of objects
  const [files, setFiles] = useState([]);
  const [selected, setSelected] = useState(false);
  const [count, setCount] = useState(0);

  // A function that handles the file input change event
  const handleFileChange = (e) => {
    // Get the selected files from the event object
    const selectedFiles = e.target.files;

    // Convert the FileList object to an array of objects with name and url properties
    const filesArray = Array.from(selectedFiles).map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
      isChecked: false,
    }));

    // Update the state variable by appending the new files to the existing ones
    setFiles((prevFiles) => [...prevFiles, ...filesArray]);
  };

  // A function that handles the file deletion event
  const handleFileDelete = (file) => {
    // Update the state variable by filtering out the deleted file
    setFiles((prevFiles) => prevFiles.filter((f) => f.isChecked !== true));
    setSelected(false);
    setCount(0);
  };

  const selectionMade = (file) => {
    if (file.isChecked) {
      setCount(count - 1);
      file.isChecked = false;
      if (count == 0) {
        setSelected(false);
      }
    } else {
      setCount(count + 1);
      file.isChecked = true;
      setSelected(true);
    }
  };

  // const countSelected = () => {
  //   files.map
  //   file.isChecked = true;
  //   setSelected(true);
  // };

  const layout = [
    { i: "a", x: 0, y: 0, w: 1, h: 2, static: true },
    { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
    { i: "c", x: 4, y: 0, w: 1, h: 2 }
  ];
  return (
    <div className="file-selector">
      {/* <h1>Image Gallery</h1> */}
      <Card>
      {/* <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        breakpoints = {{lg : 1200}}
        rowHeight={281}
        width={200}
      > */}
     
        <CardHeader
        key="a"
          avatar={selected && count!=0 && <CheckBoxIcon color="success" />}
          title={(selected && count!=0 && <p>{count} image(s) selected</p>) || "Gallery"}
          action={
            selected && count!=0 && (
              <IconButton
                onClick={() => handleFileDelete()}
                aria-label="delete"
              >
                <DeleteIcon sx={{ color: red[900] }} />
              </IconButton>
            )
          }
        />
   
        {/* <div key="a">a</div>
        <div key="b">b</div>
        <div key="c">c</div> */}
        <FileGrid
         key="a"
          files={files}
          onDelete={handleFileDelete}
          onChange={handleFileChange}
          selectionMade={selectionMade}
        />

      
      
      {/* </GridLayout> */}
      </Card>
    </div>
  );
};

export default FileSelector;
