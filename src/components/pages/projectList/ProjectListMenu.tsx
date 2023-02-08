import React from 'react';
import { useRouter } from 'next/router';
import { Button, HStack } from '@chakra-ui/react';
import { BiHomeAlt, BiLibrary } from 'react-icons/bi';

export const ProjectListMenu = () => {
  // own or other
  const [select, setSelect] = React.useState('own');
  const router = useRouter();
  return (
    <HStack h="44px" justify="space-between" borderBottom="solid 4px #4A5568">
      <HStack spacing={4}>
        <Button
          fontSize="xl"
          fontWeight="bold"
          variant="ghost"
          borderRadius={0}
          bottom={-1}
          borderBottom={select === 'own' ? 'solid 4px #ED8936' : 'solid 4px #4A5568'}
          onClick={() => setSelect('own')}
        >
          <BiHomeAlt />
          プロジェクト
        </Button>
        <Button
          fontSize="xl"
          fontWeight="bold"
          variant="ghost"
          borderRadius={0}
          bottom={-1}
          borderBottom={select === 'other' ? 'solid 4px #ED8936' : 'solid 4px #4A5568'}
          onClick={() => setSelect('other')}
        >
          <BiLibrary />
          参加プロジェクト
        </Button>
      </HStack>
      <Button w={120} size="sm" colorScheme="teal" onClick={() => router.push('/new')}>
        + New
      </Button>
    </HStack>
  );
};
