const express = require('express')
const app = express()

app.use(express.static('public'))

app.get('/food', (req, res) => {
    // const food = [
    //     { id: 1, name: 'cucumber' },
    //     { id: 2, name: 'tomato' },
    //     { id: 3, name: 'celery' }
    // ]
    const food = [
        '11090', '11205', '09307'
    ]

    res.json(food)
})

app.get('*', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`)
})

app.listen(3000, () => console.log("listening on port 3000"))
