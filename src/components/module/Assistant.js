import { useEffect, useState, useRef } from "react";
import { MaterialSymbolsLightKidStarOutline } from "../scripts/icons.js";
import { MaterialSymbolsLightChatBubbleRounded } from "../scripts/icons.js";
import prompt from "../scripts/prompt.js";

function Assistant({ prePrompt, openAIOptions }) {
  const [assistant, setAssistant] = useState();
  const [userPrompt, setUserPrompt] = useState();
  const [finalPrompt, setFinalPrompt] = useState();
  const [awaitingResponse, setAwaitingResponse] = useState();
  const [result, setResult] = useState();
  const [botText, setBotText] = useState(`Hey, what kind of films are you looking for?`);

  useEffect(() => {
    // if (assistant) {
    //   const timer = setTimeout(() => document.getElementById("input-form").focus(), 500);
    // }

    async function getResult() {
      const received = await prompt.requester(finalPrompt, openAIOptions);
      const processed = received.split("&");
      setBotText(processed[2]);
      console.log(processed);
      setResult(processed);
    }

    if (awaitingResponse) {
      console.log("awaiting");
      getResult();
      setAwaitingResponse(false);
    }
  }, [userPrompt, finalPrompt, result, assistant]);

  function handleSubmit() {
    if (userPrompt && userPrompt != "") {
      setFinalPrompt(prePrompt + prompt.userFragment() + userPrompt + prompt.rulesFragment());
      setAwaitingResponse(true);
      document.getElementById("input-form").value = "";
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <>
      <div className="assistant" style={{ bottom: assistant ? "30%" : 0 }}>
        <div
          className="assistant-button"
          onClick={() => setAssistant(!assistant)}
          style={{ bottom: assistant ? "calc(-1.75em/2)" : "calc(1.75em /2)" }}
        >
          {assistant ? `X` : `?`}
        </div>

        <div className="assistant-dialog">
          <div className="assistant-chat">
            {assistant ? <div className="assistant-background" onClick={() => setAssistant(!assistant)}></div> : null}
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
