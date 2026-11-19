import Link from "next/link";

export function BrandLogo() {
  return (
    <Link
      href="/"
      aria-label="Biponon home"
      className="group flex shrink-0 items-center gap-2.5"
    >
      <span className="grid size-9 place-items-center rounded-xl bg-primary text-base font-bold text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
        b
      </span>
      <span className="font-heading text-xl font-bold tracking-tight text-foreground">
        biponon
      </span>
    </Link>
  );
}
