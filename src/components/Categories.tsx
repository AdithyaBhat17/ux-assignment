import { Heading, Link, SimpleGrid, Stack, Text } from "@chakra-ui/layout";

// TODO: Move this interface to /types
export interface Category {
  data: {
    id: number;
    name: string;
    thumbnail: string;
    blurhash: string;
    excerpt: string;
    description?: string;
  }[];
}

export default function Categories({ data }: Category) {
  // TODO: Add micro-animations
  return (
    <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gridGap="10">
      {data.map((category) => (
        <Link
          key={category.id}
          color="celadonGreen"
          style={{ textDecoration: "none" }}
          href={`/category/${category.name.toLowerCase().replace(/ /gi, "-")}`}
        >
          <Stack>
            <img
              width={400}
              height={300}
              src={`/static/assets/images/categories/${category.thumbnail}`}
              alt={category.name}
            />
            <Heading fontSize="3xl">{category.name}</Heading>
            <Text textDecoration="none" color="black">
              {category.excerpt}
            </Text>
          </Stack>
        </Link>
      ))}
    </SimpleGrid>
  );
}
