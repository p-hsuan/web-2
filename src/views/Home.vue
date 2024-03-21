<template>
    <!-- https://ip-api.com/ -->
    <div class="chatroom-wrap">
        <TheHeader class="theheader" />
        <div class="chatroom">
            <div class="ad">
                <span
                    class="symbol"
                    @click="paste"
                    v-for="item in symbolList"
                    :key="item"
                    >{{ item }}</span
                >
                <!-- <span class="symbol" @click="paste">ϟ</span> -->
            </div>
            <div class="content">
                <div class="item" v-for="item in matchList" :key="item">
                    <button
                        :ref="item.ipAddress"
                        @click="ipState(item.ipAddress)"
                        :class="{
                            copy: item.ipAddress == btnip ? true : false,
                        }"
                        class="ip-wrapper"
                    >
                        {{ item.ipAddress }}
                    </button>
                    <div class="text-wrapper">
                        <div class="text">{{ item.content }}</div>
                    </div>
                    <div class="posttime-wrapper">
                        <div class="posttime">
                            <span>{{ item.time.year }}/</span>
                            <span>{{ item.time.month }}/</span>
                            <span>{{ item.time.day }}&nbsp;</span>
                            <span>{{ item.time.hour }}:</span>
                            <span>{{ item.time.minute }}:</span>
                            <span>{{ item.time.second }}</span>
                        </div>
                    </div>
                </div>
                <!-- old v -->
                <!-- {{ new Date(item.created * 1000).toISOString().substr(11, 2) }}:
                {{ new Date(item.created * 1000).toISOString().substr(14, 2) }}:
                {{ new Date(item.created * 1000).toISOString().substr(17, 2) }} -->
            </div>
        </div>

        <!-- input -->
        <div class="sent">
            <div class="match">
                <span>Content :</span>
                <input
                    class="input"
                    v-model="matchInfo"
                    placeholder=""
                    type="text"
                />
                <div class="post-wrap">
                    <button ref="post" class="post" @click="post">Post</button>
                </div>
                <div class="post-refresh">
                    <button class="refresh" @click="updateMessage">Refresh</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TheHeader from '../components/TheHeader.vue'
// import { db, dbBefore } from '../firebase/init.js'
import { db } from '../firebase/init.js'

