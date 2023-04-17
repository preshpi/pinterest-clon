import { useRouter } from "next/router";
import Link from "next/link";

function Navigation() {
  const router = useRouter();

  // Define a function to determine if a link is active
  const isActive = (pathname) => {
    return router.pathname === pathname ? "bold border-b-2 border-blue-500" : "text-black";
  };

  return (
    <nav className="flex items-center justify-center p-[3%] m-[9%] lg:m-0 gap-5 text-xl">
      <Link href="/photos" className={isActive("/photos")}>
        Photos
      </Link>

      <Link href="/videos" className={isActive("/videos")}>
        Videos
      </Link>
    </nav>
  );
}

export default Navigation;
