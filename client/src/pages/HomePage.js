import { useAuth } from "../components/context/auth";
import Layout from "./../components/Layout/Layout";

const HomePage = () => {
  const [auth,setAuth]=useAuth();
  return (
    <Layout title="My Ecommmerce">
      <pre> {JSON.stringify(auth,null,4)} </pre>
      <h1>HomePage</h1>
    </Layout>
  );
};

export default HomePage;