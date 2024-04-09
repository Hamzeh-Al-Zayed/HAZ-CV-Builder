import CvDetail from "@/components/cv/CvDetail";
import CvItem from "@/components/cv/CvItem";
import { Fragment } from "react";

const CvDetails = (props) => {
  return (
    <Fragment>
      <CvDetail
        cvId={props.data.id}
        profiles={props.data.profiles}
        contacts={props.data.contacts}
        jobs={props.data.jobs}
        courses_Certificates={props.data.courses_Certificates}
        educations={props.data.educations}
        technicalSkills={props.data.technicalSkills}
        projects={props.data.projects}
        competencies={props.data.competencies}
        languages={props.data.languages}
        interests={props.data.interests}
      />
    </Fragment>
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
      profiles: data[key].profiles,
      contacts: data[key].contacts,
      jobs: data[key].jobs,
      courses_Certificates: data[key].courses_Certificates,
      educations: data[key].educations,
      projects: data[key].projects,
      technicalSkills: data[key].technicalSkills,
      competencies: data[key].competencies,
      languages: data[key].languages,
      interests: data[key].interests,
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
