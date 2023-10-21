/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mwcexq7bc8gwq4q")

  // remove
  collection.schema.removeField("m1rkliyw")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mwcexq7bc8gwq4q")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "m1rkliyw",
    "name": "slug",
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
})
