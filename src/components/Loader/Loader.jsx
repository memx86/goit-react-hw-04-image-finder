import { ThreeDots } from "react-loader-spinner";
import s from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={s.loader}>
      <ThreeDots color="#0066cc" height={80} width={80} />
    </div>
  );
}
