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
import { MAIN_SERVICE_ROUTES } from "@/helpers/api";
import { mainClient } from "@/utils/clients";
import { toast } from "react-toastify";

export const AuthComponent = () => {
  const router = useRouter();

  const handleRegister = async (data: ICreateUser) => {
    try {
      const response = await mainClient.post(
        MAIN_SERVICE_ROUTES.createUser,
        data
      );
      if (response.status === 201) {
        toast.success("Usuário criado com sucesso", { position: "top-right" });
      } else {
        toast.error("Encontramos um erro ao criar o usuário", {
          position: "top-right",
        });
      }
    } catch {
      toast.error("Encontramos um erro ao criar o usuário", {
        position: "top-right",
      });
    }
  };

  const handleLogin = async (data: IUserLogin) => {
    try {
      const response = await mainClient.post(MAIN_SERVICE_ROUTES.login, data);
      if (response.status === 201) {
        localStorage.setItem("accessToken", response.data.accessToken);
        router.push("/editor");
      }
    } catch {
      toast.error("Usuário ou senha inválidos", {
        position: "top-right",
      });
    }
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
