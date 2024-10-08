"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IUserLogin } from "@/types/IUserLogin";
import { loginSchema } from "@/utils/Validations/Schemas/loginSchema";
import { Label } from "../Label";
import { Input } from "../Input";
import { PrimaryButton } from "../Buttons/PrimaryButton";

interface LoginFormProps {
  onSubmit: (data: IUserLogin) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserLogin>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">
              {errors.email.message?.toString()}
            </span>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            {...register("password")}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message?.toString()}
            </span>
          )}
        </div>
      </div>
      <PrimaryButton className="w-full mt-6" type="submit">
        Login
      </PrimaryButton>
    </form>
  );
};
