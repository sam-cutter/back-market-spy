/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9csp8j80utnlgyg")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gdyufmls",
    "name": "condition",
    "type": "select",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "10",
        "11",
        "12"
      ]
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dwald9pf",
    "name": "price_gbp",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9csp8j80utnlgyg")

  // remove
  collection.schema.removeField("gdyufmls")

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
