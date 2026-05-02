import { Suspense } from "react";
import AuthForm from "@/components/AuthForm";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <AuthForm title="Connexion" subtitle="Retrouve tes signaux Relief et continue ton suivi personnel.">
      <Suspense>
        <LoginForm />
      </Suspense>
    </AuthForm>
  );
}
