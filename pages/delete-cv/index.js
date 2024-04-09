import { useRouter } from "next/router";

const DeleteCv = (props) => {
  const router = useRouter();
  console.log("delete", props.cvId);
  const deleteCvHandler = async () => {
    try {
      await fetch(
        `https://react-custom-hooks-31d19-default-rtdb.asia-southeast1.firebasedatabase.app/cvs/${props.cvId}.json`,
        { method: "DELETE" }
      );
      console.log("CV deleted successfully");
      router.push("/");
    } catch {
      console.error("Error in Delete");
    }
  };

  return <button onClick={deleteCvHandler}>Confirm!</button>;
};

export default DeleteCv;
