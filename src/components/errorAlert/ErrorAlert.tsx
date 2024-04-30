import { useState } from "react";
import { Alert } from "react-bootstrap";

interface ErrorProps {
  errorMessage: string;
}

const ErrorAlert: React.FC<ErrorProps> = ({ errorMessage }) => {
  const [show, setShow] = useState(true);

  return (
    <>
      {show && (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>{errorMessage}</p>
        </Alert>
      )}
    </>
  );
};

export default ErrorAlert;
