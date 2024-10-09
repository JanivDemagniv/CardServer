const User = require("../../../users/models/mongodb/User");
const { handleError } = require("../../../utils/handleErrors");
const { createCard } = require("../../models/cardsAccessDataService");
const Card = require("../../models/mongodb/Card");
const { generateBizNumber } = require("../generateBizNumber");

let mockCards = [
    {
        title: "BlockBaster",
        subtitle: "Rent your video here",
        description: "Stop wasting your money on videos , you can rent'em out now and once you finish you can return them",
        phone: '036771213',
        email: 'blockbuser@blockbuster.com',
        web: 'https://www.blockbuster.com',
        image: {
            url: '',
            alt: ''
        },
        address: {
            state: "IL",
            country: "Israel",
            city: "Tel Aviv",
            street: "Shoham",
            houseNumber: 7,
            zip: 334455
        },
    },
    {
        title: "Toy's R'us",
        subtitle: "Buy the best toys?",
        description: "a store dedecated to children, teenagers, and creeps who still play with toys at an old age",
        phone: '036321144',
        email: 'buyherefast@toysrus.com',
        web: 'https://www.toysrus.com',
        image: {
            url: '',
            alt: ''
        },
        address: {
            state: "IL",
            country: "Israel",
            city: "Rishon Lezion",
            street: "HaReshon",
            houseNumber: 12,
            zip: 445566
        },
    },
    {
        title: "Tower Records",
        subtitle: "The best place to buy your favorite music on CD",
        description: "honestley it's a waste of time, you can easliy use streaming services to get better sound and a veraitey of music",
        phone: '046782233',
        email: 'yourlocalstore@towerrecords.com',
        web: 'https://www.towerrecords.com',
        image: {
            url: '',
            alt: ''
        },
        address: {
            state: "IL",
            country: "Israel",
            city: "Hadera",
            street: "Hanashe",
            houseNumber: 14,
            zip: 556677
        },
    }
];

const createCardMockData = async () => {
    try {
        let cards = await Card.find();
        let users = await User.find();
        let user_id = users[0]._id.toString();
        let bizNumber = await generateBizNumber()

        if (cards.length == 0) {
            mockCards.forEach(async (card) => {
                await createCard({ ...card, user_id: user_id, bizNumber: bizNumber });
            });
            return
        };

        return
    } catch (error) {
        console.log('something Went Wrong');

    }
};

module.exports = createCardMockData;