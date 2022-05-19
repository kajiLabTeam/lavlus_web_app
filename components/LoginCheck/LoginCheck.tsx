import React from "react";
import { useRouter } from "next/router";
import { Button } from "@chakra-ui/react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { authState } from "../../recoil/atoms";

const LoginCheck = () => {
  const router = useRouter();
  const auth = useRecoilValue(authState);
  const signOut = useResetRecoilState(authState);

  return (
    <div
      style={{
        margin: "auto",
        top: 100,
        position: "absolute",
      }}
      suppressHydrationWarning
    >
      {!auth.isSignedIn ? (
        <>
          <p>Not signed in</p>
          <Button
            onClick={() => router.push("/login")}
            style={{ color: "#334364" }}
          >
            Sign in
          </Button>
        </>
      ) : (
        <>
          <p>Signed in as {auth.email}</p>
          <Button onClick={() => signOut()} style={{ color: "#334364" }}>
            Sign out
          </Button>
        </>
      )}
    </div>
  );
};

export default LoginCheck;
