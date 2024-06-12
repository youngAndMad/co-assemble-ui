import Modal from "@/components/ui/Modal";
import Spinner from "@/components/ui/Spinner";
import apiClient from "@/libs/axios";
import { RegisterData } from "@/models/types/auth";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>();

  const [successfullyRegistered, setSuccessfullyRegistered] =
    useState<boolean>(false);

  const registrationMutation = useMutation<void, Error, RegisterData>({
    mutationFn: async (registerData: RegisterData) => {
      await apiClient.post("/api/v1/auth/register", registerData);
    },
    mutationKey: ["register"],
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      setSuccessfullyRegistered(true);
    },
  });

  const onSubmit: SubmitHandler<RegisterData> = (data) =>
    registrationMutation.mutate(data);

  return registrationMutation.isPending ? (
    <Spinner />
  ) : (
    <div className="user_forms-signup">
      <h2 className="forms_title">Register</h2>
      <form className="forms_form" onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="forms_fieldset">
          <div className="forms_field">
            <input
              type="text"
              placeholder="Username"
              className="forms_field-input"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && <p>{errors.username.message}</p>}
          </div>
          <div className="forms_field">
            <input
              type="email"
              placeholder="Email"
              className="forms_field-input"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div className="forms_field">
            <input
              type="password"
              placeholder="Password"
              className="forms_field-input"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
        </fieldset>
        <div className="forms_buttons">
          <input
            type="submit"
            value="Register"
            className="forms_buttons-action"
          />
        </div>
      </form>
      {successfullyRegistered && (
        <Modal
          title="Thanks for registration"
          body={
            <div>
              <h2>Registration Successfully completed</h2>
              <p>
                Thank you for registering. Please check your email to verify
                your account.
              </p>
            </div>
          }
          displayButtons={false}
        />
      )}
    </div>
  );
}
