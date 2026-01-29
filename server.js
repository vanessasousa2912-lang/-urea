const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

// A tua chave que enviaste está segura aqui no backend
const GEMINI_API_KEY = "AIzaSyCjT9PaqfTCCqfX2KGcKxcNmVPD8B_1mRY";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

// Rota que o teu index.html vai chamar
app.post('/api/chat', async (req, res) => {
    try {
        const response = await fetch(GEMINI_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Erro no servidor:", error);
        res.status(500).json({ error: "Erro ao comunicar com Gemini" });
    }
});

// Servir os ficheiros estáticos (o teu index.html)
app.use(express.static('.'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor Áurea a correr na porta ${PORT}`);
});