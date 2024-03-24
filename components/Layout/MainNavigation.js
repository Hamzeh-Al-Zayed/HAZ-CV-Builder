import classes from "./MainNavigation.module.css";
import Link from "next/link";
import Image from "next/image";

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <Image
        className={classes.image}
        src="/images/logo.png"
        alt="Logo"
        width={90}
        height={55}
      ></Image>

      <div className={classes.logo}>HAZ CV Builder</div>
      <nav>
        <ul>
          <li>
            <Link href="/">All CVs</Link>
          </li>
          <li>
            <Link href="/build-new-cv">Build New CV</Link>
          </li>
          <p> test</p>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
