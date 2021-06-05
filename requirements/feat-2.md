# Get one chat

> ## Sucess

1. ✅ Receives a request of type **GET** on route **/api/chats/:id**
2. ✅ Returns **200** and information of the related body

> ## Exceptions

1. ✅ Returns error **404** when API does not exist or chat does not exist
2. ✅ Returns error **403** when user does not have valid token