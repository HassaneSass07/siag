const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');
const app = express();

// Importation des données
const {
  nigerRegions,
  infrastructures,
  indicators,
  calculatePriorityScore,
  clusterRegions
} = require('./nigerData');

app.use(cors());
app.use(express.json());

// Cache des réponses
const responseCache = new Map();

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;
  const userMessage = messages[messages.length-1].content;

  // Vérification du cache
  if (responseCache.has(userMessage)) {
    return res.json(formatResponse(responseCache.get(userMessage)));
  }

  try {
    // Construction du contexte intelligent
    const context = buildContext(userMessage);
    
    exec(`ollama run mistral "${context}"`, 
      { maxBuffer: 1024 * 1024 }, // Buffer de 1MB
      (error, stdout, stderr) => {
        if (error) {
          console.error("Erreur Ollama:", stderr);
          return res.status(500).json({ 
            error: "Erreur de traitement",
            details: stderr.toString()
          });
        }
        
        const response = processOllamaResponse(stdout.toString());
        responseCache.set(userMessage, response);
        
        res.json(formatResponse(response));
      }
    );
  } catch (error) {
    res.status(500).json({ 
      error: error.message,
      stack: error.stack
    });
  }
});

// Fonctions utilitaires
function buildContext(question) {
  const priorityRegions = nigerRegions
    .map(r => ({...r, score: calculatePriorityScore(r)}))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return `
    [Contexte Niger - Données 2023]
    ## Régions Prioritaires (score):
    ${priorityRegions.map(r => `${r.name}: ${r.score}/100`).join('\n')}
    
    ## Accès Moyens:
    - Éducation: ${indicators.education.national_average}%
    - Santé: ${indicators.health.national_average}%
    - Eau: ${indicators.water.national_average}%
    - Électricité: ${indicators.electricity.national_average}%
    
    ## Infrastructures Clés:
    - Hôpitaux: ${infrastructures.filter(i => i.type.includes('hospital')).length}
    - Écoles: ${infrastructures.filter(i => i.type.includes('school')).length}
    
    Question: ${question}
    
    Répondez en français, soyez précis et utilisez les données fournies.
    Structurez votre réponse avec:
    1. Analyse des données
    2. Comparaisons pertinentes
    3. Recommandations si demandé
  `;
}

function processOllamaResponse(rawResponse) {
  // Nettoyage de la réponse
  return rawResponse
    .replace(/[\r\n]+/g, '\n')  // Uniformise les sauts de ligne
    .trim();
}

function formatResponse(content) {
  return {
    choices: [{
      message: {
        role: "assistant",
        content: content
      }
    }]
  };
}

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
  // console.log('Clusters régionaux:', clusterRegions());
});