import React from 'react';
import {
  Box,
  Stack,
  Text,
  Image,
  AspectRatio,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Progress,
} from '@chakra-ui/react';
import { Project, Sensing } from '@/types';

import useSWR from 'swr';
import { useRouter } from 'next/router';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
// import { authState, isDownloadingState } from "../../../recoil/atoms";
import { Lavlus } from '@/utils';
import axios, { CancelTokenSource } from 'axios';
// import dateFormat from "dateformat";
import { saveAs } from 'file-saver';

// NextPage
import { NextPageWithLayoutAndPageExtraInfo } from '@/types';
import { StandardLayout } from '@/layouts';

const ProjectData: NextPageWithLayoutAndPageExtraInfo = () => {
  const router = useRouter();
  // const auth = useRecoilValue(authState);
  // const setIsDownloading = useSetRecoilState(isDownloadingState);
  const [progress, setProgress] = React.useState(0);
  const [filename, setFilename] = React.useState('');
  const [cancelTokenSource, setCancelTokenSource] = React.useState(axios.CancelToken.source());

  // const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: project } = useSWR<Project>(`/projects/${router.query.projectId}`);
  const { data: sensings } = useSWR<Sensing[]>(`/projects/${router.query.projectId}/sensings`);

  return (
    <Box minH="100vh" bg="gray.200" borderRadius="3xl">
      {/* 背景画像 */}
      <Box h="300px" borderRadius="3xl" overflow="hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 252.52">
          <clipPath id="myClip">
            <path d="M1440,160l-60,10.7C1320,181,1200,203,1080,224s-240,43-360,16S480,139,360,117.3C240,96,120,128,60,144L0,160V0H1440Z" />
          </clipPath>
          <image
            xlinkHref={project?.image}
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#myClip)"
          />
        </svg>
      </Box>

      <Box mt="-300px" p={12} color="black">
        <AspectRatio w={280} ratio={16 / 9}>
          <Image
            src={project?.image}
            alt="ProjectImage"
            borderRadius="xl"
            objectFit="cover"
            border="solid 4px white"
          />
        </AspectRatio>

        <Heading as="h1" size="xl" pl={4} my={4} borderLeft="solid 12px #86D1C6">
          {project?.name}
        </Heading>

        <Heading as="h2" size="lg" pl={4} my={8}>
          センシングデータ
        </Heading>

        <TableContainer bg="white" p={6} borderRadius="xl">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>id</Th>
                <Th>ファイル名</Th>
                <Th>サイズ</Th>
                <Th>作成日</Th>
                <Th>ownerId</Th>
              </Tr>
            </Thead>
            <Tbody>
              {sensings &&
                sensings.map((data) => {
                  const source = axios.CancelToken.source();
                  return (
                    <Tr
                      key={data.id}
                      sx={{ '&:hover': { bg: 'gray.200' } }}
                      // onClick={async () => {
                      //   setIsDownloading(true);
                      //   setProgress(0);
                      //   setFilename(data.originalname);
                      //   setCancelTokenSource(source);
                      //   const binary = await LavlusApi.downloadSensingDataById({
                      //     id: data.id,
                      //     token: auth.token,
                      //     cancelToken: source.token,
                      //     onDownloadProgress: (progressEvent) => {
                      //       const percentage = Math.round(
                      //         (progressEvent.loaded * 100) / progressEvent.total
                      //       );
                      //       setProgress(percentage);
                      //     },
                      //   });
                      //   if (binary) {
                      //     const blob = new Blob([binary]);
                      //     saveAs(blob, data.originalname);
                      //   }
                      //   setIsDownloading(false);
                      // }}
                    >
                      <Th>{data.id}</Th>
                      <Th>{data.originalname}</Th>
                      <Th>{data.size}</Th>
                      {/* <Th>{dateFormat(new Date(data.createdAt), 'yyyy年MM月dd日hh時mm分')}</Th> */}
                      <Th>{data.ownerId}</Th>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </TableContainer>
        {/* <DownloadingModal
          progress={progress}
          filename={filename}
          cancelTokenSource={cancelTokenSource}
        /> */}
      </Box>
    </Box>
  );
};

// interface DownloadingModalProps {
//   progress: number;
//   filename: string;
//   cancelTokenSource: CancelTokenSource;
// }

// const DownloadingModal = ({ progress, filename, cancelTokenSource }: DownloadingModalProps) => {
//   const [isDownloading, setIsDownloading] = useRecoilState(isDownloadingState);
//   return (
//     <Modal isCentered isOpen={isDownloading} onClose={() => {}}>
//       <ModalOverlay />
//       <ModalContent>
//         <ModalHeader>Now Downloading...</ModalHeader>
//         <ModalBody pb={6}>
//           <Stack spacing={4}>
//             <Text fontSize="lg">
//               Filename: <strong>{filename}</strong>
//             </Text>
//             <Progress value={progress} />
//           </Stack>
//         </ModalBody>
//         <ModalFooter>
//           <Button
//             colorScheme="red"
//             onClick={() => {
//               cancelTokenSource.cancel('リクエストを中断しました。');
//               setIsDownloading(false);
//             }}
//           >
//             Cancel
//           </Button>
//         </ModalFooter>
//       </ModalContent>
//     </Modal>
//   );
// };

ProjectData.getLayout = (page: React.ReactElement) => {
  return <StandardLayout>{page}</StandardLayout>;
};
ProjectData.needsAuthentication = true;
export default ProjectData;
