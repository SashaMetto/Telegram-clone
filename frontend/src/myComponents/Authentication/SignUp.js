import React, { useState } from "react";
import { Button, Fieldset, Input, Group } from "@chakra-ui/react";
import { Toaster, toaster } from "../../components/ui/toaster";
import { Field } from "../../components/ui/field";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const navigate = useNavigate();

  const handleClick = () => setShow(!show);

  function convertToBase64(e) {
    console.log(e);
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setPic(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  }

  const submitHandler = async () => {
    if (!name || !email || !password || !confirmpassword) {
      toaster.create({
        description: "Пожалуйста, заполните все поля",
        type: "warning",
      });
      return;
    }
    if (password !== confirmpassword) {
      toaster.create({
        description: "Пароли не совпадают",
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
        "/api/user",
        { name, email, password, pic },
        config
      );
      toaster.create({
        description: "Успешная регистрация",
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
        <Field label="Имя" id="first-name" /*isRequired*/>
          <Input
            name="Name"
            placeholder="Введите свое имя"
            onChange={(e) => setName(e.target.value)}
          />
        </Field>

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
        <Group attached display="flex" alignItems="end">
          <Field label="Подтвердите Пароль" id="password" /*isRequired*/>
            <Input
              type={show ? "text" : "password"}
              placeholder="Подтвердите Пароль"
              onChange={(e) => setConfirmpassword(e.target.value)}
            />
          </Field>
          <Button size={"sm"} marginBottom={"2px"} onClick={handleClick}>
            {show ? "Скрыть" : "Показать"}
          </Button>
        </Group>

        <Field label="Загрузите картинку профиля" id="pic">
          <Input
            type="file"
            p={1.5}
            accept="image/*"
            onChange={convertToBase64}
          />
          {pic == "" || pic == null ? (
            ""
          ) : (
            <img width={100} height={100} src={pic}></img>
          )}
        </Field>

        <Button
          size={"sm"}
          marginBottom={"2px"}
          onClick={submitHandler}
          colorScheme={"black"}
        >
          Зарегистрироваться
        </Button>
      </Fieldset.Content>
      <Toaster />
    </Fieldset.Root>
  );
};

export default SignUp;
