import { Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import classes from "styles/pages/SignUp.module.scss";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import YupPassword from "yup-password";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "fb";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
YupPassword(yup); // extend yup

type FormData = {
  email: string;
  password: string;
};

const schema = yup
  .object({
    email: yup
      .string()
      .required("必須項目です")
      .email("正しいメールアドレスを入力してください"),
    password: yup
      .string()
      .required("必須項目です")
      .min(8, "8文字以上で入力してください")
      .max(100, "100文字以下で入力してください")
      .minLowercase(1, "小文字を含むパスワードを入力してください")
      .minUppercase(1, "大文字を含むパスワードを入力してください"),
  })
  .required();

export const SignUp = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: FormData) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("🚀 ~ file: SignUp.tsx ~ line 45 ~ .then ~ user", user);
        navigate("/");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setServerError("このメールアドレスは既に使用されています");
        }
      });
  };

  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          type="email"
          {...register("email")}
          label="メールアドレス"
          error={"email" in errors}
          helperText={errors.email?.message}
        />
        <TextField
          type="password"
          {...register("password")}
          label="パスワード"
          error={"password" in errors}
          helperText={errors.password?.message}
        />
        <Button type="submit" variant="contained">
          新規登録
        </Button>
        {serverError && (
          <Typography variant="body1" color="error">
            {serverError}
          </Typography>
        )}
      </form>
    </div>
  );
};
