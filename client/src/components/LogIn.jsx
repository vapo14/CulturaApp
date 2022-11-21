import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../css/landing.css";
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Modal,
  Form,
  Toast,
} from "react-bootstrap";
import callOut from "../assets/landing/call-out.png";
import mainLogo from "../assets/landing/text.png";
import SignIn from "./SignIn";

export default function LogIn() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [LoginModal, setLoginModal] = useState(false);
  const [SignUpModal, setSignUpModal] = useState(false);
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [EnableLogInButton, setEnableLogInButton] = useState(false);
  const [InvalidCredentialsAlert, setInvalidCredentialsAlert] = useState(false);

  const handleLogin = async (e) => {
    setEnableLogInButton(true);
    setInvalidCredentialsAlert(false);
    e.preventDefault();
    let credentials = {
      username: Username,
      password: Password,
    };
    const data = await login(credentials);
    if (data !== "FAILED") {
      navigate("/home");
    } else {
      setInvalidCredentialsAlert(true);
      setEnableLogInButton(false);
    }
  };

  return (
    <div className="login-page-container">
      <Container className={LoginModal || SignUpModal ? "behind-modal" : ""}>
        <Row>
          <Col md={6} style={{ padding: "4rem" }}>
            <h1 id="main-app-title">Expresa-Tec</h1>
            <p style={{ fontFamily: "Lora" }}>
              Un foro de discusión realmente anónimo para la discusión de temas
              de interés y promover la cultura de la legalidad en la comunidad
              del Tec de Monterrey campus Chihuahua.
            </p>
            <div>
              <span className="sign-up-span">
                <Button
                  className="main-button"
                  onClick={() => setLoginModal(true)}
                >
                  Inicia Sesión
                </Button>
                o
                <span id="sign-up-link" onClick={() => setSignUpModal(true)}>
                  Crea tu cuenta
                </span>
              </span>
            </div>
          </Col>
          <Col md={6}>
            <Image fluid src={callOut} alt="" id="call-out" />
          </Col>
        </Row>
      </Container>

      <Modal
        centered
        show={LoginModal}
        style={{ textAlign: "center" }}
        onHide={() => setLoginModal(false)}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <h3
            style={{
              fontWeight: "bold",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Bienvenido
          </h3>
          <Toast
            onClose={() => setInvalidCredentialsAlert(false)}
            show={InvalidCredentialsAlert}
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
            <Toast.Body>
              Contraseña o usuario incorrecto, intenta de nuevo.
            </Toast.Body>
          </Toast>
          <Container>
            <Form
              style={{ textAlign: "left" }}
              onSubmit={(e) => {
                handleLogin(e);
              }}
            >
              <Form.Group className="mb-3" controlId="loginUsername">
                <Form.Label>Nombre de usuario</Form.Label>
                <Form.Control
                  type="username"
                  placeholder="Ingresa tu usuario"
                  onChange={(e) => setUsername(e.target.value)}
                  required={true}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="loginPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Contraseña"
                  onChange={(e) => setPassword(e.target.value)}
                  required={true}
                />
                <Form.Text className="text-muted">
                  Tu contraseña siempre es encriptada :)
                </Form.Text>
              </Form.Group>
              <Button
                className="main-button"
                type="submit"
                disabled={EnableLogInButton}
              >
                Iniciar Sesión
              </Button>
            </Form>
          </Container>
        </Modal.Body>
      </Modal>

      <Modal
        centered
        show={SignUpModal}
        onHide={() => setSignUpModal(false)}
        style={{ textAlign: "center" }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <h3
            style={{
              fontWeight: "bold",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Crea tu cuenta
          </h3>
          <SignIn setSignUpModal={setSignUpModal} />
        </Modal.Body>
      </Modal>
    </div>
  );
}
