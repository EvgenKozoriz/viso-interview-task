import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

const Authorization = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setIsLogin(true);
    }
  }, []);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = { username, password };
    localStorage.setItem("userData", JSON.stringify(userData));
    setIsLogin(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    setIsLogin(false);
  };

  return (
    <div className="text-center">
      {isLogin ? (
        <div className="d-flex align-items-center justify-content-center">
          <h2 className="me-3">Already Autorized</h2>
          <Button variant="secondary" onClick={handleLogout}>
            Exit
          </Button>
        </div>
      ) : (
        <Form
          className="mx-auto"
          onSubmit={handleSubmit}
          style={{ maxWidth: "500px" }}
        >
          <h2 className="mb-3">Authorization</h2>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>User name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            disabled={!username || !password}
          >
            Login
          </Button>
        </Form>
      )}
    </div>
  );
};

export default Authorization;
