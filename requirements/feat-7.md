# delete step on chat

> ## Sucess

1.  Sends a request of type **DELETE** on route **/api/chats/:id/step/:name**
2.  Validates step is not being referenced by another step 
3.  Returns **204** with all chat information, without the removed step

> ## Exceptions

1.  Returns error **404** when API does not exist or chat does not exist or step does not exists
2.  Returns error **403** when user does not have valid token
3.  Returns error **500** when there is unexpected error on server
4.  Returns error **400** when:
        - chat id is not valid objectId

