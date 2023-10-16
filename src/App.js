import logo from "./logo.svg";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { withAuthenticator } from "@aws-amplify/ui-react";

function App({ user, signOut }) {
  return (
    <div>
      <div className="flex justify-end px-4 py-2">
        <button
          type="button"
          className="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
      </div>
      <div className="flex justify-center items-center h-screen w-full">
        Hello World
      </div>
    </div>
  );
}

export default withAuthenticator(App);
