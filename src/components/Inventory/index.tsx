import { Button } from "@chakra-ui/button";
import { AddIcon, CheckCircleIcon } from "@chakra-ui/icons";
import { Box, Flex, Link, Stack, Text } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { getProductInventory } from "../../lib/inventory";
import { ProductInventory } from "../../types";
import Card from "./Card";
import { FlowerSpinner } from "react-epic-spinners";

function Inventory({ type = "out of stock" }: { type: string }) {
  const [status, setStatus] = useState("idle");
  const [products, setProducts] = useState<ProductInventory[] | null>(null);

  useEffect(() => {
    setStatus("loading");
    getProductInventory(type)
      .then(setProducts)
      .then(() => setStatus("idle"));
  }, []);

  const optimisticProductUpdateHandler = (id: number, remaining: number) => {
    if (!products) return;
    if (type === "out of stock") {
      return setProducts(
        () => products?.filter((product) => product.id !== id) ?? null
      );
    }

    const index = products.findIndex((product) => product.id === id);
    setProducts([
      ...products.slice(0, index),
      { ...products[index], remaining },
      ...products.slice(index + 1),
    ]);
  };

  if ((!products || !products.length) && status !== "loading")
    return (
      <Box my="10">
        <CheckCircleIcon
          mx="auto"
          display="block"
          my="5"
          fontSize="4xl"
          color="celadonGreen"
          textAlign="center"
        />
        <Text textAlign="center">All products are in stock!!</Text>
      </Box>
    );

  if (!products || !products.length)
    return (
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        height="60vh"
      >
        <FlowerSpinner style={{ display: "block" }} color="#257F78" />
      </Flex>
    );

  return (
    <Stack spacing="5">
      {products
        ?.sort((a, b) => b.requests - a.requests || a.remaining - b.remaining)
        .map((product) => (
          <Card
            optimisticProductUpdateHandler={optimisticProductUpdateHandler}
            product={product}
            key={product.id}
          />
        ))}
      <Button
        position="fixed"
        bottom="5"
        width="4rem"
        height="4rem"
        bg="celadonGreen"
        color="white"
        borderRadius="full"
        boxShadow="lg"
        _hover={{ bg: "deepJungleGreen" }}
        right="5"
        as={Link}
        aria-label="new product"
        href="/admin/new"
      >
        <AddIcon fontWeight="bold" fontSize="2xl" />
      </Button>
    </Stack>
  );
}

export default Inventory;
