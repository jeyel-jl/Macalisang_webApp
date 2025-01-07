import Nav from '../../components/Navbar/Nav';
import Header from '../../components/Header/Header';
import Multipleproduct from '../Multipleproduct/Multipleproduct';
import Footer from '../../components/Footer/Footer';
import Adminhome from '../admin/Home/Adminhome';
import { useContext, useEffect } from 'react';
import { Appcontext } from '../../Context/Appcontext';

const Home = () => {
  const { getProduct, currUser, user, isCurrloading } = useContext(Appcontext);

  useEffect(() => {
    getProduct();
    currUser();
  }, []);

  console.log("User data from database:", user);
  if (isCurrloading) {
    return <div>Loading user data...</div>;
  }

  const { category } = user || {}; // Destructure with fallback to empty object if user is undefined

  return (
    <>
      {category === "Admin" ? (
        <Adminhome />
      ) : (
        <div className="userhome">
          <Nav />
          <Header />
          <Multipleproduct />
          <Footer />
        </div>
      )}
    </>
  );
};

export default Home;
