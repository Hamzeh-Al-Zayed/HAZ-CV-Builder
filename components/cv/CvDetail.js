import { Fragment, useState, useRef } from "react";
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
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const CvDetail = (props) => {
  const firstCardRef = useRef(null);
  const secondCardRef = useRef(null);
  const router = useRouter();
  const editCvHandler = () => {
    router.push(`/edit-cv/${props.cvId}`);
  };

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const showDeleteConfirmationHandler = () => {
    setShowDeleteConfirmation(true);
  };

  const hideDeleteConfirmationHandler = () => {
    setShowDeleteConfirmation(false);
  };

  const downloadPDF = async () => {
    console.log("Starting PDF generation...");
    const doc = new jsPDF();

    // Delay to ensure all elements are rendered
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 1000 ms delay

    const cardElements = document.querySelectorAll("cvCardClass");
    console.log(`Found ${cardElements.length} elements`);

    for (let i = 0; i < cardElements.length; i++) {
      if (!cardElements[i]) {
        console.log(`Element ${i} is not rendered or accessible.`);
        continue;
      }

      if (i > 0) doc.addPage();

      await html2canvas(cardElements[i], { scale: 2, useCORS: true }).then(
        (canvas) => {
          const imgData = canvas.toDataURL("image/png");
          doc.addImage(imgData, "PNG", 0, 0, 210, 297);
        }
      );
    }

    doc.save("CV.pdf");
    console.log("PDF saved successfully.");
  };

  return (
    <Fragment>
      <div className={classes.actions}>
        <button onClick={showDeleteConfirmationHandler}>Delete</button>
        <button onClick={editCvHandler}>Edit CV</button>
        <button onClick={downloadPDF}>Download as PDF</button>
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

      <CvCard className="cvCardClass">
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

      <CvCard className="cvCardClass">
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
        </div>
      </CvCard>
    </Fragment>
  );
};

export default CvDetail;
