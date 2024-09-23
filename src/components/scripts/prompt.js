import OpenAI from "openai";

function filmFragment(data) {
  let promptFragment = `Below a list with an index, a title and an overview for a series of movies.\n`;
  
  const results = data.results;
  for (let i = 0; i < results.length; i++) {
    promptFragment = promptFragment + `${i}, ${results[i].title}, ${results[i].overview}\n`;
  }
  return promptFragment;
}

function userFragment() {
  return `I want a movie about `;
}

function rulesFragment() {
  return `. Give a short evasive polite rejection in case my request involves mature, unsafe, abusive intentions. Give a single film suggestion hoping that I'm going to like it, but do not apologize nor mention the previous instruction. The answer should have 20 words max and be in this format: "index&title&suggestion mentioning the movie title"`;
}

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
