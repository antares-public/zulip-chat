# Mini Zulip documentation
Zulip - прекрасная платформа для интеграции, но, к сожалению, я не нашла ни одну понятную и наглядную документацию по нему.
Я решила сделать свое собственное небольшое описание того функционала, который был мне нужен.
![Alt-текст](https://i.imgur.com/UibSFGi.png)

## Вход
Для того, чтобы увидеть пример, перейдите по директории `src/pages/login`\
В `.env.local` поместите ваши данные в формате:
```
REACT_APP_EMAIL=
REACT_APP_KEY=
REACT_APP_REALM=
REACT_APP_PASSWORD=
```
(смотреть .env.example)\
__Теперь, при успешном входе вы увидите username и apiKey, в случае ошибки все будет подробно описано в msg.__

![Alt-текст](https://i.imgur.com/21tTnDe.png)
## Регистрация
Для того, чтобы регистрация пользователей работала, вам нужно __запросить разрешение у команды zulip__ или __развернуть свой сервер с нужными настройками__.\
Для того, чтобы увидеть пример, перейдите по директории - `src/pages/register`\
Вам необходим такой же `.env.local` как и в предыдущем шаге.\
__Успешный ответ:__
```
{ 
    msg: ""
    result: "success"
    user_id: 23 
}
```
![Alt-текст](https://i.imgur.com/1uVwuOX.png)\
Подробнее: https://zulip.com/api/create-user.

## Чат
```
anchor
     newest: самое последнее сообщение
     oldest: самое старое сообщение
     first_unread: самое старое непрочитанное сообщение
num_before - сообщения до anchor
num_after - сообщения послe anchor
narrow - в моем случае это сообщения между пользователями с id 8 и 21
```
![Alt-текст](https://i.imgur.com/e9cNGji.png)\
Подробнее: https://zulip.com/api/send-message.

## Users
![Alt-текст](https://i.imgur.com/9aegmwX.png)\
Подробнее: https://zulip.com/api/get-users.

<hr />
Оригинальная документация:
 - https://www.npmjs.com/package/zulip-js
 - https://zulip.com/api
