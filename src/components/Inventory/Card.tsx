import { Button } from "@chakra-ui/button";
import { FormControl } from "@chakra-ui/form-control";
import { Box, Divider, Flex, Text } from "@chakra-ui/layout";
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/number-input";
import { useToast } from "@chakra-ui/toast";
import { FormEvent, useState } from "react";
import { editStock } from "../../lib/inventory";
import { ProductInventory } from "../../types";

function Card({
  product,
  optimisticProductUpdateHandler,
}: {
  product: ProductInventory;
  optimisticProductUpdateHandler: (id: number, remaining: number) => void;
}) {
  const [editMode, setEditMode] = useState(false);
  const [remaining, setRemaining] = useState(0);
  const [status, setStatus] = useState({ loading: false, error: "" });

  const toast = useToast();

  const toggleEditMode = () => setEditMode((prevState) => !prevState);

  const updateProduct = async (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    setStatus({ loading: true, error: "" });
    const result = await editStock(product.id, remaining);
    if (!result.data) {
      setStatus({ error: "Failed to update inventory.", loading: true });
      return;
    }

    let description;

    // Notify customers only if the product is in demand, and was previously out of stock.
    if (product.requests && !product.remaining) {
      description = `Notifying ${product.requests} ${"customers".slice(
        0,
        product.requests === 1 ? -1 : undefined
      )} about ${product.name}'s availability...`;
    }

    setStatus({ loading: false, error: "" });
    setEditMode(false);
    // Handle optimistic UI updates to provide instant feedback once the data is updated in the backend.
    optimisticProductUpdateHandler(product.id, remaining);
    toast({
      title: "Updated Inventory!",
      description,
      status: "success",
      position: "top-right",
    });
  };

  return (
    <Box p="5" border="1px solid #eaeaea" borderRadius="lg">
      <Flex
        justifyContent="space-between"
        alignItems="flex-start"
        key={product.id}
      >
        <Box>
          <Text
            fontWeight="semibold"
            fontSize="lg"
            isTruncated
            width={{ base: "80%", sm: "100%" }}
          >
            {product.name}
          </Text>
          <Text
            color="gray.600"
            width={{ base: "80%", sm: "100%" }}
            fontSize="sm"
          >
            {product.class} •{" "}
            {!product.remaining
              ? "Out of stock"
              : `${product.remaining} remaining`}{" "}
            • {product.requests}{" "}
            {"requests".slice(0, product.requests === 1 ? -1 : undefined)}
          </Text>
        </Box>

        <Button
          variant={editMode ? "ghost" : "outline"}
          color="celadonGreen"
          onClick={toggleEditMode}
          borderColor="celadonGreen"
          _hover={
            !editMode
              ? { bg: "celadonGreen", color: "white" }
              : { bg: "gray.200" }
          }
        >
          {editMode ? "Cancel" : "Edit"}
        </Button>
      </Flex>
      {editMode && <Divider my="5" />}
      {editMode && (
        <Flex
          as="form"
          onSubmit={updateProduct}
          method="post"
          gridGap="10"
          mx="auto"
        >
          <FormControl
            id={`${product.name}_${product.remaining}`}
            aria-label="stock"
          >
            <NumberInput
              onChange={(value) => setRemaining(Math.abs(Number(value)))}
              defaultValue={remaining || product.remaining || 0}
              width="100%"
            >
              <NumberInputField autoFocus />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <Button
            bg="celadonGreen"
            color="white"
            isLoading={status.loading}
            isDisabled={status.loading}
            _hover={{ bg: "deepJungleGreen" }}
            isFullWidth
            px="10"
            type="submit"
          >
            Save Changes
          </Button>
        </Flex>
      )}
    </Box>
  );
}

export default Card;
