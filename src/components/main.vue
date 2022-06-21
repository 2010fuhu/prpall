<template>
<div>
<keep-alive include="proposalno">
    <router-view ></router-view>
</keep-alive> 
    <!-- <router-view  v-if="!$route.meta.keepAlive"></router-view> -->
</div>
</template>

<script>

//export default {};
</script>
