import AuthForm from "@/components/AuthForm";
import RegisterForm from "@/components/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthForm title="Créer ton compte" subtitle="Tes check-ins seront liés à ton compte et isolés par utilisateur.">
      <RegisterForm />
    </AuthForm>
  );
}
