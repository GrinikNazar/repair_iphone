import telebot
import requests

try:
    from local_config import *
except ImportError:
    from prod_config import *

bot = telebot.TeleBot(token)


@bot.message_handler(content_types=['text'])
def post_request(message):
    content = message.text

    if '***' in content:
        parsed_message = content.split('***')
        data_for_post_req = {
            'repair_id': parsed_message[0],
            'repair_price': parsed_message[1],
            'telegram_id': str(message.from_user.id),
        }

        response = requests.post(url_for_close, data=data_for_post_req)


if __name__ == '__main__':
    bot.infinity_polling(timeout=10)
