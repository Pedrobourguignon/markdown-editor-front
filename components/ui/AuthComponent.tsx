"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs";
import { IUserLogin } from "@/types/IUserLogin";
import { ICreateUser } from "@/types/ICreateUser";
import { LoginForm } from "./Forms/LoginForm";
import { RegisterForm } from "./Forms/RegisterForm";
import { useRouter } from "next/navigation";

export const AuthComponent = () => {
  const router = useRouter();

  const handleRegister = (data: ICreateUser) => {
    console.log("Register form data:", data);
  };

  const handleLogin = (data: IUserLogin) => {
    console.log("Login form data:", data);
    router.push("/editor");
  };

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome to Markdown Editor</CardTitle>
          <CardDescription>
            Create an account or login to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm onSubmit={handleLogin} />
            </TabsContent>
            <TabsContent value="register">
              <RegisterForm onSubmit={handleRegister} />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};
