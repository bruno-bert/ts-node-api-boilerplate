# Update one chat

> ## Sucess

1. ✅ Receives a request of type **PUT** on route **/api/chats/:id**
2. ✅ Validates required information **welcomeMessage**
3. ✅ Returns **200** and information of the related body

> ## Exceptions

1. ✅ Returns error **404** when API does not exist or chat does not exist
2. ✅ Returns error **403** when user does not have valid token
3. ✅ Returns error **500** when there is unexpected error on server
4. ✅ Returns error **400** when chat id is not valid