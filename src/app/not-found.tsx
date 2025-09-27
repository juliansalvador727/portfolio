import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl">
      <h1>404 - page not found</h1>
      <p>
        <Link href="/" className="border-b-2">
          homepage
        </Link>
      </p>
    </div>
  );
}
