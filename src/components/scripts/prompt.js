import OpenAI from "openai";

// get the list of films in a single string
function filmFragment(data) {
  let promptFragment = `Below a list with an index, a title and an overview for a series of movies.\n`;
  
  const results = data.results;
  for (let i = 0; i < results.length; i++) {
    promptFragment = promptFragment + `${i}, ${results[i].title}, ${results[i].overview}\n`;
  }
  return promptFragment;
}

// get an introduction for the user's input string
function userFragment() {
  return `I want a movie about `;
}

// get the agent rules/instructions and delivery format in a string
function rulesFragment() {
  return `. Give a short evasive polite rejection in case my request involves mature, unsafe, abusive intentions. Give a single film suggestion hoping that I'm going to like it, but do not apologize nor mention the previous instruction. The answer should have 20 words max and be in this format: "index&title&suggestion mentioning the movie title"`;
}

// call OpenAI API and return with the result in a string
async function requester(prompt, openAIOptions) {
  const openai = new OpenAI(openAIOptions);

  if (prompt) {
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

    return completion.choices[0].message.content;
  }
}

export default { filmFragment, userFragment, rulesFragment, requester };
