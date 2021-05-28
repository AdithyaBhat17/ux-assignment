import { IconButton } from "@chakra-ui/button";
import { CheckIcon } from "@chakra-ui/icons";
import { Heading, Stack, Text } from "@chakra-ui/layout";

function SuccessState() {
  return (
    <div>
      <Stack spacing="5" direction="column" alignItems="center">
        <IconButton
          aria-label="success"
          icon={<CheckIcon />}
          variant="outline"
          width="2rem"
          borderColor="celadonGreen"
          color="celadonGreen"
          borderRadius="full"
          size="lg"
          bg="green.100"
        />
        <Heading size="md" color="celadonGreen">
          Registered Successfully!
        </Heading>
        <Text fontSize="md">
          We will send you a text once we procure the required stock. Thank you
          for your patience!
        </Text>
        <Text as="small" color="celadonGreen" textAlign="center">
          This popup will close in 5s
        </Text>
      </Stack>
    </div>
  );
}

export default SuccessState;
