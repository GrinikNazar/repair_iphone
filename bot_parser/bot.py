import telebot
import requests
from parser import parser_fom_telegram

bot = telebot.TeleBot('6076395112:AAEdPr_UP2lHMNfXHwSclPqNFPnaR1iIkSs')

url = 'http://127.0.0.1:8000/service/api/v1/addrep/'
my_user_id = 375385945


@bot.message_handler(commands=['start'])
def send_welcome(message):
    bot.send_message(message.chat.id, 'Go')


@bot.message_handler(content_types=['text'])
def post_request(message):

    if message.from_user.id == my_user_id:
        content = message.text

        data = parser_fom_telegram(content)

        try:

            response = requests.post(url, data=data)

            if response.status_code == 201:
                bot.send_message(message.chat.id, 'Good request')
            else:
                bot.send_message(message.chat.id, '!Bad request!')

        except Exception:
            pass
    else:
        bot.send_message(message.chat.id, '!Bad request!')


if __name__ == '__main__':

    while True:
        try:
            bot.infinity_polling(timeout=10)
        except BaseException:
            continue
