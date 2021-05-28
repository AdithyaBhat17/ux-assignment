import { Button } from "@chakra-ui/button";
import {
  FormControl,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Heading } from "@chakra-ui/layout";
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/number-input";
import { Select } from "@chakra-ui/select";
import { useToast } from "@chakra-ui/toast";
import { useRouter } from "next/dist/client/router";
import { FormEvent, useState } from "react";
import { createProduct } from "../../lib/inventory";
import { AddProductFormInputs } from "../../types";
import { adminRoutes } from "../../utils/routes";

function NewProduct() {
  const toast = useToast();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function addProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);

    const { name, categoryId, tag, remaining } = event.target as EventTarget &
      AddProductFormInputs;

    const result = await createProduct({
      name: name.value,
      categoryId: categoryId.value,
      tag: tag.value,
      remaining: remaining.value,
    });

    setLoading(false);

    if (!result.data) {
      return toast({
        title: "Failed to add product",
        description:
          result.error.details || "Please check the details and try again.",
        position: "top-right",
        status: "error",
      });
    }

    toast({
      title: "Added new product successfully",
      position: "top-right",
      status: "success",
    });

    router.push(`${adminRoutes[categoryId.value].path}`);
  }

  return (
    <Box as="main" px={{ base: "0", sm: "20", md: "40", lg: "80", xl: "96" }}>
      <Heading as="h1" fontWeight="black" mt="20" mb="10" color="celadonGreen">
        Update Inventory
      </Heading>
      <form onSubmit={addProduct} method="post">
        <FormControl my="7" isRequired id="name">
          <FormLabel>Name of the product/animal/bird</FormLabel>
          <Input placeholder="Red Flannel" size="lg" type="text" />
        </FormControl>
        <FormControl isRequired id="categoryId">
          <FormLabel>Category</FormLabel>
          <Select size="lg" placeholder="Select category">
            {adminRoutes
              .filter((nr) => nr.name !== "Home")
              .map((category, index) => (
                <option key={category.name} value={index + 1}>
                  {category.name}
                </option>
              ))}
          </Select>
        </FormControl>
        <FormControl my="7" isRequired id="remaining">
          <FormLabel>Count</FormLabel>
          <NumberInput size="lg">
            <NumberInputField placeholder="7" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl isRequired id="tag">
          <FormLabel>Tag</FormLabel>
          <Input size="lg" type="text" placeholder="Horse" />
          <FormHelperText color="gray.600">
            Example: Horse, Cattle, Sheep & Goat, Pets, Bonsai, Poultry, Seeds,
            Starter Plants, etc.
          </FormHelperText>
        </FormControl>
        <Button
          isFullWidth
          my="7"
          py="6"
          color="white"
          bg="celadonGreen"
          _hover={{ bg: "deepJungleGreen" }}
          type="submit"
          isLoading={loading}
          isDisabled={loading}
        >
          Add to Inventory
        </Button>
      </form>
    </Box>
  );
}

export default NewProduct;
