import app from './index';

const port = process.env.PORT || 3010;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
