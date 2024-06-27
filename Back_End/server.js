import app from "./app.js";

const PORT = process.env.PORT || 3001;
app.get("/", (req, res) => {
    res.send("Welcome to the server.");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});