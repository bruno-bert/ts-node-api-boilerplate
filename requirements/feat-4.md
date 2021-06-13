# add step to chat

> ## Sucesss

1.  Sends a request of type **POST** on route **/api/chats/:id/step**
2.  Validates required fields to put request (**name**,**message**,**trigger**,**end** )
3.  Validates other non required fields to put request (**trigger**,**end** )
4.  Returns **200** with all chat information, including the new step

> ## Exceptions

1.  Returns error **404** when API does not exist or chat does not exist
2.  Returns error **403** when user does not have valid token
3.  Returns error **500** when there is unexpected error on server
4.  Returns error **400** when:
        - required information is not informed as specified
        - step already exists with same name 