export default {
    name: 'Home',
    data() {
        return {
            ip: null,
            matchInfo: '',
            postTime: null,
            postTimeSecond: null,
            matchList: [],
            copy: false,
            btnip: null,
            // symbol List
            symbolList: [
                '🍏', '🍎', '🍐', '🍊', '🍉', '🍇', '🍓',
                '🍈', '🍒', '⚽', '🏀', '🚽', '🚀', '🛸',
                '🔨', '🍰', '🍔', '🥝', '🌏', '🌈', '☔',
                '☕', '🦎', '💎', '🎃', '🥩', '🦄', '🐢',
                '🐶', '🐬', '🦉'],
        }
    },
    computed: {
        zzz() {
            this.matchList.forEach((element) => {
                const item = element
                item.time = {
                    year: new Date(item.time).getFullYear(),
                    hour:
                        new Date(item.time).getMonth() < 10
                            ? `0${new Date(item.time).getMonth()}`
                            : new Date(item.time).getMonth(),
                }
            })
            return this.matchList
        },
    },
    methods: {
        post() {
            // ============
            // const time = Date.now()
            // ============
            const hour = new Date(Date.now()).getHours(Date.now())
            const minute = new Date(Date.now()).getMinutes(Date.now())
            const second = new Date().getSeconds(Date.now())
            this.postTime = `${hour}:${minute}:${second}`
            this.postTimeSecond = hour * 3600 + minute * 60 + second
            db.collection('person')
                .doc(this.ip)
                .set({
                    ipAddress: this.ip,
                    content: this.matchInfo,
                    created: this.postTimeSecond,
                    // =====
                    time: {
                        time: Date.now(),
                        year: new Date(Date.now()).getFullYear(),
                        month:
                            new Date(Date.now()).getMonth() + 1 < 10
                                ? `0${new Date(Date.now()).getMonth() + 1}`
                                : new Date(Date.now()).getMonth() + 1,
                        day:
                            new Date(Date.now()).getDate() < 10
                                ? `0${new Date(Date.now()).getDate()}`
                                : new Date(Date.now()).getDate(),
                        hour:
                            new Date(Date.now()).getHours() < 10
                                ? `0${new Date(Date.now()).getHours()}`
                                : new Date(Date.now()).getHours(),
                        minute:
                            new Date(Date.now()).getMinutes() < 10
                                ? `0${new Date(Date.now()).getMinutes()}`
                                : new Date(Date.now()).getMinutes(),
                        second:
                            new Date(Date.now()).getSeconds() < 10
                                ? `0${new Date(Date.now()).getSeconds()}`
                                : new Date(Date.now()).getSeconds(),
                    },
                    // =====
                })
                .then(() => {
                    db.collection('person')
                        .orderBy('created', 'desc')
                        .get()
                        .then((querySnapshot) => {
                            console.log('add list')
                            this.matchList = []
                            querySnapshot.forEach((queryDocumentSnapshot) => {
                                const pc = queryDocumentSnapshot.data()
                                this.matchList.push(pc)
                            })
                        })
                })
            // disable btn
            this.$refs.post.disabled = true

            new Promise((resolve) => {
                setTimeout(() => {
                    resolve('ok')
                }, 3000)
            }).then(() => {
                this.$refs.post.disabled = false
            })
            // fetch('https://worldtimeapi.org/api/ip')
            //     .then((response) => response.json())
            //     .then((timeNow) => {
            //         const hour = new Date().getHours(timeNow.datetime)
            //         const minute = new Date().getMinutes(timeNow.datetime)
            //         const second = new Date().getSeconds(timeNow.datetime)
            //         this.postTime = `${hour}:${minute}:${second}`
            //         this.postTimeSecond = hour * 3600 + minute * 60 + second
            //         console.log(55555)
            //     })
            //     .then(() => {
            //         db.collection('person').doc(this.ip).set({
            //             ipAddress: this.ip,
            //             content: this.matchInfo,
            //             created: this.postTimeSecond,
            //         })
            //     })
            //     .then(() => {
            //         db.collection('person')
            //             .orderBy('created')
            //             .get()
            //             .then((querySnapshot) => {
            //                 querySnapshot.forEach((queryDocumentSnapshot) => {
            //                     const pc = queryDocumentSnapshot.data()
            //                     this.list.push(pc)
            //                 })
            //             })
            //     })
            // delete data
        },
        toHome() {
            window.location.reload()
        },
        ipState(ip) {
            // console.log(ip)
            // console.log(this.$refs[ip])
            // this.copy = true
            // 建立 Range 物件
            const range = document.createRange()
            // 將指定元素內容加到 Range 中
            // const ip = this.$refs.ip
            range.selectNode(this.$refs[ip])
            // 取得 Selection 物件
            const selection = window.getSelection()
            // 先清空當前選取範圍
            selection.removeAllRanges()
            // 加入 Range
            selection.addRange(range)
            document.execCommand('copy')
            selection.removeAllRanges()
            // this.$refs.ip.select()
            // document.execCommand('copy')
            // when click add css
            this.btnip = this.$refs[ip].textContent
            // console.log(this.$refs[ip].textContent)
            // :class="{ copy: item.ipAddress = btnip ? true : false }"
        },
        paste(e) {
            this.matchInfo = this.matchInfo.concat(e.target.innerText)
        },
        updateMessage() {
            // 把現在 db 內的 doc 和現在時間超過一小時的去掉
            const targetDel = db.collection('person')
            db.collection('person')
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((queryDocumentSnapshot) => {
                        const nowTime = Date.now()
                        const docTime = queryDocumentSnapshot.data().time.time
                        const diffHour = (nowTime - docTime) / 1000 / 3600
                        console.log(nowTime, docTime, diffHour)
                        if (diffHour > 1) {
                            targetDel.doc(queryDocumentSnapshot.id).delete()
                        }
                    })
                })
                .catch(() => {
                    console.log('111')
                })
            // ===============
            const tempMatchList = []
            db.collection('person')
                .orderBy('created', 'desc')
                .get()
                .then((querySnapshot) => {
                    // each doc push to array
                    querySnapshot.forEach((queryDocumentSnapshot) => {
                        const pc = queryDocumentSnapshot.data()
                        tempMatchList.push(pc)
                        // this.matchList.push(pc)
                    })
                })
                .catch(() => {
                    console.log('111')
                })
            console.log(222, tempMatchList)
            this.matchList = tempMatchList
            console.log(111, this.matchList)
        },
    },
    updated() {
        // console.log('updated')
    },
    created() {
        // get user ip
        fetch('https://api.ipify.org/?format=json')
            .then((response) => response.json())
            .then((data) => {
                this.ip = data.ip
            })

        // === old ===
        // db.collection('person')
        //     .orderBy('created', 'desc')
        //     .get()
        //     .then((querySnapshot) => {
        //         querySnapshot.forEach((queryDocumentSnapshot) => {
        //             const pc = queryDocumentSnapshot.data()
        //             this.list.push(pc)
        //         })
        //     })

        // delete
        // dbBefore.collection('state').doc('del').get().then((documentSnapshot) => {
        //     // 取得上一時段，刪除狀態
        //     const action = documentSnapshot.get('action')
        //     // action 處於 false 還沒刪除， 處於 true 代表完成
        //     if (!action) {
        //         // 處於未完成
        //         const targetDel = dbBefore.collection('person')
        //         dbBefore.collection('person').get().then((querySnapshot) => {
        //             console.log(querySnapshot)
        //             querySnapshot.forEach((queryDocumentSnapshot) => {
        //                 targetDel.doc(queryDocumentSnapshot.id).delete()
        //             })
        //         })
        //         db.collection('state').doc('del').set({ action: false })
        //         dbBefore.collection('state').doc('del').set({ action: true })
        //     }
        // })
        // === old ===

        // ===============
        // ===============
        // 把現在 db 內的 doc 和現在時間超過一小時的去掉
        const targetDel = db.collection('person')
        db.collection('person')
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((queryDocumentSnapshot) => {
                    const nowTime = Date.now()
                    const docTime = queryDocumentSnapshot.data().time.time
                    const diffHour = (nowTime - docTime) / 1000 / 3600
                    console.log(nowTime, docTime, diffHour)
                    if (diffHour > 1) {
                        targetDel.doc(queryDocumentSnapshot.id).delete()
                    }
                })
            })
            .catch(() => {
                console.log('111')
            })
        // ===============
        db.collection('person')
            .orderBy('created', 'desc')
            .get()
            .then((querySnapshot) => {
                // each doc push to array
                querySnapshot.forEach((queryDocumentSnapshot) => {
                    const pc = queryDocumentSnapshot.data()
                    this.matchList.push(pc)
                })
            })
            .catch(() => {
                console.log('111')
            })
        // ===============
        // get post time
    },
    components: {
        TheHeader,
    },
}
</script>

