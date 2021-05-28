import { Box } from "@chakra-ui/layout";
import { getCategories } from "../../lib/getCategories";
import { useRouter } from "next/dist/client/router";
import Inventory from "../../components/Inventory";
import { capitalizeString } from "../../utils/stringUtilities";
import { Heading } from "@chakra-ui/layout";

function AdminPage({ types }: { types: string }) {
  const { query } = useRouter();

  return (
    <Box as="main" px={{ base: "0", sm: "20", md: "40", lg: "80", xl: "96" }}>
      <Heading as="h1" fontWeight="black" mt="20" mb="10" color="celadonGreen">
        {capitalizeString(query.name as string) || "Out of Stock"}
      </Heading>
      <Inventory type={capitalizeString(query.name as string)} />
    </Box>
  );
}

export async function getStaticProps({ params }: { params: { name: string } }) {
  const response = await getCategories(params.name);

  return {
    props: {
      types: response.data.map((c) => c.name) ?? null,
      error: response.error,
    },
  };
}

export async function getStaticPaths() {
  const { data, error } = await getCategories();
  if (error) throw new Error("Failed to fetch categories");

  return {
    paths:
      data?.map((category) => `/admin/${category.name.toLowerCase()}`) ?? [],
    fallback: false,
  };
}

export default AdminPage;
