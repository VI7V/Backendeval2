// const http = require('http')
// const fs = require('fs')
// const path = require('path')
// const querystring = require('querystring')

// const PORT = 3000;

// const server = http.createServer((req, res) => {
//     if (req.method == 'GET') {
//         switch (req.url) {
//             case '/': {
//                 fs.readFile(path.join(__dirname, 'index.html'), 'utf-8', (err, data) => {
//                     if (err) {
//                         res.writeHead(500, { 'Content-Type': 'text/plain' })
//                         res.end('Error reading the index page')
//                         return
//                     }
//                     res.writeHead(200, { 'Content-Type': 'text/html' })
//                     res.end(data)
//                 })
//                 break
//             }
//             case '/contact': {
//                 fs.readFile(path.join(__dirname, 'contactus.html'), 'utf-8', (err, data) => {
//                     if (err) {
//                         res.writeHead(500, { 'Content-Type': 'text/plain' })
//                         res.end('Error reading the Contact Us page')
//                         return
//                     }
//                     res.writeHead(200, { 'Content-Type': 'text/html' })
//                     res.end(data)
//                 })
//                 break
//             }
//             case '/dashboard': {
//                 fs.readFile(path.join(__dirname, 'dashboard.html'), 'utf-8', (err, data) => {
//                     if (err) {
//                         res.writeHead(500, { 'Content-Type': 'text/plain' })
//                         res.end('Error reading the dashboard page')
//                         return
//                     }
//                     res.writeHead(200, { 'Content-Type': 'text/html' })
//                     res.end(data)
//                 })
//                 break
//             }
//             case '/login': {
//                 fs.readFile(path.join(__dirname, 'login.html'), 'utf-8', (err, data) => {
//                     if (err) {
//                         res.writeHead(500, { 'Content-Type': 'text/plain' })
//                         res.end('Error reading the login page')
//                         return
//                     }
//                     res.writeHead(200, { 'Content-Type': 'text/html' })
//                     res.end(data)
//                 })
//                 break
//             }
//             case '/register': {
//                 fs.readFile(path.join(__dirname, 'register.html'), 'utf-8', (err, data) => {
//                     if (err) {
//                         res.writeHead(500, { 'Content-Type': 'text/plain' })
//                         res.end('Error reading the registration page')
//                         return
//                     }
//                     res.writeHead(200, { 'Content-Type': 'text/html' })
//                     res.end(data)
//                 })
//                 break
//             }
//             case '/about': {
//                 fs.readFile(path.join(__dirname, 'aboutus.html'), 'utf-8', (err, data) => {
//                     if (err) {
//                         res.writeHead(500, { 'Content-Type': 'text/plain' })
//                         res.end('Error reading the about us page')
//                         return
//                     }
//                     res.writeHead(200, { 'Content-Type': 'text/html' })
//                     res.end(data)
//                 })
//                 break
//             }
//             case '/programs': {
//                 fs.readFile(path.join(__dirname, 'program.html'), 'utf-8', (err, data) => {
//                     if (err) {
//                         res.writeHead(500, { 'Content-Type': 'text/plain' })
//                         res.end('Error reading the program page')
//                         return
//                     }
//                     res.writeHead(200, { 'Content-Type': 'text/html' })
//                     res.end(data)
//                 })
//                 break
//             }
//             default: {
//                 res.writeHead(404, { 'Content-Type': 'text/plain' })
//                 res.end('Not Found')
//             }
//         }
//     }
//     else if (req.method === 'POST') {
//         switch (req.url) {
//             case '/login': {
//                 let body = ''
//                 req.on('data', chunk => {
//                     body += chunk.toString()
//                 })

//                 req.on('end', () => {
//                     const { username, password } = querystring.parse(body)

//                     // Read the users from the users.json file
//                     fs.readFile(path.join(__dirname, 'users.json'), 'utf-8', (err, data) => {
//                         if (err) {
//                             res.writeHead(500, { 'Content-Type': 'text/plain' })
//                             res.end('Error reading user data')
//                             return
//                         }

//                         // Parse the users data
//                         const users = JSON.parse(data)

//                         // Authenticate the user by checking the username and password
//                         const user = users.find(u => u.username === username && u.password === password)

//                         if (user) {
//                             // If user is found, redirect to the dashboard
//                             res.writeHead(302, { 'Location': '/dashboard' })
//                             res.end()
//                         } else {
//                             // If user is not found, redirect to the register page
//                             res.writeHead(302, { 'Location': '/register' })
//                             res.end()
//                         }
//                     })
//                 })
//                 break
//             }
//             case '/register': {
//                 let body = ''
//                 req.on('data', chunk => {
//                     body += chunk.toString()
//                 })

//                 req.on('end', () => {
//                     const { username, password } = querystring.parse(body)
//                     const userData = { username, password }

//                     // Read existing users from users.json or create an empty array if file doesn't exist
//                     fs.readFile(path.join(__dirname, 'users.json'), 'utf-8', (err, data) => {
//                         let users = []

//                         if (!err) {
//                             users = JSON.parse(data)
//                         }

//                         // Save new user to the users array
//                         users.push(userData)

//                         // Write the updated users array to users.json
//                         fs.writeFile(path.join(__dirname, 'users.json'), JSON.stringify(users, null, 2), (err) => {
//                             if (err) {
//                                 res.writeHead(500, { 'Content-Type': 'text/plain' })
//                                 res.end('Error saving registration data')
//                                 return
//                             }
//                             res.writeHead(302, { 'Location': '/' })
//                             res.end()
//                         })
//                     })
//                 })
//                 break
//             }
//             default: {
//                 res.writeHead(404, { 'Content-Type': 'text/plain' })
//                 res.end('Not Found')
//             }
//         }
//     }
// })

// server.listen(PORT, () => {
//     console.log(`Server is running at http://localhost:${PORT}`)
// })
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});