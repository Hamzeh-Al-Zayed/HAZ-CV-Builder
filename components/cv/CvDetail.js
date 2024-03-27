import { Fragment } from "react";
import CvCard from "../ui/CvCard";

import classes from "./CvDetail.module.css";

import ProjectSectionRender from "./cvDetail_components/ProjectSectionRender";
import EducationRender from "./cvDetail_components/EducationRender";
import Course_CertificatesRender from "./cvDetail_components/Course_CertificatesRender";
import JobHistoryRender from "./cvDetail_components/JobHistoryRender";
import ProdfileRender from "./cvDetail_components/ProdfileRender";
import ContactsRender from "./cvDetail_components/ContactsRender";

const CvDetail = (props) => {
  console.log(props.projects);

  return (
    <Fragment>
      <CvCard>
        <div className={classes.leftSection}>
          <ContactsRender profiles={props.profiles} contacts={props.contacts} />
        </div>

        <div className={classes.rightSection}>
          <ProdfileRender profiles={props.profiles} />
          <JobHistoryRender jobs={props.jobs} />
        </div>
      </CvCard>

      <CvCard>
        <div className={classes.leftSection}></div>
        <div className={classes.rightSection}>
          <Course_CertificatesRender
            courses_Certificates={props.courses_Certificates}
          />
          <EducationRender educations={props.educations} />
          <ProjectSectionRender projects={props.projects} />
        </div>
      </CvCard>
    </Fragment>
  );
};

export default CvDetail;
