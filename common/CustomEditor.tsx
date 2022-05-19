import React from "react";
import { chakra, Box } from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";
// import Editor, { theme } from 'rich-markdown-editor';

const sample = `
# Heading 1

## Heading 2

### Heading 3

#### Heading 4
`;

export interface CustomEditorProps {
  defaultValue?: string;
  onChange?: (value: () => string) => void;
}

export const CustomEditor = ({ defaultValue, onChange }: CustomEditorProps) => {
  const handleChange = (value: () => string) => {
    onChange && onChange(value);
  };

  return (
    <Box
      bg="gray.100"
      borderRadius={8}
      py={4}
      px={8}
      sx={{
        "& h1": {
          fontSize: "2rem",
        },
        "& h2": {
          fontSize: "1.5rem",
        },
        "& h3": {
          fontSize: "1.17rem",
        },
        "& h4": {
          fontSize: "1rem",
        },
      }}
    >
      {/* <Editor
        defaultValue={defaultValue ?? sample}
        theme={{
          ...theme,
          background: '#EDF2F7',
        }}
        onChange={handleChange}
      /> */}
    </Box>
  );
};
