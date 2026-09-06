import { GoogleGenAI } from "@google/genai";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default async function handler(req: VercelRequest, res: VercelResponse) {
	if (req.method !== "POST") {
		res.status(405).json({ error: "Methode not allowde" });
		return;
	}

	const { messages, systemContext } = req.body as {
		messages: { role: "user" | "model"; text: string }[];
		systemContext: string;
	};

	if (!messages || messages.length === 0) {
		res.status(400).json({ error: "messages is required" });
		return;
	}

	try {
		const response = await ai.models.generateContent({
			model: "gemini-3.6-flash",
			contents: messages.map((m) => ({
				role: m.role,
				parts: [{ text: m.text }],
			})),
			config: {
				systemInstruction: systemContext,
			},
		});
		res.status(200).json({ text: response.text ?? "" });
	} catch (e) {
		console.error(e);
		// GoogleGenAI SDK가 던지는 에러엔 실제 HTTP 상태코드가 status로 붙어있음
		const status = (e as { status?: number })?.status;
		if (status === 429) {
			res.status(429).json({ error: "RATE_LIMIT" });
			return;
		}
		res.status(500).json({ error: "UNKNOWN" });
	}
}
