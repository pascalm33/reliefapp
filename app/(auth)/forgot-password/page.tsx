import AuthForm from "@/components/AuthForm";
import ForgotPasswordForm from "@/components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <AuthForm title="Mot de passe oublié" subtitle="Reçois un lien sécurisé pour réinitialiser ton accès Relief.">
      <ForgotPasswordForm />
    </AuthForm>
  );
}
