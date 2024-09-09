import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import { Toaster, toast } from "react-hot-toast";
import Captcha from "../common/Captcha";

const Form = ({ setModalIsOpen, setModalIsOpenError, setErrorMessage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captchaVerfied, setCaptchaVerified] = useState(false);
  const [change, setChange] = useState(false);

  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  const router = useRouter();

  const submitHandler = (event) => {
    event.preventDefault();
    if (!isCaptchaVerified) {
      toast.error("Please verify the captcha !!", {
        // position: toast.POSITION.BOTTOM_LEFT,
        className: "toast-loading-message",
      });
      setChange(true);
    } else if (!username || !password) {
      setErrorMessage("Credentials Can't be empty");
      setModalIsOpenError(true);
      toast.error("Please fill the credentials!", {
        // position: toast.POSITION.BOTTOM_LEFT,
        className: "toast-loading-message",
      });
    } else {
      const payload = {
        username: username,
        password: password,
      };

      toast.loading("Logging!!!", {
        // position: toast.POSITION.BOTTOM_LEFT,
        className: "toast-loading-message",
      });
      axios
        .post("/api/login", payload)
        .then((res) => {
          toast.dismiss();
          console.log(res.data.userData.result);

          localStorage.setItem(
            "userInfo",
            JSON.stringify(res.data.userData.result)
          );
          toast.success("Successfully logged in!", {
            // position: toast.POSITION.BOTTOM_LEFT,
            className: "toast-loading-message",
          });
          router.push("/my-dashboard");
        })
        .catch((err) => {
          toast.dismiss();
          setErrorMessage(err.response.data.error);
          setModalIsOpenError(true);
          toast.error("Try Again!!", {
            // position: toast.POSITION.BOTTOM_LEFT,
            className: "toast-loading-message",
          });
        });
    }
  };

  return (
    <>
      <Toaster />
      <form action="#">
        <div className="heading text-center">
          <h3>Login to your account</h3>
          {/* <p className="text-center">
          Dont have an account?{" "}
          <Link href="/register" className="text-thm">
            Sign Up!
          </Link>
        </p> */}
        </div>
        {/* End .heading */}

        <div className="input-group mb-2 mr-sm-2">
          <input
            type="text"
            className="form-control"
            required
            placeholder="User Name Or Email"
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="flaticon-user"></i>
            </div>
          </div>
        </div>
        {/* End .input-group */}

        <div className="input-group form-group">
          <input
            type="password"
            className="form-control"
            required
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="flaticon-password"></i>
            </div>
          </div>
        </div>
        {/* End .input-group */}

        <div className="">
          <Captcha
            change={change}
            setChange={setChange}
            setIsCaptchaVerified={setIsCaptchaVerified}
          />
        </div>

        <div className="form-group form-check custom-checkbox mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="remeberMe"
          />
          <label
            className="form-check-label form-check-label"
            htmlFor="remeberMe"
          >
            Remember me
          </label>

          {/* <a className="btn-fpswd float-end" href="#">
          Forgot password?
        </a> */}
        </div>
        {/* End .form-group */}

        <button
          type="submit"
          className="btn btn-log w-100 btn-thm"
          onClick={(e) => submitHandler(e)}
        >
          Log In
        </button>
        {/* login button */}

         <div className="text-center text-dark">
          <span>
            <Link href="/privacy-policy">
              Privacy Policy
            </Link>
          </span>
        </div>

        {/* <div className="divide">
        <span className="lf_divider">Or</span>
        <hr />
      </div> */}
        {/* devider */}

        {/* <div className="row mt25">
        <div className="col-lg-6">
          <button
            type="submit"
            className="btn btn-block color-white bgc-fb mb0 w-100"
          >
            <i className="fa fa-facebook float-start mt5"></i> Facebook
          </button>
        </div>

        <div className="col-lg-6">
          <button
            type="submit"
            className="btn btn2 btn-block color-white bgc-gogle mb0 w-100"
          >
            <i className="fa fa-google float-start mt5"></i> Google
          </button>
        </div>
      </div> */}
        {/* more signin options */}
      </form>
    </>
  );
};

export default Form;
