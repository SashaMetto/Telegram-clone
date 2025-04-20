import React, { useState } from "react";
import { Button, Fieldset, Input, Group } from "@chakra-ui/react";
import { Field } from "../../components/ui/field.jsx";
import axios from "axios";
import { Toaster, toaster } from "../../components/ui/toaster";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleClick = () => setShow(!show);

  const submitHandler = async () => {
    console.log(`${email} ${password}`);
    if (!email || !password) {
      toaster.create({
        description: "Пожалуйста, заполните все поля",
        type: "warning",
      });
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );
      toaster.create({
        description: "Успешный вход",
        type: "info",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/chats");
    } catch (error) {
      toaster.create({
        description: `Ошибка ${error.response.data.message}`,
        type: "error",
      });
    }
  };

  return (
    <Fieldset.Root size="lg" maxW="md">
      <Fieldset.Content>
        <Field label="Email адрес" id="email" /*isRequired*/>
          <Input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>
        <Group attached display="flex" alignItems="end">
          <Field label="Пароль" id="password" /*isRequired*/>
            <Input
              type={show ? "text" : "password"}
              value={password}
              placeholder="Введите пароль"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>
          <Button size={"sm"} marginBottom={"2px"} onClick={handleClick}>
            {show ? "Скрыть" : "Показать"}
          </Button>
        </Group>

        <Button
          size={"sm"}
          marginBottom={"2px"}
          onClick={submitHandler}
          colorScheme={"black"}
        >
          Войти
        </Button>
        <Button
          size={"sm"}
          marginBottom={"2px"}
          colorScheme={"black"}
          onClick={() => {
            setEmail("guest@example.com");
            setPassword("123456");
          }}
        >
          Войти как гость
        </Button>
      </Fieldset.Content>
      <Toaster />
    </Fieldset.Root>
  );
};

export default Login;
