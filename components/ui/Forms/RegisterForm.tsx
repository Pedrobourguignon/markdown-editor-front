"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ICreateUser } from "@/types/ICreateUser";
import { registerSchema } from "@/utils/Validations/Schemas/registerSchema";
import { Label } from "../Label";
import { Input } from "../Input";
import { PrimaryButton } from "../Buttons/PrimaryButton";

interface RegisterFormProps {
  onSubmit: (data: ICreateUser) => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateUser>({
    resolver: zodResolver(registerSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="register-name">Name</Label>
          <Input
            id="register-name"
            type="text"
            placeholder="Your name"
            {...register("name")}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">
              {errors.name.message?.toString()}
            </span>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="register-email">Email</Label>
          <Input
            id="register-email"
            type="email"
            placeholder="youremail@example.com"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">
              {errors.email.message?.toString()}
            </span>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="register-password">Password</Label>
          <Input
            id="register-password"
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
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input
            id="confirm-password"
            type="password"
            placeholder="••••••••"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm">
              {errors.confirmPassword.message?.toString()}
            </span>
          )}
        </div>
      </div>
      <PrimaryButton className="w-full mt-6" type="submit">
        Register
      </PrimaryButton>
    </form>
  );
};
