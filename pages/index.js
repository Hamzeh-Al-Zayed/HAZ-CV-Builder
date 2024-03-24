// our-domain.com/
import CvList from "@/components/cv/CvList";
import { Fragment } from "react";
import Head from "next/head";

// const DUMMY_Profile = [
//   {
//     id: "m1",
//     name: "Jonna Hill",
//     image: "/images/man1.jpg",
//     job_title: "UI UX Designer",
//     email: "JonnaHill@gmail.com",
//   },
//   {
//     id: "m2",
//     name: "Mark Keal",
//     image: "/images/man2.jpg",
//     job_title: "Home Designer",
//     email: "MarkKeal@gmail.com",
//   },
//   {
//     id: "m3",
//     name: "Jake Paul",
//     image: "/images/man3.jpg",
//     job_title: "Youtuber",
//     email: "JakePaul@gmail.com",
//   },
// ];
const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>HAZ CV Builder</title>
        <meta name="description" content="Create your own CV"></meta>
      </Head>
      <CvList cvs={props.cvs} />
    </Fragment>
  );
};

export async function getStaticProps() {
  const response = await fetch(
    "https://react-custom-hooks-31d19-default-rtdb.asia-southeast1.firebasedatabase.app/cvs.json"
  );
  if (!response.ok) {
    throw new Error("Get Network reponse was not ok");
  }
  const data = await response.json();

  const loadedCvs = [];

  for (const key in data) {
    loadedCvs.push({
      id: key,
      name: data[key].name,
      image: data[key].image,
      email: data[key].email,
      job_title: data[key].job_title,
    });
  }

  return {
    props: {
      cvs: loadedCvs,
    },
    revalidate: 1,
  };
}

export default HomePage;
