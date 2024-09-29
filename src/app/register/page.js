"use client";

import { Form, Input, Button, message, Progress } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

export default function Register() {
  const router = useRouter();
  const [passwordStrength, setPasswordStrength] = useState(0);

  const onFinish = async (values) => {
    try {
      const { data } = await axios.post("/api/register", values);
      if (data.code === 200) {
        message.success("注册成功");
        router.push("/login");
      } else {
        message.error(data.message);
      }
    } catch (error) {
      message.error("注册失败,请重试");
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return Math.min(100, strength);
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    const strength = calculatePasswordStrength(password);
    setPasswordStrength(strength);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center">注册</h2>
        <Form name="register" onFinish={onFinish} className="space-y-4">
          <Form.Item
            name="username"
            rules={[{ required: true, message: "请输入用户名" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="用户名" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "请输入有效的邮箱地址",
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="邮箱" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码"
              onChange={handlePasswordChange}
            />
          </Form.Item>
          <div className="mb-4">
            <Progress
              percent={passwordStrength}
              status={passwordStrength < 60 ? "exception" : "success"}
              showInfo={false}
            />
            <span className="text-sm text-gray-500">
              密码强度：
              {passwordStrength < 30
                ? "弱"
                : passwordStrength < 60
                ? "中"
                : "强"}
            </span>
          </div>
          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "请确认密码" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("两次输入的密码不一致");
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="确认密码" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              注册
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
