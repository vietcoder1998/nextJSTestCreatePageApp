import Image from "next/image";
import styles from "./header.module.css";

interface HeaderItem {
  title: string;
  link?: string;
  open?: boolean;
  children?: HeaderItem[] | never[];
}

const headerList: HeaderItem[] = [
  { title: "Blogs" },
  { title: "Socials" },
  { title: "Past Socials" },
  { title: "Clubs", children: [] },
  { title: "Contact" },
];

export default function Header() {
  return (
    <div className={["grid", styles.header].join(" ")}>
      <div className="col4">
        <div className={styles.logoContainer}>
          <Image
            src="/images/logo-supper.svg"
            width={200}
            alt="logo"
            height={36}
          />
        </div>
      </div>
      <div className="col8">
        <div className={styles.headerMenu}>
          {headerList.map((headerItem) => (
            <a className={styles.menuItem} key={headerItem.title}>
              {headerItem.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
