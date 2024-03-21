<template>
    <div class="about">
        <h1>This is an about page</h1>
    </div>
</template>

<script>
fetch('http://worldtimeapi.org/api/ip')
    .then((response) => response.json())
    .then((timeInfo) => {
        console.log(new Date().getMinutes(new Date(timeInfo.datetime)) - 30)
    })

export default {}
</script>
