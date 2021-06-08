# add (if not exist) or update step on chat

> ## Sucess

1.  Sends a request of type **POST** on route **/api/chats/:id/step/update**
2.  Validates required fields to post request ( **name**, **message** )
3.  Validates other non required fields to post request (**trigger**,**end** )
4.  Returns **200** with all chat information, including the updated step (return an indicator id step was added or updated)

> ## Exceptions

1.  Returns error **404** when API does not exist or chat does not exist
2.  Returns error **403** when user does not have valid token
3.  Returns error **500** when there is unexpected error on server
4.  Returns error **400** when:
        - required information is not informed as specified


