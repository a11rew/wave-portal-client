import { useState } from "react";
import MessageList from "./components/MessageList";
import useIsWalletConnected from "./hooks/useIsWalletConnected";
// import useWaves from "./hooks/useWaves";

/** TODO
 * Display wallet info
 * Handle errors(Cooldown, failed auth etc)
 * Loading on submit
 * Update list after submit
 * Testing
 * Show message when no metamask
 */

function App() {
  const { currentAccount, connectWallet, isLoading } = useIsWalletConnected();
  const [message, setMessage] = useState("");
  // const { wave } = useWaves();

  /** Track error state */
  const errorState = message.length >= 140;

  /** Handle wave */
  const handleWave = (val: any): void => {
    console.log(val);
  };

  return (
    <div className="flex flex-col items-center w-full mt-16 gap-10">
      <div className="flex flex-col justify-center max-w-lg">
        <div className="text-center text-4xl">👋 Hey there!</div>
        <form onSubmit={handleWave} className="flex flex-col">
          <label htmlFor="messageInput" className="text-center my-4">
            Send{" "}
            <a href="https://a11rew.dev" className="underline text-heading">
              me
            </a>{" "}
            a message over the three webs
          </label>
          <textarea
            id="messageInput"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Roadhouse"
            className="bg-transparent border border-opacity-30 rounded-md p-2"
          />
          <div className="flex text-sm mt-2 justify-between">
            <p className="pr-8"></p>
            <div>
              <p
                className={`${
                  message.length >= 120 &&
                  message.length < 140 &&
                  "text-yellow-300"
                }
            ${message.length >= 140 && "text-red-400"}
            `}
              >
                {message.length}/140
              </p>
            </div>
          </div>
          {currentAccount && (
            <button
              disabled={errorState}
              className={`mt-4 p-2 rounded-md text-black bg-gray-300 transition-all duration-150 ease-in-out ${
                errorState && "opacity-40"
              }`}
              type="submit"
            >
              Wave at Me
            </button>
          )}
        </form>
        {!currentAccount && !isLoading && (
          <button
            className="mt-4 p-2 rounded-md bg-gray-300 text-black"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        )}
      </div>
      <div className="max-w-xl">
        <MessageList />
      </div>
    </div>
  );
}

export default App;
