import React from "react";
import {
  Text,
  Heading,
  Stack,
  Grid,
  GridItem,
  Flex,
  Image,
  FormLabel,
  FormControl,
} from "@chakra-ui/react";

interface FormSectionProps {
  name: string;
  label: string;
  explanation: string;
  image: any;
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
    <FormControl>
      <Grid
        templateAreas={`
            "title       image"
            "explanation image"
            "form        form"
        `}
        gridTemplateColumns={"2fr 1fr"}
        gridTemplateRows={"auto 1fr auto"}
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
          <Text fontSize="lg" m="auto">
            <Stack>
              {explanation.split("\n").map((elm) => (
                <span key={elm}>{elm}</span>
              ))}
            </Stack>
          </Text>
        </GridItem>
        <GridItem area="image">
          <Flex h="100%" alignItems="flex-end">
            <Image w="100%" src={image} />
          </Flex>
        </GridItem>
        <GridItem area="form">{children}</GridItem>
      </Grid>
    </FormControl>
  );
};
