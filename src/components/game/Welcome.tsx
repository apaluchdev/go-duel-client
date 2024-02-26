import { FetchUserIdCookie } from "../../helper/cookie-helper";
import "./Welcome.css";
import Button from "react-bootstrap/Button";

function Welcome(props: any) {
  async function SetCookie() {
    props.setCookie(await FetchUserIdCookie());
  }

  return (
    <div className="Welcome">
      <h1>Welcome to Go Duel</h1>
      <Button onClick={SetCookie} variant="outline-light" size="lg">
        Continue as Guest
      </Button>
    </div>
  );
}

export default Welcome;
