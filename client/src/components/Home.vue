<template>
    <div>
        <h1>{{ msg }}</h1>
        <a href="http://localhost:5000/game">Games Library</a>
    </div>
</template>
<script>
import axios from 'axios';
export default {
   name:'Home',
   data(){
    return{
        msg:"",
    }
   },
   methods:{
     getRes(){
        const path = "http://localhost:4500";
        axios.get(path)
        .then((res)=> this.msg = res.data)
        .catch((error)=> console.log(error));
     }
   },
   created(){
    this.getRes();
   }
}
</script>
<style scoped>
h1{
    text-align: center;
}
a{
    display: block;
    font-size: 23px;
    text-align: center;
    text-decoration: none;
}
a:hover{
    color: red;
}
</style>