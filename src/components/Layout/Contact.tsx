import {
  Box,
  Grid,
  GridItem,
  Heading,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/layout";
import { ReactChild } from "react";

function Contact() {
  return (
    <Stack spacing="5" my="10" as="section">
      <SimpleGrid
        alignItems="flex-end"
        gridGap="10"
        columns={{ base: 1, md: 2 }}
      >
        <GridItem>
          <Stack spacing="16">
            <Heading>Reach us at</Heading>
            <iframe
              src="https://embed.waze.com/iframe?zoom=16&lat=29.795914&lon=-95.379686&ct=livemap&pin=1"
              // width="600"
              height="450"
              allowFullScreen
            ></iframe>
          </Stack>
        </GridItem>
        <GridItem>
          <Stack spacing="2">
            <div>
              <Text fontSize="lg">4428 North Main Street,</Text>
              <Heading>Houston, TX</Heading>
            </div>
            <Heading>
              <Link color="celadonGreen" href="tel:+1 (713) 862 2323">
                +1 (713) 862 2323
              </Link>
            </Heading>
          </Stack>
          <Grid gridGap="5" my="5">
            <TimingsCard>
              <Text>Mon-Fri</Text>
              <Text fontSize="lg" fontWeight="semibold">
                9 AM - 6 PM
              </Text>
            </TimingsCard>
            <TimingsCard>
              <Text>Saturday</Text>
              <Text fontSize="lg" fontWeight="semibold">
                9 AM - 4 PM
              </Text>
            </TimingsCard>
            <TimingsCard>
              <Text>Sunday</Text>
              <Text fontSize="lg" fontWeight="semibold">
                11:30 AM - 4 PM
              </Text>
            </TimingsCard>
          </Grid>
        </GridItem>
      </SimpleGrid>
    </Stack>
  );
}

function TimingsCard({ children }: { children: ReactChild | ReactChild[] }) {
  return (
    <Box
      width="100%"
      border="1px solid"
      borderColor="#eaeaea"
      p="5"
      w={{ base: "100%" }}
      borderRadius="lg"
    >
      <Stack isTruncated>{children}</Stack>
    </Box>
  );
}

export default Contact;
