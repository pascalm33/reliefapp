import CheckinForm from "@/components/CheckinForm";

export default function CheckinPage() {
  return (
    <section className="space-y-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-leaf">Check-in rapide</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-normal text-ink">Comment vont tes signaux aujourd’hui ?</h1>
      </div>
      <CheckinForm />
    </section>
  );
}
