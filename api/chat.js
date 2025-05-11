import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(config);

export default async function handler(req, res) {
  const { message } = req.body;
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Eres Evabot, asistente virtual futurista que ayuda con seguros." },
        { role: "user", content: message }
      ],
      temperature: 0.7
    });
    res.status(200).json({ reply: completion.data.choices[0].message.content });
  } catch (e) {
    res.status(500).json({ error: "Error generando respuesta" });
  }
}