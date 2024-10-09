const User = require("../../models/mongodb/User");
const { createUser } = require("../../models/userAccessDataService");

let mockData = [
    {
        name: {
            first: 'Is',
            middle: 'DaBest',
            last: 'Admin'
        },
        phone: '0503339966',
        email: 'adminIsAdmin@gmail.com',
        password: "Abc123!",
        image: {
            alt: "",
            url: ""
        },
        address: {
            state: 'IL',
            country: 'Israel',
            city: 'Nesher',
            street: 'Balfure',
            houseNumber: 5,
            zip: 11223344,
            isAdmin: true,
            isBusiness: true
        },
    },
    {
        name: {
            first: 'IsA',
            middle: 'Real',
            last: 'Business'
        },
        phone: '0548887755',
        email: 'businessItIs@gmail.com',
        password: "Ccc123!",
        image: {
            alt: "",
            url: ""
        },
        address: {
            state: 'IL',
            country: 'Israel',
            city: 'Kiryat Tivon',
            street: 'Hamoshad',
            houseNumber: 5,
            zip: 11223344,
            isAdmin: false,
            isBusiness: true
        },
    },
    {
        name: {
            first: 'IsJust',
            middle: 'A',
            last: 'User'
        },
        phone: '0521112244',
        email: 'isJustAuserLala@gmail.com',
        password: "Bbc123!",
        image: {
            alt: "",
            url: ""
        },
        address: {
            state: 'IL',
            country: 'Israel',
            city: 'Beer Yakove',
            street: 'HaShalom',
            houseNumber: 7,
            zip: 22334455,
            isAdmin: false,
            isBusiness: false
        },
    }
];

const createUserMockData = async () => {
    let users = await User.find();

    if (users.length == 0) {
        mockData.forEach(async (mockUser) => {
            await createUser(mockUser);
        });
        return
    };

    return
};

module.exports = createUserMockData;