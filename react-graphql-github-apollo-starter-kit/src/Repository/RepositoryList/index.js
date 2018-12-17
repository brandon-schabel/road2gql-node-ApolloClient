import React, { Fragment } from "react"

import Loading from '../../Loading'
import RepositoryItem from "../RepositoryItem"

import "../style.css"

const updateQuery = (previousResult, { fetchMoreResult }) => {
  if (!fetchMoreResult) {
    return previousResult
  }
  return {
    ...previousResult,
    viewer: {
      ...previousResult.viewer,
      repositories: {
        ...previousResult.viewer.repositories,
        ...fetchMoreResult.viewer.repositories,
        edges: [
          ...previousResult.viewer.repositories.edges,
          ...fetchMoreResult.viewer.repositories.edges
        ]
      }
    }
  }
}

const RepositoryList = ({ repositories, fetchMore, loading }) => (
  <Fragment>
    {repositories.edges.map(({ node }) => console.log("map"))}

    {loading ? (
      <Loading />
    ) : (
    repositories.pageInfo.hasNextPage && (
      <button
        type="button"
        onClick={() =>
          fetchMore({
            variables: {
              cursor: repositories.pageInfo.endCursor
            },
            updateQuery
          })
        }>
        More Repositories
      </button>
      )
    )}
  </Fragment>
)

export default RepositoryList
