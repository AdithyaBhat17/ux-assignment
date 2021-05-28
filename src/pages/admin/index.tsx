import { Box, Heading } from "@chakra-ui/layout";
import Inventory from "../../components/Inventory";

function AdminPage() {
  return (
    <Box as="main" px={{ base: "0", sm: "20", md: "40", lg: "80", xl: "96" }}>
      <Heading as="h1" fontWeight="black" mt="20" mb="10" color="celadonGreen">
        Out of Stock
      </Heading>
      <Inventory type="out of stock" />
    </Box>
  );
}

export default AdminPage;
