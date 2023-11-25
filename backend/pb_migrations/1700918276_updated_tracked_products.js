/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mwcexq7bc8gwq4q")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dbhitter",
    "name": "name",
    "type": "text",
    "required": true,
    "presentable": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mwcexq7bc8gwq4q")

  // remove
  collection.schema.removeField("dbhitter")

  return dao.saveCollection(collection)
})
