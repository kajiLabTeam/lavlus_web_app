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

export const MdTemplate = `#### 以下はテンプレートです。

適当な内容に変更してください。

#### 概要

このプロジェクトは、愛知工業大学の家事研究室が行います。  
本プロジェクトは、テニスコート場での利用者の運動量を測定しその使用状況を調査する。  
その調査結果をもとに、より最適な環境改善計画を検討するためのプロジェクトです。

#### 期間や取得するデータの種類

本センシングプロジェクトの目標は、3 ヶ月間の期間のデータを取得し各月ごとの使用状況の推移を調査するものとする。  
以下、プロジェクトの目標を協力者目線でわかりやすいように記述してください。

#### センサとその使用目的

本センシングプロジェクトでは以下のセンサの使用を使用します。  
また、その使用目的を示します。

| センサ         | 使用目的                         | 備考     |
| :------------- | :------------------------------- | :------- |
| 加速度センサ   | 運動量を測定するために使用します | 特になし |
| ジャイロセンサ | 運動量を測定の補助に使用します   | 特になし |
`;

MarkdownEditor.displayName = 'MarkdownEditor';
