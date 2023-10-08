import { environment } from "@/environment.mjs";

import { typography } from "@/utilities/typography";

import { SignInButtons } from "./buttons";

const SignInPage = () => (
  <>
    <h1 className={typography({ variant: "heading-4" })}>Sign in</h1>
    <p className={typography({ variant: "muted" })}>
      New to {environment.NEXT_PUBLIC_APPLICATION_NAME}? Sign in.
    </p>
    <SignInButtons />
  </>
);

export default SignInPage;
