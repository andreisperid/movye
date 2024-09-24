import "./Assistant.css";
import { useEffect, useState } from "react";
import prompt from "../scripts/prompt.js";

const defaultMessage = `Hey, what kind of films are you looking for?`;

function Assistant({ prePrompt, openAIOptions }) {
  const [assistant, setAssistant] = useState();
  const [userPrompt, setUserPrompt] = useState();
  const [finalPrompt, setFinalPrompt] = useState();
  const [awaitingResponse, setAwaitingResponse] = useState();
  const [result, setResult] = useState();
  const [botText, setBotText] = useState(defaultMessage);

  useEffect(() => {
    async function getResult() {
      const received = await prompt.requester(finalPrompt, openAIOptions);
      const processed = received.split("&");

      setBotText(processed[2]);
      setResult(processed);
      setAwaitingResponse(false);
      scrollToDiv(`movie${processed[0]}`);
    }

    if (awaitingResponse) {
      getResult();
    }
  }, [userPrompt, finalPrompt, result]);

  function handleSubmit() {
    if (userPrompt && userPrompt != "") {
      setFinalPrompt(prePrompt + prompt.userFragment() + userPrompt + prompt.rulesFragment());
      setAwaitingResponse(true);
      document.getElementById("input-form").value = "";
    }
  }

  const toggleAssistant = () => {
    setAssistant(!assistant);
    if (!assistant) setBotText(defaultMessage);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  function scrollToDiv(id) {
    document.getElementById(id).scrollIntoView({
      behavior: "smooth",
    });
  }

  return (
    <>
      <div className="assistant" style={{ bottom: assistant ? "calc(200px + 1.75em/2)" : 0 }}>
        <div
          className="assistant-button"
          onClick={toggleAssistant}
          style={{ bottom: assistant ? "calc(-1.75em/2)" : "calc(1.75em /2)" }}
        >
          {assistant ? `X` : `?`}
        </div>

        <div className="assistant-dialog">
          <div className="assistant-chat">
            {assistant ? <div className="assistant-background" onClick={toggleAssistant}></div> : null}
            <div className="prompt-response">{awaitingResponse ? `...` : botText}</div>
            <div className="prompt-user">
              <input
                id="input-form"
                className="prompt-input"
                type="text"
                placeholder="I'm looking for..."
                onChange={(evt) => {
                  setUserPrompt(evt.target.value);
                }}
                onKeyDown={handleKeyDown}
              />
              <div className="prompt-send" onClick={() => handleSubmit()}>
                OK
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Assistant;
