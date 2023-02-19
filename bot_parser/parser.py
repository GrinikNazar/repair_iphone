def parser_fom_telegram(text):

    data = {
        "number": None,
        "model": None,
        "customer_phone": None,
        "customer_name": None,
        "password": None,
        "imei": None,
        "defect": None,
        "time_work": 1,
        "warranty": False,
        "shop": 1,
    }

    asoc = {
        "Пристрій": "model",
        "Телефон": "customer_phone",
        "Клієнт": "customer_name",
        "Код розблокування": "password",
        "IMEI/SN": "imei",
        "Пошкодження": "defect",
        "Магазин": "shop",
        "Закінчення ремонту": "time_work",
    }

    text_split = text.split('\n')

    data['number'] = text_split[0].split('№')[1]

    if "🔴 ГАРАНТІЙНИЙ РЕМОНТ 🔴" in text:
        data['warranty'] = True

    for row in text_split:
        try:
            x = row.split(':')[0]
            y = row.split(':')[1].strip()
            if x in asoc:
                data[asoc[x]] = y
        except IndexError:
            pass

    #  Переробити наступний код для роботи з базою даних
    shops = {
        "inStyle": 1,
        "inStyle NEW": 2,
    }

    data['shop'] = shops[data['shop']]

    try:
        x = []
        for i in list(data['time_work']):
            if i.isdigit():
                x.append(i)
        data['time_work'] = max(x)
    except TypeError:
        pass

    return data
