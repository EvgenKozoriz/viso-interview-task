import { useEffect, useState } from "react";
import { UserData } from "../../types";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

const IsLogin = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setIsLogin(true);
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  return (
    <Container className="text-center mt-1">
      {isLogin ? (
          <h2>Hello, {userData?.username}</h2>
      ) : (
        <h2>
          You are not authorized!{" "}
          <Link to="/auth" style={{ textDecoration: "none" }}>
            To the authorization page
          </Link>
        </h2>
      )}
    </Container>
  );
};

export default IsLogin;
