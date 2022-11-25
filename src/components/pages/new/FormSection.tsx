import React from 'react';
import { Text, Heading, Grid, GridItem, Flex, Image, FormLabel } from '@chakra-ui/react';

interface FormSectionProps {
  name: string;
  label: string;
  explanation: string;
  image: string;
  children: React.ReactNode;
}

export const FormSection: React.FC<FormSectionProps> = ({
  name,
  label,
  explanation,
  image,
  children,
}) => {
  return (
    <Grid
      templateAreas={`
            "title       image"
            "explanation image"
            "form        form"
        `}
      gridTemplateColumns={'2fr 1fr'}
      gridTemplateRows={'auto 1fr auto'}
      gap={6}
    >
      <GridItem area="title">
        <FormLabel htmlFor={name}>
          <Heading as="p" size="lg" borderLeft="12px solid #ED8936" pl={2}>
            {label}
          </Heading>
        </FormLabel>
      </GridItem>
      <GridItem area="explanation">
        <Text fontSize="lg" m="auto" display="flex" flexDirection="column">
          {explanation.split('\n').map((elm) => (
            <span key={elm}>{elm}</span>
          ))}
        </Text>
      </GridItem>
      <GridItem area="image">
        <Flex h="100%" alignItems="flex-end">
          <Image w="100%" src={image} alt={image} />
        </Flex>
      </GridItem>
      <GridItem area="form">{children}</GridItem>
    </Grid>
  );
};
