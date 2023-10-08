/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "9csp8j80utnlgyg",
    "created": "2023-10-08 16:56:01.740Z",
    "updated": "2023-10-08 16:56:01.740Z",
    "name": "product_snapshots",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "mbj1ydjn",
        "name": "product",
        "type": "relation",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "mwcexq7bc8gwq4q",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "dwald9pf",
        "name": "price",
        "type": "number",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": null,
          "noDecimal": false
        }
      },
      {
        "system": false,
        "id": "yzuddqwk",
        "name": "in_stock",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("9csp8j80utnlgyg");

  return dao.deleteCollection(collection);
})
