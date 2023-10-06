import express from "express"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import multer from "multer"


const app = express()


app.use(cookieParser())
app.use(express.json())

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, '../client/public/upload')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+file.originalname)
    }

})

const upload = multer({ storage })

app.post('/api/uploads', upload.single('file'), function (req, res) {
    const file = req.file
    res.status(200).json(file.filename)
})


app.use("/api/posts",postRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/users", userRoutes)

app.listen(8800, () => {
    console.log("Connected!")
})