define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./apidoc/main.js",
    "group": "/home/bdepaula/ts-node-api-boilerplate/apidoc/main.js",
    "groupTitle": "/home/bdepaula/ts-node-api-boilerplate/apidoc/main.js",
    "name": ""
  },
  {
    "type": "get",
    "url": "/chats/:id",
    "title": "Request Specific Chat Details",
    "name": "GetChatDetails",
    "version": "1.0.0",
    "group": "Chat",
    "permission": [
      {
        "name": "authenticated user"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Chat unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Chat.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "welcomeMessage",
            "description": "<p>Welcome Message of the Chat.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"name\": \"John Chat\",\n  \"welcomeMessage\": \"Hello There!\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "MissingParam:",
            "description": "<p>{paramName} The name of the missing parameter.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidParam:",
            "description": "<p>{paramName} The name of the invalid parameter.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Bad Request\n{\n  \"error\": \"MissingParam:name\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Bad Request\n{\n  \"error\": \"InvalidParam:name\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 NotFound\n{\n  \"error\": \"Not Found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./src/main/docs/apidoc/v1.0.0/chat/load-chat-details-route.ts",
    "groupTitle": "Chat"
  },
  {
    "type": "get",
    "url": "/chats",
    "title": "Request All Chats",
    "name": "GetChats",
    "version": "1.1.0",
    "group": "Chat",
    "permission": [
      {
        "name": "authenticated user"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Chat.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "welcomeMessage",
            "description": "<p>Welcome Message of the Chat.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "accountId",
            "description": "<p>AccountId of the creator of the Chat.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"name\": \"John Chat\",\n  \"welcomeMessage\": \"Hello There!\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>API Route not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 NotFound\n{\n  \"error\": \"Not Found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./src/main/docs/apidoc/v1.1.0/chat/load-all-chat.ts",
    "groupTitle": "Chat"
  },
  {
    "type": "get",
    "url": "/chats",
    "title": "Request All Chats",
    "name": "GetChats",
    "version": "1.0.0",
    "group": "Chat",
    "permission": [
      {
        "name": "authenticated user"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Chat.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "welcomeMessage",
            "description": "<p>Welcome Message of the Chat.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"name\": \"John Chat\",\n  \"welcomeMessage\": \"Hello There!\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>API Route not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 NotFound\n{\n  \"error\": \"Not Found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./src/main/docs/apidoc/v1.0.0/chat/load-all-chat.ts",
    "groupTitle": "Chat"
  }
] });
