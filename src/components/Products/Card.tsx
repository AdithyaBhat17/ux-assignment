import { Button } from "@chakra-ui/button";
import { Text } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import { memo, SetStateAction } from "react";
import { ProductsResponse } from "../../types/api";

interface ProductProps {
  product: ProductsResponse;
  editMode: number | null;
  setEditMode: React.Dispatch<SetStateAction<number | null>>;
}

function Card({ product, editMode, setEditMode }: ProductProps) {
  return (
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
          onClick={() => setEditMode(product.id)}
          color="white"
          variant="solid"
          bg="celadonGreen"
          _hover={{ bg: "deepJungleGreen" }}
        >
          Notify me
        </Button>
      )}
    </Flex>
  );
}

export default memo(Card);
