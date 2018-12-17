import React from "react"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import RepositoryList, { REPOSITORY_FRAGMENT } from '../Repository'
import Loading from '../Loading'
import ErrorMessage from '../Error';
import { graphql } from 'react-apollo'

const GET_CURRENT_USER = gql`
  {
    viewer {
      login
      name
    }
  }
`

const GET_REPOSITORIES_OF_CURRENT_USER = gql`
  {
    viewer {
      repositories( first:5
                    orderBy: {direction: DESC, field: STARGAZERS}
                    after: $cursor
       ) {
         edges {
           node {
             ...repository  
           }
         }
         pageInfo {
           endCursor
           hasNextPage
         }
       }
    }
  }

  ${REPOSITORY_FRAGMENT}
`
// where ...repository we are inserting the query fragment and it is taken form
// inserting ${REPOSITORY_FRAGMENT} at the bottom 

const Profile = () => (
  <Query query={GET_REPOSITORIES_OF_CURRENT_USER}
         notifyOnNetworkStatusChange={true}
  >
    {({ data, loading, error, fetchMore}) => {

      if(error) {
        return <ErrorMessage error={error} />;
      }

      const { viewer } = data

      if (loading && !viewer) {
        return <Loading />
      }

      return (
      <RepositoryList 
      loading={loading}
      repositories={viewer.repositories}
      fetchMore={fetchMore}></RepositoryList>
      )
    }}
  </Query>
)

export default graphql(GET_REPOSITORIES_OF_CURRENT_USER)(Profile);
