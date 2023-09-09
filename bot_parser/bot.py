import telebot
import requests
from parser import parser_fom_telegram

bot = telebot.TeleBot('6076395112:AAEdPr_UP2lHMNfXHwSclPqNFPnaR1iIkSs')

url = 'http://5.45.87.133:8000/service/api/v1/addrep/'
my_user_id = 375385945
bot_id = 375385945


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
