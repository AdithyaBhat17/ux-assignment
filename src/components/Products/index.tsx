import { Flex, Grid, GridItem, Heading } from "@chakra-ui/layout";
import { useProducts } from "../../hooks/products";
import EmptyState from "./EmptyState";
import Card from "./Card";
import { useCallback, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/modal";
import Subscribe from "./Subscribe";
import { validatePhone } from "../../lib/validatePhone";
import { createSubscription } from "../../lib/createSubscription";
import { FlowerSpinner } from "react-epic-spinners";

function Products({ id }: { id: number }) {
  const { products, isLoading } = useProducts(id);

  const [editMode, setEditMode] = useState<number | null>(null);

  const close = useCallback(() => setEditMode(null), []);

  const subscribe = useCallback(
    async (phone: string, whatsapp: boolean) => {
      if (!validatePhone(phone) || !editMode)
        return { error: "Invalid phone number." };

      const { data } = await createSubscription({
        phone,
        whatsapp,
        productId: editMode,
      });

      if (data == null) {
        return {
          error: "Failed to register phone number. Please try again.",
        };
      }

      return { success: true, error: null };
    },
    [editMode]
  );

  if ((products == null || !Object.keys(products).length) && !isLoading) {
    return <EmptyState />;
  }

  if (!products)
    return (
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        height="60vh"
      >
        <FlowerSpinner
          style={{ display: "block", width: "auto" }}
          color="#257F78"
        />
      </Flex>
    );

  return (
    <div>
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
              <Card
                setEditMode={setEditMode}
                key={product.id}
                product={product}
              />
            ))}
          </GridItem>
        ))}
      </Grid>
      <Modal isOpen={Boolean(editMode)} onClose={close}>
        <ModalOverlay />
        <ModalContent width="90%" p="5">
          <ModalCloseButton
            variant="outlined"
            bg="celadonGreen"
            color="white"
            borderRadius="full"
            _hover={{ bg: "deepJungleGreen" }}
            my="6"
            mr="5"
          />
          <ModalBody mt="10">
            <Subscribe close={close} subscribe={subscribe} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Products;
