import yayJpg from "../assets/yay.jpg";
import { history } from "umi";

export default function HomePage() {
  return (
    <div>
      <h2>Yay! Welcome to umi!</h2>
      {/* <p>
        <img src={yayJpg} width="388" />
      </p> */}
      <p>
        To get started, edit <code>pages/index.tsx</code> and save to reload.
      </p>
      <button
        onClick={() => {
          history.push("/good-manage/good-quantity");
        }}
      >
        跳转到user页面
      </button>
    </div>
  );
}
