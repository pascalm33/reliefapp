# OWASP Checklist

| OWASP Top 10 | Statut | Preuve dans le code | Recommandation | Priorité |
|---|---|---|---|---|
| Broken Access Control | À vérifier | `proxy.ts`, `lib/auth.ts`, RLS SQL | Tester RLS et accès inter-user en CI. | P1 |
| Cryptographic Failures | OK | Secrets non stockés, Supabase Auth | Vérifier TLS/HSTS en prod. | P2 |
| Injection | Risque | Pas de concat SQL, mais pas de validation runtime | Ajouter Zod sur inputs check-in/action/profile. | P1 |
| Insecure Design | À vérifier | Pas de threat model formalisé | Ajouter threat model léger auth/data isolation. | P2 |
| Security Misconfiguration | Risque | CSP ajoutée, Supabase env requis | Durcir CSP prod, vérifier redirects OAuth. | P2 |
| Vulnerable and Outdated Components | Risque | `npm audit` signale advisories | Surveiller et patcher régulièrement. | P1 |
| Identification and Authentication Failures | À vérifier | Supabase Auth, forgot password, OAuth | Tester reset password/OAuth en env staging. | P2 |
| Software and Data Integrity Failures | À vérifier | Pas de signature artefacts, CI minimale ajoutée | Ajouter lockfile enforcement et branch protection. | P2 |
| Security Logging and Monitoring Failures | Risque | Pas de monitoring configuré | Ajouter logs structurés et alerting auth failures. | P3 |
| Server-Side Request Forgery | Non applicable | Pas de fetch serveur avec URL utilisateur détecté | Maintenir règle de blocage si URLs utilisateur ajoutées. | P3 |

## ASVS léger

- AuthN : À vérifier en staging avec vrais providers.
- AuthZ : RLS présente, tests manquants.
- Input validation : À renforcer.
- Output encoding : React encode par défaut.
- Session : Supabase SSR cookies utilisés.
- Error handling : messages utilisateur sobres, logs à structurer.
