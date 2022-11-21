import { React, useState } from "react";
import { Container, Toast, Form, Button } from "react-bootstrap";
import axiosInstance from "../api/axiosInstance";

export default function SignIn(props) {
  const [InvalidCredentialsAlert, setInvalidCredentialsAlert] = useState({
    show: false,
    message: "",
  });
  const [Success, setSuccess] = useState(false);
  const [EnableSignInButton, setEnableSignInButton] = useState(false);

  const [Inputs, setInputs] = useState({
    Username: "",
    Password: "",
    ConfirmPassword: "",
  });

  const handleChange = (e) => {
    let input = Inputs;
    Inputs[e.target.name] = e.target.value;

    setInputs({ ...input });
  };

  const validate = async () => {
    let isValid = false;
    let credentials = {
      username: Inputs.Username,
      password: Inputs.Password,
      confirmPassword: Inputs.ConfirmPassword,
    };
    const data = await axiosInstance.post("/user/validate", credentials);
    if (data.data.status === "FAILED") {
      setInvalidCredentialsAlert({
        ...InvalidCredentialsAlert,
        show: true,
        message: data.data.message,
      });
    } else {
      isValid = true;
    }

    return isValid;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setEnableSignInButton(true);
    if (await validate()) {
      let credentials = {
        username: Inputs.Username,
        password: Inputs.Password,
      };
      const data = await axiosInstance.post("/user/create", credentials);
      if (data.data.status === "FAILED") {
        setInvalidCredentialsAlert({ show: true, message: data.data.message });
        setEnableSignInButton(false);
      } else {
        setSuccess(true);
        setTimeout(() => {
          props.setSignUpModal(false);
        }, 500);
        return;
      }
    }
    setEnableSignInButton(false);
  };

  return (
    <Container>
      <Toast
        onClose={() =>
          setInvalidCredentialsAlert({
            ...InvalidCredentialsAlert,
            show: false,
          })
        }
        show={InvalidCredentialsAlert.show}
        delay={10000}
        className="main-error-toast"
        autohide
      >
        <Toast.Header
          style={{
            borderTopLeftRadius: "1rem",
            borderTopRightRadius: "1rem",
            backgroundColor: "transparent",
            color: "white",
          }}
        >
          <strong className="me-auto">Oops!</strong>
        </Toast.Header>
        <Toast.Body>{InvalidCredentialsAlert.message}</Toast.Body>
      </Toast>
      <Toast
        onClose={() => setSuccess(false)}
        show={Success}
        delay={10000}
        className="main-success-toast"
        autohide
      >
        <Toast.Header
          style={{
            borderTopLeftRadius: "1rem",
            borderTopRightRadius: "1rem",
            backgroundColor: "transparent",
            color: "white",
          }}
        >
          <strong className="me-auto">Genial!</strong>
        </Toast.Header>
        <Toast.Body>Usuario creado! Ya puedes iniciar sesión 😁</Toast.Body>
      </Toast>
      <Form
        style={{ textAlign: "left" }}
        onSubmit={(e) => {
          handleSignUp(e);
        }}
      >
        <Form.Group className="mb-3" controlId="signUpUsername">
          <Form.Label>Nombre de Usuario</Form.Label>
          <Form.Control
            type="username"
            name="Username"
            placeholder="Ingresa tu usuario"
            required
            onChange={(e) => handleChange(e)}
          />
          <Form.Text className="text-muted">
            Recuerda que para ser realmente anónimo no debes utilizar datos
            personales.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="signUpPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            name="Password"
            placeholder="Contraseña"
            required
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="signUpConfirmPassword">
          <Form.Label>Confirma Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Contraseña"
            name="ConfirmPassword"
            required
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>

        <Button
          className="main-button"
          type="submit"
          disabled={EnableSignInButton}
        >
          Crear Cuenta
        </Button>
      </Form>
    </Container>
  );
}
