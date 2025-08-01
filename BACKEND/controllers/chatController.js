import axios from 'axios';

export const chatWithBot = async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({ error: "Message is required." });
    }

    const response = await axios.post(
      `https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1`,
      {
        inputs: `<s>[INST] ${userMessage} [/INST]`,
        parameters: {
          max_new_tokens: 200,
          temperature: 0.7,
          return_full_text: false,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const botReply = response.data?.[0]?.generated_text || "No response generated.";
    res.status(200).json({ message: botReply });

  } catch (error) {
    console.error("HuggingFace API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch response from Hugging Face." });
  }
};
