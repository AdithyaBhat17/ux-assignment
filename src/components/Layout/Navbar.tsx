import { Box, Flex, HStack, Link, List, ListItem } from "@chakra-ui/layout";
import { useTheme } from "@chakra-ui/system";
import { useRouter } from "next/dist/client/router";
import { navRoutes } from "../../utils/routes";

export default function Navbar({ routes }: { routes: typeof navRoutes }) {
  const theme = useTheme();
  const { asPath } = useRouter();

  return (
    <Flex
      as="header"
      flexWrap="wrap"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box mx={{ base: "auto", sm: "0" }} mb={{ base: "5", sm: "auto" }}>
        <Link href="/">
          <img
            width={50}
            height={50}
            src="/static/assets/images/Logo.png"
            alt="Logo"
          />
        </Link>
      </Box>
      <HStack
        as={List}
        overflowX="auto"
        gridGap="6"
        display="flex"
        justifyContent="space-between"
      >
        {routes.map((route) => (
          <ListItem role="listitem" key={route.name}>
            <Link
              isTruncated
              aria-current={route.path === asPath ? "page" : "false"}
              _activeLink={{
                color: theme.colors.darkCornflowerBlue,
                fontWeight: 600,
                textDecoration: "underline",
              }}
              href={route.path}
            >
              {route.name}
            </Link>
          </ListItem>
        ))}
      </HStack>
    </Flex>
  );
}
