import 'dotenv/config';
import ApolloClient from 'apollo-boost';

const client = new ApolloClient ({
  uri: 'https://api.github.com/graphql',
  request: operation => {
    operation.setContext
  }
})

const userCredentials = { firstname: 'Robin' };
const userDetails = { nationality: 'German' };

const user = {
  ...userCredentials,
  ...userDetails,
};

console.log(user);

console.log(process.env.SOME_ENV_VARIABLE);
