import React, { useState } from "react";
import { Button, Fieldset, Input, Group } from "@chakra-ui/react";
import { Field } from "../../components/ui/field.jsx";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleClick = () => setShow(!show);

  const postDetails = (pics) => {};

  return (
    <Fieldset.Root size="lg" maxW="md">
      <Fieldset.Content>
        <Field label="Email адрес" id="email" /*isRequired*/>
          <Input
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>
        <Group attached display="flex" alignItems="end">
          <Field label="Пароль" id="password" /*isRequired*/>
            <Input
              type={show ? "text" : "password"}
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
          onClick={handleClick}
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
    </Fieldset.Root>
  );
};

export default Login;
