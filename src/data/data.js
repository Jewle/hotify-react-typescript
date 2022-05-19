
const data = {
    tracks:[
        {
            trackCover:"https://i.scdn.co/image/ab67616d000048519929bb4e1fb3302a2abd6853",
            trackName:'I am Damnation',
            artistName:'Bleed From Within',
            addingDate:"11 дней назад",
            trackDuration:'4:20',
            album:'Single',
            src:"https://dl.muzonovs.ru/files/music/2021/11/bleed-from-within-i-am-damnation.mp3",
            albumId:0
        },
        {
            trackCover:"https://i.scdn.co/image/ab67616d00004851c66bb25a8554d2c8432e7d2f",
            trackName:'Путь',
            artistName:'XCHO',
            addingDate:"1 день назад",
            trackDuration:'2:29',
            album:'Single',
            albumId:1,
            src:'https://musicd.mycdn.me/v0/stream?id=v0_10091696658_1_1&cid=v0_10091696658_1_1&fid=123182166422619&uid=063975999128c9b6ef15d5a184e60756&sid=d014ce0a53f73ece4ad1e02d64dc8c55e1c04edcdb3ea0ce135a0deedad841ede7eef292f0a77b975804fa348ea217ac278f68ea3d3aa09cb280631bc4c82891&ts=1642334204952&md5=8e8bc8f5d637aba8d12b638eb80c3ad4&client=web&clientHash=149119229317123195187106111104941976424420115515517991211211199183205171113869914511515519583'
        },
        {
            trackCover:"https://i.scdn.co/image/ab67616d00004851e1e62a3cf107ffeb446f9291",
            trackName:'Only you',
            artistName:'XCHO, Пабло, ALEMOND',
            addingDate:"1 день назад",
            trackDuration:'3:46',
            album:'Single',
            albumId:2,
            src:'https://musicd.mycdn.me/v0/stream?id=v0_10085290023_1_1&cid=v0_10085290023_1_1&fid=123149341955201&uid=063975999128c9b6ef15d5a184e60756&sid=d014ce0a53f73ece4ad1e02d64dc8c55e1c04edcdb3ea0ce135a0deedad841ede7eef292f0a77b975804fa348ea217ac278f68ea3d3aa09cb280631bc4c82891&ts=1642334293648&md5=7fb80d6d7de8cf1575e1c4a3caa7eb58&client=web&clientHash=207555722322320911112522322317310312514691113225115209101115103745245220113153123208195223223'
        },
        {
            trackCover:"https://i.scdn.co/image/ab67616d00004851fff4c1e4c2e0534e6bfbde5b",
            trackName:'The way',
            artistName:'Egypt Central',
            addingDate:"1 день назад",
            trackDuration:'3:25',
            album:'Egypt Central',
            albumId:3,
            src:'https://musicd.mycdn.me/v0/stream?id=v0_10070699704_1_1&cid=v0_10070699704_1_1&fid=122937140352073&uid=063975999128c9b6ef15d5a184e60756&sid=d014ce0a53f73ece4ad1e02d64dc8c55e1c04edcdb3ea0ce135a0deedad841ede7eef292f0a77b975804fa348ea217ac278f68ea3d3aa09cb280631bc4c82891&ts=1642334354329&md5=2e79f5a9f780a54cce2b40c6f145dc8a&client=web&clientHash=14802238222314870236212613628260468222022782781102682114988473972201742061521221074'
        },
        {
            trackCover:"https://i.scdn.co/image/ab67616d00004851b5259c23afd536b2b440fe53",
            trackName:'Zombified',
            artistName:'Falling in Reverse',
            addingDate:"1 день назад",
            trackDuration:'3:38',
            album:'Single',
            albumId:4,
            src:'https://musicd.mycdn.me/v0/stream?id=v0_10098163462_1_1&cid=v0_10098163462_1_1&fid=123213872116803&uid=063975999128c9b6ef15d5a184e60756&sid=d014ce0a53f73ece4ad1e02d64dc8c55e1c04edcdb3ea0ce135a0deedad841ede7eef292f0a77b975804fa348ea217ac278f68ea3d3aa09cb280631bc4c82891&ts=1642334394480&md5=2c68f79f5bad4fce1e66380bad9f9a2f&client=web&clientHash=2102103504141321501101415442114350142081784646182061022021821389013818783415014013082'
        },
        {
            trackCover:"https://i.scdn.co/image/ab67616d000048511d33ac5f0a22fbf96b0c0961",
            trackName:'На грязном (Диана)',
            artistName:'Платина',
            addingDate:"1 день назад",
            trackDuration:'2:06',
            album:'Sosa Music',
            albumId:5,
            src:'https://musicd.mycdn.me/v0/stream?id=v0_10076727176_1_1&cid=v0_10076727176_1_1&fid=123054214009965&uid=063975999128c9b6ef15d5a184e60756&sid=d014ce0a53f73ece4ad1e02d64dc8c55e1c04edcdb3ea0ce135a0deedad841ede7eef292f0a77b975804fa348ea217ac278f68ea3d3aa09cb280631bc4c82891&ts=1642334469224&md5=483f5161cfd3617e2cae04665444137c&client=web&clientHash=14487522228228222132123212636192183339129228228111636016422822813021618848492165420415828572'
        }
    ]
        .map((track,idx)=>{
            const clonedTrack = {...track}
            clonedTrack.id=idx
            return clonedTrack
        }),
    artists:[
        {
            name:'Bad Omens',
            monthListeners:10000,
            isVerified:true,
            coverImg:{
                src:'https://i.scdn.co/image/ab67618600001016d09b37b1b97420f6d0ef2c5f',
                type:'img'
            }
        },
        {
            name:'XCHO',
            monthListeners:10000,
            isVerified:true,
            coverImg: {
                src: 'rgb(160, 96, 88)',
                type:'bg'
            }
        },
        {
            name:'Egypt Central',
            monthListeners:10000,
            isVerified:true,
            coverImg: {
                src: 'https://i.scdn.co/image/ab676186000010164ae5373ce26a0d0955ada756',
                type:'img'
            }
        }
    ]
}

export default data
