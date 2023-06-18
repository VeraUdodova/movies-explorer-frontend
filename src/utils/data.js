const ownerId = 1;

const movies = [
    {
        _id: 1,
        nameRU: "33 слова о дизайне",
        duration: "1ч 42м",
        likes: [ownerId],
        thumbnail: "./film1.png",
        ownerId
    },
    {
        _id: 2,
        nameRU: "Киноальманах «100 лет дизайна»",
        duration: "1ч 25м",
        likes: [ownerId],
        thumbnail: "./film2.png",
        ownerId
    },
    {
        _id: 3,
        nameRU: "В погоне за Бенкси",
        duration: "2ч 1м",
        likes: [],
        thumbnail: "./film3.png",
        ownerId: 2
    },
    {
        _id: 4,
        nameRU: "Бег это свобода",
        duration: "1ч 52м",
        likes: [],
        thumbnail: "./film4.png",
        ownerId: 2
    }
];

const user = {
    _id: ownerId,
    name: "Вера",
    email: "email@example.com"
}

module.exports = {movies, user};
