import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { Container } from "react-bootstrap";
import styles from "./Layout.module.css"; 

const Layout = () => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <Container className={styles.content}>
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
};

export default Layout;
