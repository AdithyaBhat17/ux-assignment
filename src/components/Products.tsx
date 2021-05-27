import { Button } from "@chakra-ui/button";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Link,
  Stack,
  Text,
} from "@chakra-ui/layout";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase.client";
import { capitalizeString } from "../utils/stringUtilities";

interface ProductsResponse {
  id: number;
  name: string;
  categoryId: number;
  remaining: number;
  class: string;
}
[];

async function getProducts(id: number) {
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("categoryId", id);

  return (
    products?.reduce((acc, curr) => {
      if (acc[curr.class]) {
        return {
          ...acc,
          [curr.class]: [...acc[curr.class], curr],
        };
      }
      return {
        ...acc,
        [curr.class]: [curr],
      };
    }, {}) ?? null
  );
}

function Products({ id }: { id: number }) {
  const [status, setStatus] =
    useState<"idle" | "loading" | "success" | "error">("idle");
  const [products, setProducts] =
    useState<{ [key: string]: ProductsResponse[] } | null>(null);

  const { query } = useRouter();

  // TODO: Create a custom hook
  useEffect(() => {
    setStatus("loading");
    async function fetchData() {
      const products = await getProducts(id);
      setProducts(products);
      setStatus("idle");
    }

    fetchData();
  }, [id]);

  // TODO: Move this to a custom component
  if (
    (products == null || !Object.keys(products).length) &&
    status !== "loading"
  ) {
    return (
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
    );
  }

  if (!products) return <div>Loading...</div>;

  return (
    <Grid my="10">
      {Object.keys(products).map((productClass) => (
        <GridItem
          borderTop="1px solid #eaeaea"
          borderBottom="1px solid #eaeaea"
          key={productClass}
        >
          <Heading mt="5" size="md">
            {productClass}
          </Heading>
          {products[productClass].map((product) => (
            <Flex
              justifyContent="space-between"
              alignItems="flex-start"
              key={product.id}
              bg={product.remaining ? "white" : "#fafafa"}
              p="5"
              border="1px solid #eaeaea"
              my="5"
              borderRadius="lg"
            >
              <Box>
                <Text fontWeight="semibold" fontSize="lg">
                  {product.name}
                </Text>
                <Text color="gray.500" fontSize="sm">
                  {!product.remaining ? "Out of stock" : "Available now"}
                </Text>
              </Box>
              {product.remaining > 0 ? (
                <Text textAlign="right">
                  <Text as="span" fontWeight="bold" fontSize="2xl">
                    {product.remaining}
                  </Text>{" "}
                  <br /> <Text as="small">Remaining</Text>
                </Text>
              ) : (
                <Button
                  color="white"
                  variant="solid"
                  bg="celadonGreen"
                  _hover={{ bg: "deepJungleGreen" }}
                >
                  Notify me
                </Button>
              )}
            </Flex>
          ))}
        </GridItem>
      ))}
    </Grid>
  );
}

export default Products;
