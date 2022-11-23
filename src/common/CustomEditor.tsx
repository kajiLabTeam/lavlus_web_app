import React from "react";
import { chakra, Box, Grid, GridItem, Textarea } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";

const sample = `
# Heading 1

## Heading 2

### Heading 3

#### Heading 4
`;

export interface CustomEditorProps {
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export const CustomEditor = ({ defaultValue, onChange }: CustomEditorProps) => {
  const [value, setValue] = React.useState(defaultValue ?? sample);

  const handleChange = (event: any) => {
    onChange && onChange(event.target.value);
    setValue(event.target.value);
  };

  return (
    <Box bg="gray.100" borderRadius={8} p={4}>
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        <GridItem>
          <Textarea
            h="100%"
            bg="gray.50"
            onChange={handleChange}
            value={value}
          />
        </GridItem>
        <GridItem>
          <ReactMarkdown
            components={ChakraUIRenderer()}
            children={value}
            remarkPlugins={[remarkGfm]}
            skipHtml
          />
        </GridItem>
      </Grid>
    </Box>
  );
};
