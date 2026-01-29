const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

// CONFIGURAÇÃO SEGURA:
// O comando process.env vai procurar a chave que escreveste no painel do Render.
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

// Rota de comunicação entre o teu Site e a IA
app.post('/api/chat', async (req, res) => {
    try {
        // Log para ajudar a depurar no Render
        console.log("Recebida nova consulta para a Áurea...");

        if (!GEMINI_API_KEY) {
            console.error("ERRO: A variável GEMINI_API_KEY não foi configurada no Render.");
            return res.status(500).json({ error: "Configuração de API ausente no servidor." });
        }

        const response = await fetch(GEMINI_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        });

        const data = await response.json();
        
        // Envia a resposta de volta para o index.html
        res.json(data);

    } catch (error) {
        console.error("Erro crítico no servidor:", error);
        res.status(500).json({ error: "O servidor falhou ao processar o pedido." });
    }
});

// Serve o teu index.html automaticamente
app.use(express.static('.'));

// Define a porta do servidor (o Render fornece uma automaticamente)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`-----------------------------------------`);
    console.log(`🚀 Áurea Lab Online!`);
    console.log(`📡 Porta: ${PORT}`);
    console.log(`-----------------------------------------`);
});
