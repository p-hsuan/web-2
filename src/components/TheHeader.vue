<template>
    <header class="head">
        <h1>AOE IPx</h1>
        <!-- <router-link to="/">Room</router-link> -->
        <!-- <router-link :to="{ name: 'room' }">Room</router-link>
        <router-link to="/about">About</router-link> -->
    </header>
</template>

<script>
export default {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../sass/self.scss';
h1 {
    color: #2bbb90;
    font-size: 24px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 500;
    // center text
    display: flex;
    align-items: center;
    @include rwd(md) {
        font-size: 20px;
    }
}

.head {
    display: flex;
    padding: 15px;
    @include rwd(md) {
        padding: 5px;
    }
    justify-content: center;
    a {
        padding: 5px 8px;

        // font-weight: bold;
        text-decoration: none;
        color: #2c3e50;
    }
    a.router-link-exact-active {
        color: #42b983;
    }
}
</style>