<style lang="scss" scoped>
@import '../sass/self.scss';

* {
    border-style: none;
    box-sizing: border-box;
}
.chatroom-wrap {
    // 撐滿 100vh 給 chatroom 高彈性用
    height: 100%;
    @include rwd(md) {
        // height: auto;
    }
}

// there are three part in chatroom-wrap
.theheader {
    height: 10%;
    // border: 1px solid blue;
    @include rwd(md) {
        height: 7%;
    }
}

.chatroom {
    height: 75%;
    // min-height: 500px;
    // max-height: 600px;

    // for seperater send and chatroom
    border-bottom: 2px solid rgb(114, 63, 30);
    overflow: hidden;
    padding: 0 10px 10px 10px;
    // margin-bottom: 30px;

    display: flex;

    @include rwd(lg) {
        // ad content 垂直
        flex-direction: column;
    }
    @include rwd(md) {
        height: 75%;
    }
    // border: 1px solid blue;
    .ad {
        width: 15%;
        // border: 1px solid rgb(233, 148, 37);
        // border: 1px solid blue;
        @include rwd(lg) {
            width: 100%;
            // reduce height
            // height: 10%;
        }
    }
    .content {
        border: 1px solid rgb(94, 94, 94);
        // flex: 0 1 85%;
        width: 85%;
        @include rwd(lg) {
            width: 100%;
            // reduce height
            height: 100%; // 對到chatroom 70%
        }
    }
}

