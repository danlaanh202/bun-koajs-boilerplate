import { data as users } from "./users.json";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

function saveUsers(data: any) {
  fs.writeFileSync(
    path.join(__dirname, "/users.json"),
    JSON.stringify({
      data,
    })
  );
}

export async function login({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const user = users.find((item) => item.username === username);
  if (!user) {
    throw new Error("Not found");
  }
  if (user.password !== password) {
    throw new Error("Wrong password");
  }
  const accessToken = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "2 days",
    }
  );
  const refreshToken = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "10 days",
    }
  );
  const savedUser = { ...user, refreshToken };
  saveUsers(users.map((item) => (item.id === user.id ? savedUser : item)));
  return { ...savedUser, accessToken };
}

export async function refreshAccessToken(userId: string) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "2 days",
  });
  return token;
}

export async function getUsers() {
  return users;
}
