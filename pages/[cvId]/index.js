import CvDetail from "@/components/cv/CvDetail";
import { useEffect } from "react";

const CvDetails = (props) => {
  return (
    <CvDetail
      image={props.data.image}
      name={props.data.name}
      job_title={props.data.job_title}
      selfSummary={props.data.selfSummary}
      email={props.data.email}
      birthday={props.data.birthday}
      contacts={props.data.contacts}
      jobs={props.data.jobs}
      courses_Certificates={props.data.courses_Certificates}
      educations={props.data.educations}
      projects={props.data.projects}
    />
  );
};

export async function getStaticPaths() {
  const response = await fetch(
    "https://react-custom-hooks-31d19-default-rtdb.asia-southeast1.firebasedatabase.app/cvs.json"
  );
  if (!response.ok) {
    throw new Error("Get Network was not ok ");
  }

  const data = await response.json();
  console.log(".....................................................");
  console.log(data);

  const loadedCvs = [];

  for (const key in data) {
    loadedCvs.push({
      id: key,
      name: data[key].name,
      image: data[key].image,
      email: data[key].email,
      job_title: data[key].job_title,
      selfSummary: data[key].selfSummary,
      birthday: data[key].birthday,

      contacts: data[key].contacts,

      jobs: data[key].jobs,
      courses_Certificates: data[key].courses_Certificates,
      educations: data[key].educations,
      projects: data[key].projects,
    });
  }

  return {
    fallback: "blocking",
    paths: loadedCvs.map((cv) => ({
      params: { cvId: cv.id.toString() },
    })),
  };
}

// useEffect(() => {
//   getStaticProps;
// }, [getStaticProps]);

export async function getStaticProps(context) {
  const cvId = context.params.cvId;

  const response = await fetch(
    "https://react-custom-hooks-31d19-default-rtdb.asia-southeast1.firebasedatabase.app/cvs.json"
  );

  const data = await response.json();

  const cvDetails = await data[cvId];

  if (!cvDetails) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: {
        id: cvId.toString(),
        ...cvDetails,
      },
    },
    revalidate: 1,
  };
}

export default CvDetails;
