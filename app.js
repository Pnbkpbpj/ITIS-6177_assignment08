const express = require("express");
const bodyParser = require("body-parser")
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
app.use(bodyParser.json());
const port = 5000;


const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Assignment 08 API",
            description: "Assignment 08 API information",
            contact: {
                name: "Poojitha Panabaka"
            },
            servers: ["http://0.0.0.0:5000"]
        }
    },
    apis: ["app.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

let items = [
    { id: 01, name: "tomato", category: "Kitchen" }
]


/**
 * @swagger
 * /items:
 *  get:
 *      description: Use to request all items
 *      responses:
 *          '200':
 *              description: A successful response
 */
app.get("/items", (req, res) => {
    res.send(items);
});


/**
 * @swagger
 * /add-item:
 *   post:
 *     summary: Add a new item
 *     description: Add a new item with the "id", "name", and "category".
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Item added successfully
 *     parameters:
 *     - in: "body"
 *       name: "body"
 *       description: "Item info"
 *       required: true
 *       schema:
 *         properties:
 *           id:
 *             type: integer
 *             example: 12
 *           name:
 *             type: string
 *             example: onion
 *           category:
 *             type: string
 *             example: food
 */
app.post("/add-item", (req, res) => {
    const data = req.body;
    if (data.id === undefined || !Number.isInteger(data.id)) {
        res.status(400).send("Item Id is required and it should be integer");
        return;
    } else if (data.name === undefined || data.name === "") {
        res.status(400).send("Item Name is required");
        return;
    } else if (data.category === undefined || data.category === "") {
        res.status(400).send("Item category is required");
        return;
    }
    items.push({
        id: data.id,
        name: data.name,
        category: data.category
    })
    res.status(200).send("Item Added");
})

/**
 * @swagger
 * /item/{id}:
 *   patch:
 *     summary: Update an item
 *     description: Update a item fileds like the "name", "category", and "id".
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Item updated successfully
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The item id    
 *       - in: "body"
 *         name: "body"
 *         description: "Item details"
 *         required: true
 *         schema:
 *           properties:
 *             id:
 *               type: integer
 *               example: 12
 *             name:
 *               type: string
 *               example: onion
 *             category:
 *               type: string
 *               example: food
 */
app.patch("/item/:id", (req, res) => {
    const itemId = Number.parseInt(req.params.id);
    let item = {};
    let found = false;
    items.forEach(element => {
        if (element.id === itemId) {
            item = element;
            items = items.filter(val => val != element);
            found = true;
            return;
        }
    });
    if (!found) {
        res.status(400).send("Invalid item id");
        return;
    }
    const data = req.body;
    if (data.id != undefined || Number.isInteger(data.id)) {
        item.id = data.id;
    }
    if (data.name != undefined && data.name != "") {
        item.name = data.name;
    }
    if (data.category != undefined && data.category != "") {
        item.category = data.category;
    }
    items.push(item)
    res.status(200).send("Item Updated");
})

/**
 * @swagger
 * /item/{id}:
 *   put:
 *     summary: Update an item
 *     description: Update an item feilds like the "name", "category", and "id".
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Item updated successfully
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The item id    
 *       - in: "body"
 *         name: "body"
 *         description: "item details"
 *         required: true
 *         schema:
 *           properties:
 *             id:
 *               type: integer
 *               example: 12
 *             name:
 *               type: string
 *               example: onion
 *             major:
 *               type: category
 *               example: food
 */
app.put("/item/:id", (req, res) => {
    const itemId = Number.parseInt(req.params.id);
    let item = {};
    let found = false;
    items.forEach(element => {
        if (element.id === itemId) {
            item = element;
            items = items.filter(val => val != element);
            found = true;
            return;
        }
    });
    if (!found) {
        res.status(400).send("Invalid item id");
        return;
    }
    const data = req.body;
    if (data.id === undefined || !Number.isInteger(data.id)) {
        items.push(item);
        res.status(400).send("item Id is required and it should be integer");
        return;
    } else if (data.name === undefined || data.name === "") {
        items.push(item);
        res.status(400).send("item Name is required");
        return;
    } else if (data.major === undefined || data.major === "") {
        items.push(item);
        res.status(400).send("item Major is required");
        return;
    }
    item.id = data.id;
    item.name = data.name;
    item.category = data.category;
    items.push(item)
    res.status(200).send("item Updted");
})


/**
 * @swagger
 * /item/{id}:
 *   delete:
 *     summary: Delete a item
 *     description: Delete the item with specific id.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: item deleted successfully
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The item id    
 */
app.delete("/item/:id", (req, res) => {
    const itemId = Number.parseInt(req.params.id);
    let item = {};
    let found = false;
    items.forEach(element => {
        if (element.id === itemId) {
            item = element;
            items = items.filter(val => val != element);
            found = true;
            return;
        }
    });
    if (!found) {
        res.status(400).send("Invalid item id");
        return;
    }
    res.status(200).send("item deleted");
})

app.listen(port, () => {
    console.log("Server running");
});