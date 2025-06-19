import Button from "@/components/Button"

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="grid grid-cols-2 gap-6 w-full max-w-md">
        <Button url="/interview" label="Interview Programmer" />
        <Button label="Coming Soon: Tech Quiz" disabled />
        <Button label="Coming Soon: Daily Challenge" disabled />
        <Button label="Coming Soon: CV Builder" disabled />
      </div>
    </main>
  );
}
