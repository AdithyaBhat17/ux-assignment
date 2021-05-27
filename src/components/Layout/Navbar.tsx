import { Box, Flex, HStack, Link, List, ListItem } from "@chakra-ui/layout";
import { useTheme } from "@chakra-ui/system";
import { useRouter } from "next/dist/client/router";
import { navRoutes } from "../../utils/routes";

export default function Navbar() {
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
        <img
          width={50}
          height={50}
          src="/static/assets/images/Logo.png"
          alt="Logo"
        />
      </Box>
      <List display="flex" justifyContent="space-between">
        <HStack as="ul" listStyleType="none" spacing="10">
          {navRoutes.map((route) => (
            <ListItem role="listitem" key={route.name}>
              <Link
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
      </List>
    </Flex>
  );
}
