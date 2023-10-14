/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mwcexq7bc8gwq4q")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6w1qbi2y",
    "name": "pb_uuid",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 36,
      "max": 36,
      "pattern": "[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}"
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mwcexq7bc8gwq4q")

  // remove
  collection.schema.removeField("6w1qbi2y")

  return dao.saveCollection(collection)
})
