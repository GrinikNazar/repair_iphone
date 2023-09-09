import telebot
import requests
from parser import parser_fom_telegram

try:
    from .local_config import *
except ImportError:
    from .prod_config import *

bot = telebot.TeleBot(token)


@bot.message_handler(content_types=['text'])
def post_request(message):
    if message.from_user.id == bot_id:
        content = message.text

        data = parser_fom_telegram(content)

        try:
            response = requests.post(url, data=data)

            if response.status_code != 201:
                bot.send_message(my_user_id, '!Bad request!')

        except Exception:
            pass


if __name__ == '__main__':
    bot.infinity_polling(timeout=10)
