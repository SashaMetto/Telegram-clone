import React from "react";
import { useState } from "react";
import { Container, Box, Text, Link, Tabs } from "@chakra-ui/react";
import Login from "../myComponents/Authentication/Login";
import SignUp from "../myComponents/Authentication/SignUp";

const Homepage = () => {
  const [value, setValue] = useState("first");
  return (
    <Container maxW="xl" centerContent>
      <Box
        display={"flex"}
        justifyContent="center"
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize={"4xl"} fontFamily="Work sans" color={"black"}>
          Чат
        </Text>
      </Box>
      <Box bg="black" w="100%" p={4} borderRadius={"lg"} borderWidth="1px">
        <Tabs.Root value={value} onValueChange={(e) => setValue(e.value)}>
          <Tabs.List>
            <Tabs.Trigger value="first" width="50%">
              Вход
            </Tabs.Trigger>
            <Tabs.Trigger value="second" width="50%">
              Регистрация
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="first">
            <Login />
          </Tabs.Content>
          <Tabs.Content value="second">
            <SignUp />
          </Tabs.Content>
        </Tabs.Root>
      </Box>
    </Container>
  );
};

export default Homepage;
