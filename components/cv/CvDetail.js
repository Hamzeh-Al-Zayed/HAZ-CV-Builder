import { Fragment, useState } from "react";
import CvCard from "../ui/CvCard";
import classes from "./CvDetail.module.css";
import ProjectSectionRender from "./cvDetail_components/ProjectSectionRender";
import EducationRender from "./cvDetail_components/EducationRender";
import Course_CertificatesRender from "./cvDetail_components/Course_CertificatesRender";
import JobHistoryRender from "./cvDetail_components/JobHistoryRender";
import ProdfileRender from "./cvDetail_components/ProdfileRender";
import ContactsRender from "./cvDetail_components/ContactsRender";
import TechnicalProfileRender from "./cvDetail_components/TechnicalProfileRender";
import CompetenciesRender from "./cvDetail_components/CompetenciesRender";
import LanguagesRender from "./cvDetail_components/LanguagesRender";
import InterestsRender from "./cvDetail_components/InterestsRender";
import ConfirmDeletePopup from "../ui/ConfirmDeletePopup";
import Backdrop from "../ui/Backdrop";
import { useRouter } from "next/router";

import ActivitiesRender from "./cvDetail_components/ActivitiesRender";

const CvDetail = (props) => {
  const router = useRouter();
  const editCvHandler = () => {
    router.push(`/edit-cv/${props.cvId}`);
  };

  const printHandler = () => {
    window.print();
  };

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const showDeleteConfirmationHandler = () => {
    setShowDeleteConfirmation(true);
  };

  const hideDeleteConfirmationHandler = () => {
    setShowDeleteConfirmation(false);
  };

  return (
    <Fragment>
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }

          .print-component,
          .print-component * {
            visibility: visible;
          }

          .print-component {
            position: absolute;
            left: 0;
            top: 0;
            transform-origin: top left; /* Ensures scaling happens from the top left corner */
            transform: scale(1.3); /* Slightly scale up the content */
            width: 100vw;
            height: 100vh;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          .print-component1 {
            top: 0;
          }

          .print-component2 {
            top: 100vh; /* Position it below the height of the first page */
          }
        }
      `}</style>

      <div className={classes.actions}>
        <button onClick={showDeleteConfirmationHandler}>Delete</button>
        <button onClick={editCvHandler}>Edit CV</button>
        <button onClick={printHandler}>Download as PDF</button>

        {/* <WordDownloader profiles={props.profiles}></WordDownloader> */}
      </div>

      {showDeleteConfirmation && (
        <ConfirmDeletePopup
          cvId={props.cvId}
          onClick={hideDeleteConfirmationHandler}
        />
      )}
      {showDeleteConfirmation && (
        <Backdrop onClick={hideDeleteConfirmationHandler} />
      )}

      <CvCard className="print-component print-component1">
        <div className={classes.leftSection}>
          <ContactsRender profiles={props.profiles} contacts={props.contacts} />
          <TechnicalProfileRender technicalSkills={props.technicalSkills} />
          <CompetenciesRender competencies={props.competencies} />
        </div>

        <div className={classes.rightSection}>
          <ProdfileRender profiles={props.profiles} />
          <JobHistoryRender jobs={props.jobs} />
        </div>
      </CvCard>

      <CvCard className="print-component print-component2">
        <div className={classes.leftSection}>
          <LanguagesRender languages={props.languages} />
          <InterestsRender interests={props.interests} />
        </div>
        <div className={classes.rightSection}>
          <Course_CertificatesRender
            courses_Certificates={props.courses_Certificates}
          />
          <EducationRender educations={props.educations} />
          <ProjectSectionRender projects={props.projects} />
          <ActivitiesRender activities={props.activities} />
        </div>
      </CvCard>
    </Fragment>
  );
};

export default CvDetail;
