import axios from 'axios';

const usersRouter = require("./users");
apiRouter.use("/users", usersRouter);

export async function getSomething() {
  try {
    const { data } = await axios.get('/api');
    return data;
  } catch (error) {
    throw error;
  }
}