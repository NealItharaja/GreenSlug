export default function Button({ children }: { children: React.ReactNode }) {
  return (
    <button className="
      bg-slug-primary
      text-white
      px-6 py-3
      rounded-xl
      font-medium
      shadow-md
      hover:bg-slug-dark
      hover:shadow-lg
      transition
    ">
      {children}
    </button>
  );
}
