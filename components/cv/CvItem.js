import Card from "../ui/Card";
import { useRouter } from "next/router";
import classes from "./CvItem.module.css";

const CvItem = (props) => {
  const router = useRouter();

  const showDetialHandler = () => {
    router.push("/" + props.id);
  };

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.content}>
          {/* <Image
            className={classes.image}
            src={props.image}
            alt="The Clint image"
            width={50}
            height={50}
            unoptimized={true}
            priority
          ></Image> */}
          <img className={classes.image} src={props.image}></img>
          <div className={classes.text}>
            <h2>{props.name}</h2>
            <h3>{props.job_title}</h3>
            <p>{props.email}</p>
          </div>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetialHandler}>Show CV</button>
        </div>
      </Card>
    </li>
  );
};

export default CvItem;
