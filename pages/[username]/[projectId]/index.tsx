import React from "react";
import type { NextPage, GetServerSideProps } from "next";
import { Box, Image, AspectRatio, Heading } from "@chakra-ui/react";
import useSWR from "swr";
import { Project } from "../../../types";

import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { authState } from "../../../recoil/atoms";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";

import { Map } from "../../../components/Map";

const Dashboard: NextPage = () => {
  const router = useRouter();
  const auth = useRecoilValue(authState);
  router;
  const { data: project, error } = useSWR<Project>([
    `/projects/${router.query.projectId}`,
    auth.token,
  ]);

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
      {/* メインコンテンツ */}
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

        <Heading
          as="h1"
          size="xl"
          pl={4}
          my={4}
          borderLeft="solid 12px #86D1C6"
        >
          {project?.name}
        </Heading>
        <ReactMarkdown
          components={ChakraUIRenderer()}
          children={project?.overview ?? ""}
          remarkPlugins={[remarkGfm]}
          skipHtml
        />
        <Box w="100%" h="600px">
          <Map />
        </Box>
      </Box>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: {
    layout: "dashboard",
    authenticated: true,
  },
});

export default Dashboard;
