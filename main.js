const { createCanvas, loadImage } = require('canvas');
const fetch = require('node-fetch');

router.get('/welcome', async (req, res) => {
    const { name, profile } = req.query; // Ej: /welcome?name=Luis&profile=URL

    if (!name || !profile) return res.status(400).send('Faltan parámetros name o profile');

    try {
        const canvas = createCanvas(800, 400);
        const ctx = canvas.getContext('2d');

        // Fondo (puede ser local o URL)
        const background = await loadImage('https://i.imgur.com/tuFondo.jpg'); // Cambia por tu fondo
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        // Imagen de perfil
        const profileImg = await loadImage(profile);
        ctx.save();
        ctx.beginPath();
        ctx.arc(100, 200, 80, 0, Math.PI * 2); // círculo para la foto
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(profileImg, 20, 120, 160, 160);
        ctx.restore();

        // Texto de bienvenida
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 40px Arial';
        ctx.fillText(`Bienvenido, ${name}!`, 250, 200);

        // Enviar imagen
        res.setHeader('Content-Type', 'image/png');
        res.send(canvas.toBuffer());
    } catch (err) {
        console.error(err);
        res.status(500).send('Error generando la imagen');
    }
});
