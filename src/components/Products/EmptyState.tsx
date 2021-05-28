import { Stack, Heading, Link } from "@chakra-ui/layout";
import { useRouter } from "next/dist/client/router";
import { memo } from "react";
import { capitalizeString } from "../../utils/stringUtilities";

function EmptyState() {
  const { query } = useRouter();
  return (
    <div>
      <Stack spacing="6" direction="column" alignItems="center" my="20">
        <Heading textAlign="center" size="md">
          No "{capitalizeString(query.name as string)}" products available at
          the moment
        </Heading>
        <Link
          px="6"
          py="3"
          borderRadius="md"
          color="white"
          fontWeight="medium"
          _hover={{ bg: "deepJungleGreen" }}
          bg="celadonGreen"
          href="tel:+1 (793) 263 2323"
        >
          Contact Support
        </Link>
      </Stack>
    </div>
  );
}

export default memo(EmptyState);
