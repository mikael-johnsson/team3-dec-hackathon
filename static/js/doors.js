const doors = [
    {
        id: "door1",
        date: new Date('2024-12-01T00:00:00'),
        content: {
            text:"Did you know that December 1st marks the official beginning of Advent in many Christian traditions?",
            img: "images/doors/Door1-people-around-tree.jpg",
        }
    },
    {
        id: "door2",
        date: new Date('2024-12-02T00:00:00'),
        content: {
            text: "It takes about 15 years to grow the average Christmas tree. That’s a long time to wait for a decoration!",
            img: "images/doors/Door2-tree-by-fire.jpg",
        }
    },
    {
        id: "door3",
        date: new Date('2024-12-03T00:00:00'),
        content: {
            text: "I come with many colors, very big and bright, I turn so many houses into a beautiful sight. What am I?",
            img: "images/doors/Door3-cartoony-children-by-fire.jpg",
        } 
    },
    {
        id: "door4",
        date: new Date('2024-12-04T00:00:00'),
        content: {
            text: "We all love Jingle Bells, but have you ever noticed that the song doesn’t have the word Christmas in it? That’s because it wasn’t originally a Christmas song!",
            img: "images/doors/Door4-snowman-house.jpg",
        }
    },
    {
        id: "door5",
        date: new Date('2024-12-05T00:00:00'),
        content: {
            text: "The first recorded Christmas card was sent in 1843 in England by Sir Henry Cole. He commissioned a card of festive design, and it featured a family celebrating Christmas dinner.",
            img: "images/doors/Door5-wreath.png",
        } 
    },
    {
        id: "door6",
        date: new Date('2024-12-06T00:00:00'),
        content: {
            text: "In the Netherlands, the Christmas season officially starts on December 7th with the arrival of Sinterklaas, who sails into towns on a steamboat.",
            img: "images/doors/Door6-forest.png",
        }
    },
    {
        id: "door7",
        date: new Date('2024-12-07T00:00:00'),
        content: {
            text: "Fun fact Santa has an official pilot’s license! In 1927, the US government officially issued Santa with a pilot’s license!",
            img: "images/doors/Door7-sleigh.png",
        }
    },
    {
        id: "door8",
        date: new Date('2024-12-08T00:00:00'),
        content:  {
            text: "What do you get if you cross Santa with a duck? A Christmas Quacker",
            img: "images/doors/Door8-bell.png",
        } 
    },
    {
        id: "door9",
        date: new Date('2024-12-09T00:00:00'),
        content: {
            text: "The world’s tallest Christmas tree was 221ft high and was displayed in a Washington shopping mall in 1950.",
            img: "images/doors/Door9-Santa.png",
        }
    },
    {
        id: "door10",
        date: new Date('2024-12-10T00:00:00'),
        content: {
            text: "What does Santa do when his elves misbehave? He gives them the sack.",
            img: "images/doors/Door10-santa.jpg",
        }
    },
    {
        id: "door11",
        date: new Date('2024-12-11T00:00:00'),
        content: {
            text: "In Italy, December 16th marks the beginning of “La Novena,” a nine-day prayer tradition leading up to Christmas.",
            img: "images/doors/Door11-snowglobe.jpg",
        } 
    },
    {
        id: "door12",
        date: new Date('2024-12-12T00:00:00'),
        content: {
            text: "I'm a cookie you might like to eat, and some might say I'm a favored Christmas treat. I have brown arms, eyes and don't forget my feet. What am I?",
            img: "images/doors/Door12-reindeer.jpg",
        } 
    },
    {
        id: "door13",
        date: new Date('2024-12-13T00:00:00'),
        content: {
            text: "St. Lucia Day is celebrated on December 13th, especially in Sweden, Norway, and Finland. The day honors St. Lucia, who is known for bringing light during the dark winter months.",
            img: "images/doors/Door13-stocking.jpg",
        }
    },
    {
        id: "door14",
        date: new Date('2024-12-14T00:00:00'),
        content: {
            text: "What do you call an obnoxious reindeer? Rude-olph",
            img: "images/doors/Door14-presents.jpg",
        }
    },
    {
        id: "door15",
        date: new Date('2024-12-15T00:00:00'),
        content: {
            text: "The tradition of hanging stockings comes from the story of St. Nicholas. Legend has it that he dropped gold coins down the chimney of a poor family, and the coins landed in the stockings that were hanging by the fire to dry!.",
            img: "images/doors/Door15-presents.jpg",
        } 
    },
    {
        id: "door16",
        date: new Date('2024-12-16T00:00:00'),
        content: {
            text: "What do you call an elf who sings? A wrapper!",
            img: "images/doors/Door16-bauble.jpg",
        }
    },
    {
        id: "door17",
        date: new Date('2024-12-17T00:00:00'),
        content: {
            text: "The largest gingerbread house ever built was 1,110 square meters and 3.07 meters tall. It was built in Texas in 2013 as a charity fundraiser for a hospital",
            img: "images/santa_door1.jpg",
        } 
    },
    {
        id: "door18",
        date: new Date('2024-12-18T00:00:00'),
        content: {
            text:"this is a image of a snow globe",
            img: "images/pexels-daisatj-29749121.jpg",
        }
    },
    {
        id: "door19",
        date: new Date('2024-12-19T00:00:00'),
        content: {
            text: "On Christmas Eve, Santa leaves his workshop in the North Pole to deliver presents to all the good children. What direction does he travel?",
            img: "images/santa_door1.jpg",
        } 
    },
    {
        id: "door20",
        date: new Date('2024-12-20T00:00:00'),
        content: {
            text: "Jingle Bells. The popular Christmas song was originally written for Thanksgiving by James Pierpont. It was the first song played in space, during NASA's Gemini 6A mission in 1965.",
            img: "images/santa_door1.jpg",
        } 
    },
    {
        id: "door21",
        date: new Date('2024-12-21T00:00:00'),
        content: {
            text: "How did the bauble know that she was addicted to Christmas? She’d been hooked on Christmas trees all her life.",
            img: "images/santa_door1.jpg",
        }
    },
    {
        id: "door22",
        date: new Date('2024-12-22T00:00:00'),
        content: {
            text: "This is a image of a reindeer",
            img: "images/Reindeer_in_red.jpg",
        }
    },
    {
        id: "door23",
        date: new Date('2024-12-23T00:00:00'),
        content: {
            text: "What did the snowman say to the aggressive carrot? Get out of my face.",
            img: "images/santa_door1.jpg",
        } 
    },
    {
        id: "door24",
        date: new Date('2024-12-24T00:00:00'),
        content: {
            text: "I am a helpful creature, I'm not too big and not too small. Out of all my fellow reindeer, you could say I'm the fastest of them all. Who am I?",
            img: "images/santa_door1.jpg",
        } 
    },
]

export default doors;