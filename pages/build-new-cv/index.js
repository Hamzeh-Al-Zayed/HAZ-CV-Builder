import { useRouter } from "next/router";

import NewCvForm from "@/components/cv/NewCvForm";

const NewCv = (props) => {
  const router = useRouter();

  const addCvHandler = async (enteredCvData) => {
    try {
      const response = await fetch(
        "https://react-custom-hooks-31d19-default-rtdb.asia-southeast1.firebasedatabase.app/cvs.json",
        {
          method: "POST",
          body: JSON.stringify(enteredCvData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("POST response was not ok ");
      }
      const data = await response.json();

      router.push("/");
    } catch (error) {
      throw new Error("Something went wrong in POST");
    }
  };

  return <NewCvForm onSubmitCv={addCvHandler}></NewCvForm>;
};

export default NewCv;
