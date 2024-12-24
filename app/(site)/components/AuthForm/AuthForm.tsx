"use client";
import axios from "axios";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input/input";
import React, { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import AuthSocialButton from "./AuthSocialButton";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Variant = "LOGIN" | "SIGNUP";

const AuthForm = () => {
  const session =  useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if(session?.status === "authenticated"){
      router.push("/users");
    }
  }, [session?.status])

  const toggleVariant = useCallback(() => {
    if (variant == "LOGIN") {
      setVariant("SIGNUP");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    if (variant === "LOGIN") {
      //LOGIN
      signIn("credentials", { ...data, redirect: false })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials");
          }
          if (callback?.ok && !callback?.error) {
            toast.success("Logged in successfully");
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    if (variant === "SIGNUP") {
      axios
        .post("/api/signup", data)
        .then((response) => {
          toast.success("Account created successfully");
          signIn("credentials", data); 
        })
        .catch((error) => {
          toast.error(error.response.data || "Something went wrong");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const socialAuthAction = (action: string) => {
    setIsLoading(true);
    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Something went wrong with your social login");
        }
        if (callback?.ok && !callback?.error) {
          toast.success("Logged in successfully");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white opacity-80 px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "SIGNUP" && (
            <Input
              id="name"
              label="Name"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
          )}
          <Input
            id="email"
            label="Email"
            type="email"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <div>
            <Button fullWidth disabled={isLoading} type="submit">
              {variant === "LOGIN" ? "Log In" : "Sign In"}
            </Button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-8 flex item-center">
              <div className="w-full border-t border-gray-400"></div>
            </div>
            <div className="relative flex justify-center text-sm mt-5">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          <div className="mt-6 flex gap-2 justify-center">
            <AuthSocialButton
              icon={FcGoogle}
              onClick={() => socialAuthAction("google")}
            />
          </div>
        </div>
      </div>
      <div className="flex gap-2 justify-center text-sm mt-6 text-gray-500">
        <div>
          {variant === "LOGIN"
            ? "New to Chatterbox Connect?"
            : "Already have an account?"}
        </div>
        <div
          onClick={toggleVariant}
          className="underline text-orange-500 hover:text-orange-600 cursor-pointer"
        >
          {variant === "LOGIN" ? "Create an Account" : "Login"}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
