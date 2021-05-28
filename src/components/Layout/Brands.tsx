import { Grid, GridItem, Heading, Stack } from "@chakra-ui/layout";

const BRANDS = [
  {
    name: "Wysong",
    logo: "wysong.png",
  },
  {
    name: "Mazuri",
    logo: "mazuri.png",
  },
  {
    name: "Sportmix",
    logo: "sportmix.png",
  },
];

export default function Brands() {
  return (
    <Stack my="24" spacing="10">
      <Heading size="md" textAlign={{ base: "left", sm: "center" }}>
        Quality Feed & Garden Company is proud to carry these fine product
        lines.
      </Heading>
      <Grid
        justifyItems={{ base: "flex-start", sm: "center" }}
        alignItems="center"
        overflowX="auto"
        width="100%"
        gridTemplateColumns="repeat(3, 1fr)"
        gridGap="20"
      >
        {BRANDS.map((brand) => (
          <GridItem key={brand.name}>
            <img
              width={100}
              height={100}
              src={`/static/assets/images/brands/${brand.logo}`}
              alt={brand.name}
            />
          </GridItem>
        ))}
      </Grid>
    </Stack>
  );
}
