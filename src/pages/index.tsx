import Brands from "../components/Layout/Brands";
import Categories from "../components/Categories";
import Contact from "../components/Layout/Contact";
import Hero from "../components/Layout/Hero";
import { getCategories } from "../lib/getCategories";
import { PostgrestError } from "../types";

interface IndexProps {
  data: any[];
  error: PostgrestError | null;
}

const Index = ({ data }: IndexProps) => (
  <main>
    <Hero />
    <Categories data={data} />
    <Brands />
    <Contact />
  </main>
);

export async function getStaticProps() {
  const response = await getCategories();

  return {
    props: {
      data: response.data,
      error: response.error,
    },
  };
}

export default Index;
