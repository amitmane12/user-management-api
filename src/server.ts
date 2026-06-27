import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.json({
    message: 'hello ts with express',
  })
})

app.listen(3000, () => {
  console.log('app is listing on PORT: 3000 ')
})
