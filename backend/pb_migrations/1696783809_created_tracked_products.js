/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "mwcexq7bc8gwq4q",
    "created": "2023-10-08 16:50:09.534Z",
    "updated": "2023-10-08 16:50:09.534Z",
    "name": "tracked_products",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ycz9cgao",
        "name": "url",
        "type": "url",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "exceptDomains": [],
          "onlyDomains": []
        }
      },
      {
        "system": false,
        "id": "wb6t3hct",
        "name": "name",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("mwcexq7bc8gwq4q");

  return dao.deleteCollection(collection);
})
