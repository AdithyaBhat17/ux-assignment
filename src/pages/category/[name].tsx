import { Image } from "@chakra-ui/image";
import { Box, Heading, Stack, Text } from "@chakra-ui/layout";
import { Category } from "../../components/Categories";
import Products from "../../components/Products";
import { getCategories } from "../../lib/getCategories";

function CategoryPage({ data }: { data: Category["data"][number] }) {
  return (
    <Box px={{ base: "0", sm: "20", md: "40", lg: "80", xl: "96" }}>
      <Stack mt="10" spacing="10">
        <Heading>{data.name}</Heading>
        <Image
          width="100%"
          height="auto"
          src={`/static/assets/images/categories/${data.thumbnail}`}
          alt={data.name}
        />
        <Text>{data.description || data.excerpt}</Text>
      </Stack>
      <Stack>
        <Products id={data.id} />
      </Stack>
    </Box>
  );
}

export async function getStaticProps({ params }: { params: { name: string } }) {
  const response = await getCategories(params.name);

  return {
    props: {
      data: response.data?.[0] ?? null,
      error: response.error,
    },
  };
}

export async function getStaticPaths() {
  const { data, error } = await getCategories();
  if (error) throw new Error("Failed to fetch categories");

  return {
    paths:
      data?.map((category) => `/category/${category.name.toLowerCase()}`) ?? [],
    fallback: false,
  };
}

export default CategoryPage;
