import axios from 'axios';

export const chatWithBot = async (req, res) => {
  const { message } = req.body;

  try {
    const hfResponse = await axios.post(
      'https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1',
      {
        inputs: `
You are a helpful assistant for waste management. Answer the user's question concisely using 3-5 clear bullet points. Keep the response short and easy to read.

- Answer questions in a short, clear, and concise manner.
- Use point format or bullet points if applicable.
- Avoid long paragraphs or excessive details.
- Keep responses friendly and to the point.
- Only respond to relevant platform questions like reporting waste, cleanup drives, worker uploads, manager tasks, contact info, etc.


User's question: "${message}"

Your response:
        `,
        parameters: {
          max_new_tokens: 200,
          temperature: 0.5,
          top_p: 0.9,
          return_full_text: false
        },
        options: {
          wait_for_model: true
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    let generated = Array.isArray(hfResponse.data) ? hfResponse.data[0]?.generated_text : null;

    if (generated) {
      // Optional formatting: ensure each bullet point starts on a new line
      generated = generated.replace(/(\•|\-)/g, '\n$1'); 

      res.json({ reply: generated.trim() });
    } else {
      res.json({ reply: "Sorry, I couldn't generate a response." });
    }

  } catch (error) {
    console.error(error?.response?.data || error.message);
    res.status(500).json({ reply: "Oops! Something went wrong." });
  }
};
