import mockjs from 'mockjs';
export default {
  // uploads an image
  'POST /pet/:petId/uploadImage': (req, res) => {
    res.send(
      mockjs.mock({
        code: 1001,
        message: 'success',
        data: {
          code: '@integer(60, 100)',
          type: '@string',
          message: '@string',
        },
      })
    );
  },

  // Finds Pets by status
  'GET /pet/findByStatus': (req, res) => {
    res.send(
      mockjs.mock({
        code: 1001,
        message: 'success',
        'data|1-8': [
          {
            id: '@integer(60, 100)',
            category: {
              id: '@integer(60, 100)',
              name: '@string',
            },
            name: 'doggie',
            photoUrls: ['@string'],
            tags: [
              {
                id: '@integer(60, 100)',
                name: '@string',
              },
            ],
            status: 'available',
          },
        ],
      })
    );
  },

  // Finds Pets by tags
  'GET /pet/findByTags': (req, res) => {
    res.send(
      mockjs.mock({
        code: 1001,
        message: 'success',
        'data|1-8': [
          {
            id: '@integer(60, 100)',
            category: {
              id: '@integer(60, 100)',
              name: '@string',
            },
            name: 'doggie',
            photoUrls: ['@string'],
            tags: [
              {
                id: '@integer(60, 100)',
                name: '@string',
              },
            ],
            status: 'available',
          },
        ],
      })
    );
  },

  // Find pet by ID
  'GET /pet/:petId': (req, res) => {
    res.send(
      mockjs.mock({
        code: 1001,
        message: 'success',
        data: {
          id: '@integer(60, 100)',
          category: { id: '@integer(60, 100)', name: '@string' },
          name: 'doggie',
          status: 'available',
          'photoUrls|1-8': ['@string'],
          'tags|1-8': [{ id: '@integer(60, 100)', name: '@string' }],
        },
      })
    );
  },

  // Place an order for a pet
  'POST /store/order': (req, res) => {
    res.send(
      mockjs.mock({
        code: 1001,
        message: 'success',
        data: {
          id: '@integer(60, 100)',
          petId: '@integer(60, 100)',
          quantity: '@integer(60, 100)',
          shipDate: '@datetime',
          status: 'placed',
          complete: '@boolean',
        },
      })
    );
  },

  // Find purchase order by ID
  'GET /store/order/:orderId': (req, res) => {
    res.send(
      mockjs.mock({
        code: 1001,
        message: 'success',
        data: {
          id: '@integer(60, 100)',
          petId: '@integer(60, 100)',
          quantity: '@integer(60, 100)',
          shipDate: '@datetime',
          status: 'placed',
          complete: '@boolean',
        },
      })
    );
  },

  // Returns pet inventories by status
  'GET /store/inventory': (req, res) => {
    res.send(
      mockjs.mock({
        code: 1001,
        message: 'success',
        data: {
          additionalProp1: '@integer(60, 100)',
          additionalProp2: '@integer(60, 100)',
          additionalProp3: '@integer(60, 100)',
        },
      })
    );
  },

  // 与路由冲突
  // // Get user by user name
  // "GET /user/:username": (req, res) => {
  //   res.send(
  //     mockjs.mock({
  //       code: 1001,
  //       message: "success",
  //       data: {
  //         id: "@integer(60, 100)",
  //         username: "@string",
  //         firstName: "@string",
  //         lastName: "@string",
  //         email: "@string",
  //         password: "@string",
  //         phone: "@string",
  //         userStatus: "@integer(60, 100)",
  //       },
  //     })
  //   );
  // },
};
