import 'dotenv/config';
import ApolloClient, {gql} from 'apollo-boost';
import 'cross-fetch/polyfill';

const ADD_STAR = gql`
  mutation AddStar($repositoryId: ID!) {
    addStar(input: {starrableId: $repositoryId}) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`

const GET_REPOSITORIES_OF_ORGANIZATION = gql`
  query($organization: String!) {
    organization(login: $organization) {
      name
      url
      repositories(first: 5) {
        edges {
          node {
            name
            url
          }
        }
      }
    }
  }
`

const client = new ApolloClient ({
  uri: 'https://api.github.com/graphql',
  request: operation => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${process.env.GITHUB_TOKEN}`
      }
    })
  }
})

client
.query({
  query: GET_REPOSITORIES_OF_ORGANIZATION,
  variables: {
    organization: 'the-road-to-learn-react'
  }
}).then(console.log);

client.mutate({
  mutation: ADD_STAR,
  variables: {
    repositoryId: "MDEwOlJlcG9zaXRvcnk2MzM1MjkwNw=="
  }
}).then(console.log)
