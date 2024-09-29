import Mock from "mockjs";

let _username, _password;

export default function setupMocks() {
  // 模拟登录接口
  Mock.mock("/api/login", "post", (options) => {
    const { username, password } = JSON.parse(options.body);
    if (
      (username === "admin" && password === "123456") ||
      (username === _username && password === _password)
    ) {
      return {
        code: 200,
        message: "登录成功",
        data: {
          token: Mock.Random.guid(),
          username: "admin",
        },
      };
    } else {
      return {
        code: 401,
        message: "用户名或密码错误",
      };
    }
  });

  // 模拟注册接口
  Mock.mock("/api/register", "post", (options) => {
    const { username, password, email } = JSON.parse(options.body);

    if (username && password && email) {
      _username = username;
      _password = password;
      return {
        code: 200,
        message: "注册成功",
        data: {
          id: Mock.Random.id(),
          username,
          email,
        },
      };
    } else {
      return {
        code: 400,
        message: "注册信息不完整",
      };
    }
  });
}
