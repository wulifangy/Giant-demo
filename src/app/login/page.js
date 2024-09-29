"use client";

import { Form, Input, Button, message, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Login() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const savedCredentials = localStorage.getItem("loginCredentials");
    if (savedCredentials) {
      const { username, password } = JSON.parse(savedCredentials);
      form.setFieldsValue({ username, password });
      setRememberMe(true);
    }
  }, [form]);

  const onFinish = async (values) => {
    try {
      const { data } = await axios.post("/api/login", values);
      if (data.code === 200) {
        message.success("登录成功");
        if (rememberMe) {
          localStorage.setItem(
            "loginCredentials",
            JSON.stringify({
              username: values.username,
              password: values.password,
            })
          );
        } else {
          localStorage.removeItem("loginCredentials");
        }
        localStorage.setItem("isLoggedIn", "true");
        router.push("/dashboard");
      } else {
        message.error(data.message);
      }
    } catch (error) {
      message.error("登录失败,请重试");
    }
  };

  const toRegister = () => {
    router.push("/register");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center">登录</h2>
        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          className="space-y-4"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "请输入用户名" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码"
              rules={[
                { required: true, message: "请输入密码" },
                {
                  validator: (_, value) => {
                    if (
                      value &&
                      value.length >= 8 &&
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                        value
                      )
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      "密码必须至少包含8个字符，包括大小写字母、数字和特殊字符"
                    );
                  },
                },
              ]}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              登录
            </Button>
          </Form.Item>
          <div className="text-gray-500 flex justify-between">
            <Checkbox
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            >
              记住我
            </Checkbox>
            <a onClick={toRegister}>注册</a>
          </div>
        </Form>
      </div>
    </div>
  );
}
