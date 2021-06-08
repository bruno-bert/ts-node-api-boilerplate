# get step detail from chat

> ## Sucess

1.  Sends a request of type **GET** on route **/api/chats/:id/step/:name**
2.  Returns **200** and information of the related body

> ## Exceptions

1.  Returns error **404** when API does not exist or chat does not exist or step does not exist
2.  Returns error **403** when user does not have valid token
3.  Returns error **500** when there is unexpected error on server
4.  Returns error **400** when chat id is not valid


