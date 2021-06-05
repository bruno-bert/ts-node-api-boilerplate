# Criar Chats

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **POST** na rota **/api/chats**
2. ✅ Valida se a requisição foi feita por um usuário comum **não admin**
3. ✅ Valida dados obrigatórios **welcomeMessage** e **name**
4. ✅ **Cria** um chat com os dados fornecidos
5. ✅ Retorna **200** com o chat adicionado

> ## Exceções

1. ✅ Retorna erro **404** se a API não existir
2. ✅ Retorna erro **403** se o usuário não tiver token válido
3. ✅ Retorna erro **400** se welcomeMessage ou name não forem fornecidos pelo client
4. ✅ Retorna erro **500** se der erro ao tentar criar o chat


