const MockDetails = {
  event: {
    preventDefault: jest.fn(),
    target: {
      name: 'title',
      value: 'abc'
    }
  },
  ideas: {
    _id: '1234rdxnci05',
    title: 'Tests',
    description: 'This is a test',
    author: ''
  },
  nextProps: {
    comments: [
      {
        author: {
          name: 'Sir Alex'
        },
        createdAt: Date.now(),
        comment: 'How far guy!',
      }
    ],
    ideas: {
      _id: '1234rdxnci05',
      title: 'Tests',
      description: 'This is a test',
      author: ''
    }
  },
  ideaList: [
    {
      _id: '5a22a0899ab6f016f6ceeae3',
      title: 'I love barcelona',
      description: "i love football because i love football and that's why i love football",
      updatedAt: '2017-12-02T12:46:01.271Z',
      createdAt: '2017-12-02T12:46:01.271Z',
      category: [
        'football'
      ],
      modified: false,
      comment: [],
      __v: 0
    },
    {
      _id: '5a229f6b31c100169695890a',
      title: 'I love football',
      description: "i love football because i love football and that's why i love football",
      updatedAt: '2017-12-02T12:41:15.540Z',
      createdAt: '2017-12-02T12:41:15.540Z',
      category: [
        'football'
      ],
      modified: false,
      comment: [],
      __v: 0
    }
  ]
};
export default MockDetails;
