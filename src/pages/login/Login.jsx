import { useMutation } from "@tanstack/react-query";
import { Navigate, useNavigate } from "react-router-dom";
import {
  Button,
  Input,
  Form,
  Row,
  Card,
  Layout,
  Typography,
  message,
} from "antd";
import { login } from "../../Apis/TestApi";
import style from "../style.module.css";
import { useAuthStore } from "../../stores/authStore";
function Login() {
  const [api, messageContext] = message.useMessage();
  const { setUserData } = useAuthStore();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setUserData({
        isLoggedIn: data.isLoggedIn,
        role: data.role,
        token: data.token,
      }),
        navigate("/admin");
    },
    onError: (err) => {
      console.log(err);
      api.error(err);
    },
  });
  function handleFormSubmit(data) {
    console.log(data);
    mutation.mutate(data);
  }
  const rules = {
    email: [
      {
        type: "email",
        message: "The input is not valid E-mail!",
      },
      {
        required: true,
        message: "Please enter your E-mail!",
      },
    ],
    password: [
      {
        required: true,
        message: "Please enter password!",
      },
    ],
  };
  function cusToken() {
    setUserData({
      isLoggedIn: true,
      role: "user",
      token: "token",
    });
    navigate("/admin");
  }
  return (
    <Layout>
      {messageContext}
      <Row justify="center" align="top" style={{ height: "100vh" }}>
        <Card className={style.loginCard}>
          <Typography.Title level={2}>Login</Typography.Title>
          <br />
          <Form layout="vertical" onFinish={handleFormSubmit}>
            <Form.Item
              rules={rules.email}
              label="Email"
              placeholder="Enter Email"
              name="email"
            >
              <Input />
            </Form.Item>
            <Form.Item
              rules={rules.password}
              label="Password"
              name="passsword"
              placeholder="Enter Password"
            >
              <Input.Password />
            </Form.Item>
            <Button
              type="primary"
              block
              loading={mutation?.isPending}
              htmlType="submit"
            >
              Login
            </Button>
            <br />
            <br />
            <Button type="primary" block onClick={cusToken}>
              Token
            </Button>
          </Form>
        </Card>
      </Row>
    </Layout>
  );
}

const LoginWrapper = () => {
  const { userData } = useAuthStore();
  return userData.isLoggedIn ? <Navigate to={"/admin"} /> : <Login />;
};

export default LoginWrapper;
