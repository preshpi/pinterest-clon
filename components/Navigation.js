import { useRouter } from "next/router";
import Link from "next/link";

function Navigation() {
  const router = useRouter();
  const isActive = (pathname) => {
    return router.pathname === pathname
      ? "bold border-b-2 border-blue-500"
      : "text-black";
  };

  return (
    <nav className="flex items-center justify-center mt-40 gap-5 text-xl">
      <Link href="/" className={isActive("/")}>
        Photos
      </Link>

      <Link href="/videos" className={isActive("/videos")}>
        Videos
      </Link>
    </nav>
  );
}

export default Navigation;
