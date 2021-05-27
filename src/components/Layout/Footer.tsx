import {
  Box,
  Flex,
  Heading,
  Link,
  List,
  ListItem,
  Spacer,
} from "@chakra-ui/layout";
import { navRoutes } from "../utils/routes";

export default function Footer({ links }: { links: typeof navRoutes }) {
  return (
    <Box width="100%" mt="20" p="10" as="footer" bg="celadonGreen">
      <Flex alignItems="center">
        <img src="/static/assets/images/Logo.png" alt="Logo" />
        <Heading ml="5" size="md" color="white">
          Quality Feed &amp; <br /> Gardening Company
        </Heading>
      </Flex>
      <Spacer my="14" />
      <Flex direction="column">
        <Spacer my="2" />
        <Flex
          as={List}
          flexWrap="wrap"
          justifyContent="flex-start"
          gridGap="10"
        >
          {links.map((link) => (
            <ListItem key={link.name}>
              <Link href={link.path} color="white">
                {link.name}
              </Link>
            </ListItem>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
}
