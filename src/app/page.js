"use client";

import { Button } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const toLogin = () => {
    router.replace("/login");
  };
  useEffect(() => {
    toLogin();
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Button onClick={toLogin}>让我们去登录页吧。。。</Button>
    </div>
  );
}
