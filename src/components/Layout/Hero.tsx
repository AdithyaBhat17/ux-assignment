import { Flex, Heading, Spacer, Text } from "@chakra-ui/layout";

export default function Hero() {
  return (
    <Flex direction="column" my="20">
      <Heading
        as="h1"
        width="100%"
        fontSize={{ base: "4xl", sm: "5xl" }}
        fontWeight="black"
        color="celadonGreen"
      >
        Quality Feed &amp;
        <Spacer display={{ base: "auto", md: "none" }} /> Gardening Company
      </Heading>
      <Text my="4" fontSize="xl">
        A Heights Tradition since 1928.
      </Text>
    </Flex>
  );
}
