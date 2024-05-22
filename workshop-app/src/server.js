const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.get('/randomsentence', (req, res) => {
  const sentences = [
    'Logic will get you from A to B. Imagination will take you everywhere.',
    "There are 10 kinds of people. Those who know binary and those who don't.",
    'There are two ways of constructing a software design. One way is to make it so simple that there are obviously no deficiencies and the other is to make it so complicated that there are no obvious deficiencies.',
    "It's not that I'm so smart, it's just that I stay with problems longer.",
    'It is pitch dark. You are likely to be eaten by a grue.',
  ];
  const randomIndex = Math.floor(Math.random() * sentences.length);
  const randomSentence = sentences[randomIndex];
  res.json({ sentence: randomSentence });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
