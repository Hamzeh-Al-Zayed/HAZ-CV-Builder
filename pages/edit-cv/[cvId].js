// pages/edit-cv/[cvId].js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NewCvForm from "@/components/cv/NewCvForm";

const EditCvPage = () => {
  const router = useRouter();
  const { cvId } = router.query; // Accessing the dynamic part of the URL

  // State to hold the fetched CV data
  const [cvData, setCvData] = useState(null);

  // Placeholder for the form (we will replace this with the actual form later)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCvData = async () => {
      if (!cvId) return; // Ensure cvId is not undefined

      try {
        setIsLoading(true);
        const response = await fetch(
          `https://react-custom-hooks-31d19-default-rtdb.asia-southeast1.firebasedatabase.app/cvs/${cvId}.json`
        );
        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        setCvData(data); // Set the fetched data into state
        setIsLoading(false);
        console.log("edit", data);
      } catch (error) {
        console.error(error.message);
        setIsLoading(false);
      }
    };

    fetchCvData();
  }, [cvId]);

  const updateCvHandler = async (updatedCvData) => {
    try {
      const response = await fetch(
        `https://react-custom-hooks-31d19-default-rtdb.asia-southeast1.firebasedatabase.app/cvs/${cvId}.json`,
        {
          method: "PATCH", // Use PATCH to update the data
          body: JSON.stringify(updatedCvData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to update CV");

      // Redirect or show a success message after successful update
      // For example, redirect to the CV detail page or to the home page
      router.push("/"); // Adjust the URL to your needs
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1 style={{ color: "#001a8b", fontSize: "36px" }}>Edit CV</h1>
      <NewCvForm initialCvData={cvData} onSubmitCv={updateCvHandler} />
    </div>
  );
};

export default EditCvPage;
