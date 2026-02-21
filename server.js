const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.get('/api/animations', (req, res) => {
    res.json([
        {
            title: 'React card flip',
            description: 'Карточка разворачивается на 180° при наведении без тяжёлых библиотек.',
            tech: 'React UI pattern'
        },
        {
            title: 'Node.js API reveal',
            description: 'Сервер отдает данные анимаций и обновляет блоки на клиенте через fetch.',
            tech: 'Node.js + Express'
        }
    ]);
});

app.post('/api/leads', (req, res) => {
    const { name, email } = req.body || {};
    if (!name || !email) {
        return res.status(400).json({ ok: false, message: 'name and email required' });
    }

    return res.status(201).json({ ok: true, message: 'lead accepted' });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