// each pc
.item {
    padding: 5px;
    margin-bottom: 10px;

    display: flex;
    border-bottom: 1px solid rgb(109, 107, 107);

    @include rwd(sm) {
        // 目的是要讓 posttime 可以掉到下面
        flex-wrap: wrap;
    }
    // 每一個 item 要分 content
    .ip-wrapper {
        border: 1px solid rgb(129, 181, 211);

        padding: 3px 0px;

        // ip button 不伸縮，維持一定大小
        width: 130px;

        display: flex;
        // 因水平寬要設定大於 ip 才好看，就有多餘的空間，用這個水平置中
        justify-content: center;
        color: #b3c1c3;
        // background-color: #2e3a3f;
        background: linear-gradient(to bottom, #51646d, #1e2222);
        cursor: pointer;
        &:active {
            position: relative;
            top: 1.5px;
        }
        @include rwd(sm) {
            width: 105px;
            padding: 2px 0px;
        }
    }
    .copy {
        background: linear-gradient(to bottom, #101313, #3f4e55);
        background: linear-gradient(to bottom, #003391, #003391);
    }
    .text-wrapper {
        display: flex;
        align-items: center;

        margin: 0 15px 0 15px;
        width: calc(100% - 130px - 15px - 15px - 140px);
        // border: 1px solid rgb(255, 187, 0);
        @include rwd(sm) {
            margin: 0 0 0 15px;
            width: calc(100% - 105px - 15px);
        }
        .text {
            color: #aeb2b3;
            // flex: 1 1 auto;
            // 保持一行
            white-space: nowrap;
            overflow: hidden;
        }
    }
    .posttime-wrapper {
        width: 140px;
        color: rgb(189, 167, 69);
        // 垂直置中 posttime用
        display: flex;
        align-items: center;

        @include rwd(md) {
            width: 100%;
            font-size: 10px;

            margin-top: 5px;
        }
        /* .posttime {
        } */
    }
}

.sent {
    // > md part
    // border: 1px solid yellow;
    height: 15%;
    // for mobile becasue to small
    @include rwd(md) {
        height: 18%;
    }

    padding-left: 21%;

    // center match
    display: flex;
    align-items: center;
    @include rwd(lg) {
        padding-left: 5%;
    }
    @include rwd(md) {
        // padding-left: 4%;
        // 直接置中
        padding-left: 0%;
        justify-content: center;
    }
    .match {
        display: flex;
        align-items: center;
        // border: 1px solid rgb(63, 230, 30);
        @include rwd(md) {
            flex-wrap: wrap;

            // match離邊有距離
            padding: 0 10px;
            .post-wrap {
                margin-top: 5px;
                flex: 0 1 50%;
            }
            .post-refresh {
                margin-top: 5px;
                flex: 0 1 50%;
            }
        }
        span {
            color: #b3c1c3;
            font-size: 18px;

            margin-right: 15px;
        }
        .input {
            flex: 1 1 auto;
            // width: 100%;
            height: 15px;
            margin-right: 20px;

            font-size: 20px;
            color: #b3c1c3;

            background: #1c1b22;
            border: 1px solid #1c1b22;
            border-radius: 3px;
            padding: 15px;
            outline: none;

            transition: all 0.2s;
            &:focus {
                box-shadow: 0 0 1px 1px rgb(197, 197, 197);
            }
        }

        .post {
            width: 60px;
            height: 30px;

            margin-right: 15px;

            background-color: #332872;
            // border: 1px solid #1C1B22;
            border-radius: 5px;
            color: #b3c1c3;
            transition: 0.1s;
            cursor: pointer;
            font-size: 15.5px;
            &:hover {
                transform: scale(1.09);
            }
            &:active {
                background: olive;
            }
        }
        .refresh {
            padding: 8px 10px;

            margin-right: 15px;

            background-color: #0a262b;
            // border: 1px solid #1C1B22;
            border-radius: 5px;
            color: #b3c1c3;
            transition: 0.1s;
            cursor: pointer;
            font-size: 15.5px;
            &:hover {
                transform: scale(1.09);
            }
        }
    }
}

.symbol {
    color: white;
    cursor: pointer;
}
</style>
