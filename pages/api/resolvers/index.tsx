const resolvers = (_, args) => {
    return [
      { id: "test1", name: "TEST1", email: "test1@naver.com" },
      { id: "test2", name: "TEST2", email: "test2@naver.com" },
      { id: "test3", name: "TEST3", email: "test3@naver.com" },
    ];
  };

export default resolvers;

// const books = [
//   {
//     title: 'The Awakening',
//     author: 'Kate Chopin',
//   },
//   {
//     title: 'City of Glass',
//     author: 'Paul Auster',
//   },
// ];

// const resolvers = {
//   Query: {
//     books: () => books,
//   },
// };

// export default resolvers;

