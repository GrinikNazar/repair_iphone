import telebot
import requests
from parser import parser_fom_telegram

try:
    from local_config import *
except ImportError:
    from prod_config import *

bot = telebot.TeleBot(token)


@bot.message_handler(content_types=['text'])
def post_request(message):
    content = message.text

    if message.from_user.id == bot_id:
        data = parser_fom_telegram(content)

        try:
            response = requests.post(url, data=data)

            if response.status_code != 201:
                bot.send_message(my_user_id, f'!Bad request! {message}')

        except Exception:
            pass

    else:
        if '***' in content:
            parsed_message = content.split('***')
            data_for_post_req = {
                'repair_id': parsed_message[0],
                'master_id': 'bot',
                'status': 'accepted'
            }

            response = requests.post(url_for_close, data=data_for_post_req)

            # if response.status_code != 200:
            #     bot.send_message(my_user_id, f'!Bad request! {parsed_message}')


if __name__ == '__main__':
    bot.infinity_polling(timeout=10)
