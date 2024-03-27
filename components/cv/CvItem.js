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
        {props.profiles &&
          props.profiles.map((profile, index) => (
            <div key={index} className={classes.content}>
              <img className={classes.image} src={profile.image}></img>
              <div className={classes.text}>
                <h2>{profile.name}</h2>
                <h3>{profile.job_title}</h3>
                <p>{profile.email}</p>
              </div>
            </div>
          ))}
        <div className={classes.actions}>
          <button onClick={showDetialHandler}>Show CV</button>
        </div>
      </Card>
    </li>
  );
};

export default CvItem;
