/* const fs = require("fs");
function render(page) {
    return new Promise((resolve, reject) => {
        let viewUrl = `./view/${page}`
        fs.readFile(viewUrl, "utf8", (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}
async function route(url) {
    let view = '404.html'
    switch (url) {
        case '/':
            view = 'index.html'
            break
        case '/index':
            view = 'index.html'
            break
        case '/todo':
            view = 'todo.html'
            break
        case '/404':
            view = '404.html'
            break
        default:
            break
    }
    let html = await render(view)
    return html
}
module.exports = function (app) {  
     app.use(async (ctx) => {
         let url = ctx.request.url
         let html = await route(url)
         ctx.body = html
     })
}
 */

 const fs = require("fs");

 class RouterPage{
     constructor(app) {
        app.use(async (ctx) => {
            // console.log(ctx.state,'state');
            let url = ctx.request.url
            let html = await this.route(url)
            ctx.body = html
        })
     }
     render(page) {
         return new Promise((resolve, reject) => {
             let viewUrl = `./view/${page}`
             fs.readFile(viewUrl, "utf8", (err, data) => {
                 if (err) {
                     reject(err)
                 } else {
                     resolve(data)
                 }
             })
         })
     }
     async route(url) {
         let view = '404.html'
         switch (url) {
             case '/':
                 view = 'index.html'
                 break
             case '/index':
                 view = 'index.html'
                 break
             case '/todo':
                 view = 'todo.html'
                 break
             case '/404':
                 view = '404.html'
                 break
             default:
                 break
         }
         let html = await this.render(view)
         return html
     }
 }

 module.exports =  RouterPage;