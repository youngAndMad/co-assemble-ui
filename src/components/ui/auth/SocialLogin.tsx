import Image from "next/image";
import "./SocialLogin.css";

export default function SocialLogin() {
  return (
    <div className="social-login">
      <a
        className="btn btn-block social-btn"
        href={`http://localhost:8080/oauth2/authorization/github`}
      >
        <Image
          src="/images/logo/github.png"
          alt="Github Logo"
          width={20}
          height={24}
        />
        Sign up with Github
      </a>
    </div>
  );
}
