import Link from "next/link";
import { Menu } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";

function Navigation() {
  const [current, setCurrent] = useState("");
  const router = useRouter();

  const handleMenuClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <Menu onClick={handleMenuClick} selectedKeys={[current]} mode="horizontal" className="flex items-center justify-center p-[3%]">
      <Menu.Item key="photos">
        <Link href="/photos">
          Photos
        </Link>
      </Menu.Item>
      <Menu.Item key="videos">
        <Link href="/videos">
          Videos
        </Link>
      </Menu.Item>
    </Menu>
  );
}

export default Navigation;
