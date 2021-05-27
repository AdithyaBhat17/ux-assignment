import { Flex, useColorMode, FlexProps } from "@chakra-ui/react";

export const Container = (props: FlexProps) => {
  const { colorMode } = useColorMode();

  const bgColor = { light: "white", dark: "gray.900" };

  const color = { light: "black", dark: "white" };
  return (
    <Flex
      p={{ base: "5", sm: "10" }}
      direction="column"
      // alignItems="center"
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      {...props}
    />
  );
};
