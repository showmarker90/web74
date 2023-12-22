import React from "react";
import { Button, Input } from "antd";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorsMessage from "../../shared/components/ErrorMessages";
import axios from "axios";
import { toast } from "react-toastify";
import { extractMessageFromErr } from "../../shared/utils/error";
import { useNavigate } from "react-router-dom";
import { SAuth } from "../../shared/styles/main";
import { request } from "../../shared/utils/axios-http";
import useAuth from "../../hooks/useAuth";

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

const Register = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { register } = useAuth();

  const onSubmit = async (data) => {
    try {
      register(data);
    } catch (err) {
      toast.error(extractMessageFromErr(err));
    }
  };

  return (
    <SAuth>
      <h1>Register Form</h1>
      <div className="form-item">
        <span>Username</span>

        <Controller
          control={control}
          name="username"
          render={({ field }) => (
            <Input {...field} status={errors.username ? "error" : ""} />
          )}
        />
        {errors.username && <ErrorsMessage message={errors.username} />}
      </div>
      <div className="form-item">
        <span>Password</span>
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <Input
              {...field}
              status={errors.password ? "error" : ""}
              type="password"
            />
          )}
        />
        {errors.password && <ErrorsMessage message={errors.password} />}
      </div>
      <div className="form-item">
        <span>Confirm Password</span>
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <Input
              {...field}
              status={errors.confirmPassword ? "error" : ""}
              type="password"
            />
          )}
        />
        {errors.confirmPassword && (
          <ErrorsMessage message={errors.confirmPassword} />
        )}
      </div>
      <Button
        className="submit"
        type="primary"
        onClick={handleSubmit(onSubmit)}
        disabled={Object.keys(errors).length > 0}
      >
        Submit
      </Button>
    </SAuth>
  );
};

export default Register;
