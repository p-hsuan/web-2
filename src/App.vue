<template>
    <!-- <div class="nav">
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
        <router-link :to="{ name: 'room' }">Room</router-link>
    </div> -->
    <div class="main-wrap">
        <div class="left"></div>
        <div class="main">
            <router-view />
        </div>
        <div class="right"></div>
    </div>
</template>

<script>
export default {
    name: 'app',
}
</script>

<style lang="scss">
@import './sass/self.scss';

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
.main-wrap {
    display: flex;
    .left {
        flex: 1 1 auto;
        background-color: #2b2a33;
    }
    .main {
        flex: 0 1 80%;
        width: 80%;
        height: 100vh;
        @include rwd(md) {
            flex: 0 1 100%;
        }
        // border: 1px solid red;
        min-height: 580px;
        // padding-bottom: 20px;
        background-image: linear-gradient(
                rgba(0, 0, 0, 0.7),
                rgba(0, 0, 0, 0.7)
            ),
            url('./assets/wallpaper.jpg');
        background-position: 50% 50%;
        background-size: cover;
        background-repeat: no-repeat;
        opacity: 0.9;
        // color: #2c3e50;
    }
    .right {
        flex: 1 1 auto;
        background-color: #2b2a33;
    }
}
</style>
