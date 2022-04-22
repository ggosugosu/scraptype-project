import React, {useState, useEffect} from 'react';
import { ApolloClient, InMemoryCache, useQuery } from '@apollo/client';
import { ApolloProvider, gql } from '@apollo/client';

function FontList() {
    const GET_FONT = gql`
    query{
      getAllFont{
        name
        description
        corporation
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
      <h1>{data.getAllFont.map((value, key)=> (<div key={key}>{value.name}:{value.description}<p>{value.corporation}</p></div>))}</h1>
      <h2>My first Apollo app 🚀</h2>
    </div>
);
}

export default FontList;


