import React from "react";
import UserAuthInput from "./UserAuthInput";

function SignUp() {
  return (
    <div className="w-full py-6">
      <img
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/codepen-logo-white%402x.png"
        className="h-auto w-32 object-contain opacity-50"
      ></img>

      <div className="w-full flex flex-col items-center justify-center py-8">
        <p className="py-8 text-2xl text-primaryText">Join With Us !! ⭐ </p>
        {/* SignUp Form */}
        <div className="px-8 w-full md:w-auto py-4 rounded-xl bg-secondary flex flex-col items-center justify-center gap-8">

          <UserAuthInput/>

        </div>
      </div>
    </div>
  );
}

export default SignUp;
