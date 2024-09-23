import OpenAI from "openai";

function filmComposer(data) {
  const results = data.results;

  let promptFragment = `Below a list with an index, a title and an overview for a series of movies.\n`;

  for (let i = 0; i < results.length; i++) {
    promptFragment = promptFragment + `${i}, ${results[i].title}, ${results[i].overview}\n`;
  }

  console.log(promptFragment);
  return promptFragment;
}

function userComposer(userRequest = `What is the best science fiction film`) {
  let promptFragment = `${userRequest}. Give a short evasive polite rejection in case my request involves mature, unsafe, abusive intentions. Do not apologize, and the answer should have 20 words max and start with a single film suggestion "index, title and :"`;

  console.log(promptFragment);
}

async function promptRequester(prompt, openAIOptions) {
  const openai = new OpenAI(openAIOptions);

  if (prompt) {
    console.log(prompt);
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    console.log(completion.choices[0].message.content);

    return "result";
  }
}

export default { filmComposer, userComposer, promptRequester };
