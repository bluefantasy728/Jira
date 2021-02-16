import { useAuth } from "context/auth-context";
import React, { FormEvent, useState } from "react";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import { LongButton } from "unauthenticated-app";
import { useAsync } from "utils/use-async";
import { spawn } from "child_process";

const LoginScreen = ({ onError }: { onError: (error: Error) => void }) => {
  const { login } = useAuth();
  // isLoading在render里不会改变,还不知道怎么修复
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      //用try catch的话 因为login是异步的所以必须await

      await run(login(values));
    } catch (e) {
      onError(e);
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      {/* 这个name是antd用来推断给handleSubmit传的对象的属性名 */}
      <Form.Item
        name="username"
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder="用户名" type="text" id="username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder="密码" type="password" id="password" />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};

export default LoginScreen;
