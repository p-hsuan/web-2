import base01 from './basepart/0-1.js'
import base12 from './basepart/1-2.js'
import base23 from './basepart/2-3.js'
import base34 from './basepart/3-4.js'
import base45 from './basepart/4-5.js'
import base56 from './basepart/5-6.js'
import base67 from './basepart/6-7.js'
import base78 from './basepart/7-8.js'
import base89 from './basepart/8-9.js'
import base910 from './basepart/9-10.js'
import base1011 from './basepart/10-11.js'
import base1112 from './basepart/11-12.js'
import base1213 from './basepart/12-13.js'
import base1314 from './basepart/13-14.js'
import base1415 from './basepart/14-15.js'
import base1516 from './basepart/15-16.js'
import base1617 from './basepart/16-17.js'
import base1718 from './basepart/17-18.js'
import base1819 from './basepart/18-19.js'
import base1920 from './basepart/19-20.js'
import base2021 from './basepart/20-21.js'
import base2122 from './basepart/21-22.js'
import base2223 from './basepart/22-23.js'
import base2324 from './basepart/23-24.js'

const hour = new Date().getHours(Date.now())
const minute = new Date().getMinutes(Date.now())
const second = new Date().getSeconds(Date.now())
const timeSecond = hour * 3600 + minute * 60 + second

let firebaseConfig
let firebaseConfigBefore

if (timeSecond > 0 && timeSecond < 3600) {
    // 0-1
    firebaseConfigBefore = base2324
    firebaseConfig = base01
} else if (timeSecond > 3600 && timeSecond < 7200) {
    // 1-2
    firebaseConfigBefore = base01
    firebaseConfig = base12
} else if (timeSecond > 7200 && timeSecond < 10800) {
    // 2-3
    firebaseConfigBefore = base12
    firebaseConfig = base23
} else if (timeSecond > 10800 && timeSecond < 14400) {
    // 3-4
    firebaseConfigBefore = base23
    firebaseConfig = base34
} else if (timeSecond > 14400 && timeSecond < 18000) {
    // 4-5
    firebaseConfigBefore = base34
    firebaseConfig = base45
} else if (timeSecond > 18000 && timeSecond < 21600) {
    // 5-6
    firebaseConfigBefore = base45
    firebaseConfig = base56
} else if (timeSecond > 21600 && timeSecond < 25200) {
    // 6-7
    firebaseConfigBefore = base56
    firebaseConfig = base67
} else if (timeSecond > 25200 && timeSecond < 28800) {
    // 7-8
    firebaseConfigBefore = base67
    firebaseConfig = base78
} else if (timeSecond > 28800 && timeSecond < 32400) {
    // 8-9
    firebaseConfigBefore = base78
    firebaseConfig = base89
} else if (timeSecond > 32400 && timeSecond < 36000) {
    // 9-10
    firebaseConfigBefore = base89
    firebaseConfig = base910
} else if (timeSecond > 36000 && timeSecond < 39600) {
    // 10-11
    firebaseConfigBefore = base910
    firebaseConfig = base1011
} else if (timeSecond > 39600 && timeSecond < 43200) {
    // 11-12
    firebaseConfigBefore = base1011
    firebaseConfig = base1112
} else if (timeSecond > 43200 && timeSecond < 46800) {
    // 12-13
    firebaseConfigBefore = base1112
    firebaseConfig = base1213
} else if (timeSecond > 46800 && timeSecond < 50400) {
    // 13-14
    firebaseConfigBefore = base1213
    firebaseConfig = base1314
} else if (timeSecond > 50400 && timeSecond < 54000) {
    // 14-15
    firebaseConfigBefore = base1314
    firebaseConfig = base1415
} else if (timeSecond > 54000 && timeSecond < 57600) {
    // 15-16
    firebaseConfigBefore = base1415
    firebaseConfig = base1516
} else if (timeSecond > 57600 && timeSecond < 61200) {
    // 16-17
    firebaseConfigBefore = base1516
    firebaseConfig = base1617
} else if (timeSecond > 61200 && timeSecond < 64800) {
    // 17-18
    firebaseConfigBefore = base1617
    firebaseConfig = base1718
} else if (timeSecond > 64800 && timeSecond < 68400) {
    // 18-19
    firebaseConfigBefore = base1718
    firebaseConfig = base1819
} else if (timeSecond > 68400 && timeSecond < 72000) {
    // 19-20
    firebaseConfigBefore = base1819
    firebaseConfig = base1920
} else if (timeSecond > 72000 && timeSecond < 75600) {
    // 20-21
    firebaseConfigBefore = base1920
    firebaseConfig = base2021
} else if (timeSecond > 75600 && timeSecond < 79200) {
    // 21-22
    firebaseConfigBefore = base2021
    firebaseConfig = base2122
} else if (timeSecond > 79200 && timeSecond < 82800) {
    // 22-23
    firebaseConfigBefore = base2122
    firebaseConfig = base2223
} else if (timeSecond > 82800 && timeSecond < 86400) {
    // 23-24
    firebaseConfigBefore = base2223
    firebaseConfig = base2324
}

export default { firebaseConfig, firebaseConfigBefore }
