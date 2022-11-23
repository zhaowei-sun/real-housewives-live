const { SuperUser, Room } = require('../models/model.js');

const raw_data = [
    {
        room: 'LisaB',
        roomFranchise: 'RHOSLC',
        roomName: 'Lisa Barlow',
        roomIcon: 'lb',
        messages: [],
    },
    {
        room: 'JenS',
        roomFranchise: 'RHOSLC',
        roomName: 'Jen Shah',
        roomIcon: 'js',
        messages: [],
    },
    {
        room: 'MeredithM',
        roomFranchise: 'RHOSLC',
        roomName: 'Meredith Marks',
        roomIcon: 'mm',
        messages: [],
    },
    {
        room: 'WhitneyR',
        roomFranchise: 'RHOSLC',
        roomName: 'Whitney Rose',
        roomIcon: 'wr',
        messages: [],
    },
    {
        room: 'HeatherG',
        roomFranchise: 'RHOSLC',
        roomName: 'Heather Gay',
        roomIcon: 'hg',
        messages: [],
    },
    {
        room: 'AngieH',
        roomFranchise: 'RHOSLC',
        roomName: 'Angie Harrington',
        roomIcon: 'ah',
        messages: [],
    },
    {
        room: 'AngieK',
        roomFranchise: 'RHOSLC',
        roomName: 'Angie Katsanevas',
        roomIcon: 'ak',
        messages: [],
    },
    {
        room: 'DannaN',
        roomFranchise: 'RHOSLC',
        roomName: 'Danna Bui-Negrete',
        roomIcon: 'dbn',
        messages: [],
    },
    {
        room: 'CrystalM',
        roomFranchise: 'RHOBH',
        roomName: 'Crystal Kung Minkoff',
        roomIcon: 'cm',
        messages: [],
    },
    {
        room: 'KyleR',
        roomFranchise: 'RHOBH',
        roomName: 'Kyle Richards',
        roomIcon: 'kr',
        messages: [],
    },
    {
        room: 'LisaR',
        roomFranchise: 'RHOBH',
        roomName: 'Lisa Rinna',
        roomIcon: 'lr',
        messages: [],
    },
    {
        room: 'GarcelleB',
        roomFranchise: 'RHOBH',
        roomName: 'Garcelle Beauvais',
        roomIcon: 'gb',
        messages: [],
    },
    {
        room: 'ErikaJ',
        roomFranchise: 'RHOBH',
        roomName: 'Erika Jane',
        roomIcon: 'ej',
        messages: [],
    },
    {
        room: 'DoritK',
        roomFranchise: 'RHOBH',
        roomName: 'Dorit Kemsley',
        roomIcon: 'dk',
        messages: [],
    },
    {
        room: 'SuttonS',
        roomFranchise: 'RHOBH',
        roomName: 'Sutton Stracke',
        roomIcon: 'ss',
        messages: [],
    },
    {
        room: 'DianaJ',
        roomFranchise: 'RHOBH',
        roomName: 'Diana Jenkins',
        roomIcon: 'dj',
        messages: [],
    },
    {
        room: 'KathyH',
        roomFranchise: 'RHOBH',
        roomName: 'Kathy Hilton',
        roomIcon: 'kh',
        messages: [],
    },
    {
        room: 'ShereeZ',
        roomFranchise: 'RHOBH',
        roomName: 'Sheree Zampino',
        roomIcon: 'sz',
        messages: [],
    },
]

raw_data.forEach(room => {
    Room.create(room);
})

const raw_data_sp = [
    {
        username: 'Jen Shah',
        email: 'jenshah@g.com',
        room: 'JenS',
        password: '666666',
        favorites: []
    }
]

raw_data_sp.forEach(sp => {
    SuperUser.create(sp);
})


//Room.create({room: 3, messages: []})