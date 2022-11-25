import React, { ComponentPropsWithoutRef } from 'react';
import { Box, Grid, GridItem, Textarea } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';

export interface MarkdownEditorProps extends ComponentPropsWithoutRef<'textarea'> {
  defaultValue?: string;
}

export const MarkdownEditor = React.forwardRef<HTMLTextAreaElement, MarkdownEditorProps>(
  ({ defaultValue = '# h1', ...props }, ref) => {
    const [value, setValue] = React.useState(defaultValue);

    return (
      <Box bg="gray.100" borderRadius={8} p={4}>
        <Grid templateColumns="1fr 1fr" gap={4}>
          <GridItem>
            <Textarea
              h="100%"
              bg="gray.50"
              value={value}
              ref={ref}
              {...props}
              onChange={(e) => setValue(e.target.value)}
            />
          </GridItem>
          <GridItem>
            <ReactMarkdown components={ChakraUIRenderer()} remarkPlugins={[remarkGfm]} skipHtml>
              {value}
            </ReactMarkdown>
          </GridItem>
        </Grid>
      </Box>
    );
  }
);

MarkdownEditor.displayName = 'MarkdownEditor';
