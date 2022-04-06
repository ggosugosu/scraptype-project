import React, {useState, useEffect} from 'react';
import { ApolloClient, InMemoryCache, useQuery } from '@apollo/client';
import { ApolloProvider, gql } from '@apollo/client';

function FontList() {
    const GET_FONT = gql`
    query{
      getFontData{
        name
        description
      }
    }
    `

const { loading, error, data } = useQuery(GET_FONT);

if (loading) return <p>`Loading...`</p>;
if (error) {
    console.log(`Error ${error.message}`);
    return null;
}

return (
    <div>
      <h1>{data.getFontData.map((value, key)=> (<div key={key}>{value.name}:{value.description}</div>))}</h1>
      <h2>My first Apollo app 🚀</h2>
    </div>
);
}

export default FontList;


