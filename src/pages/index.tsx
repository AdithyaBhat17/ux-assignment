import Brands from "../components/Layout/Brands";
import Categories from "../components/Categories";
import Contact from "../components/Layout/Contact";
import Hero from "../components/Layout/Hero";
import { getCategories } from "../lib/getCategories";
import { PostgrestError } from "../types/api";

interface IndexProps {
  data: any[];
  error: PostgrestError | null;
}

const Index = ({ data, error }: IndexProps) => (
  <div>
    <Hero />
    <Categories data={data} />
    <Brands />
    <Contact />
  </div>
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
