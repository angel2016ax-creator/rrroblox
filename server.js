const express = require("express");
const OpenAI = require("openai");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: userMessage
    });

    res.json({
      reply: response.output[0].content[0].text
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error con OpenAI" });
  }
});

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});