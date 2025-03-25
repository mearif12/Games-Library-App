<template>
    <div class="jumbotron vertical-center">
    <div class="container">
        <link rel="stylesheet" 
        href="https://cdn.jsdelivr.net/npm/bootswatch@4.5.2/dist/sketchy/bootstrap.min.css"
        integrity="sha384-RxqHG2ilm4r6aFRpGmBbGTjsqwfqHOKy1ArsMhHusnRO47jcGqpIQqlQK/kmGy9R" 
        crossorigin="anonymous">
        <p class="lib">Games Library 🎮 </p>
        <hr> <br>

        <p class="text-success text-center">{{ msg }}</p>

        <button type="button" class="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#gameModal">
          Add Game
        </button>
        <div class="modal fade" id="gameModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <p class="modal-title" id="gameModalLabel">
                            Add New Game
                        </p>
                        <button 
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close">
                        </button>
                    </div>
                    <form @submit.prevent="addGame">
                    <div class="modal-body">
                        <label for="title" id="play">Title : </label> <br>
                            <input type="text" placeholder="Enter title" name="title" required v-model="nGame.title"><br>
                        <label for="genre" id="play">Genre : </label> <br>    
                            <input type="text" placeholder="Enter genre" name="genre" required v-model="nGame.genre"><br><br>
                            <div class="d-flex align-items-center mt-0">
                                <input type="checkbox" id="check"  v-model="nGame.played">
                                <label for="played" id="play">played?</label>
                            </div>
                    </div>        
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary">Add</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
        <br><br>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Genre</th>
                    <th scope="col">Played?</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(game,index) in games" :key="index">
                    <td>{{ game.title }}</td>
                    <td>{{ game.genre }}</td>
                    <td>{{ game.played ? "Yes" : "No" }}</td>                
                    <td>
                        <span class="btn-group" role="group">
                             <button type="button" class="btn btn-info btn-sm" data-bs-toggle="modal" data-bs-target="#updateModal"
                             @click="selectedGame = { ...game }">Update</button>
                             <button type="button" class="btn btn-danger btn-sm" @click="popGame(game.id)">Delete</button>
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
        <p class="text-center foot rounded-4 bg-secondary p-2">Copyrght &copy; ME Arifur Rahman. All Rights Reserved 2025</p>
        <div class="modal fade" id="updateModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <p class="modal-title" id="updateModalLabel">
                            Update Game
                        </p>
                        <button 
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close">
                        </button>
                    </div>
                    <form @submit.prevent="updateGame">
                    <div class="modal-body">
                        <label for="title" id="play">Title : </label> <br>
                            <input type="text" placeholder="Enter title" name="title" required v-model="selectedGame.title"><br>
                        <label for="genre" id="play">Genre : </label> <br>    
                            <input type="text" placeholder="Enter genre" name="genre" required v-model="selectedGame.genre"><br><br>
                            <div class="d-flex align-items-center mt-0">
                                <input type="checkbox" id="check"  v-model="selectedGame.played">
                                <label for="played" id="play">played?</label>
                            </div>
                    </div>        
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary">Update</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name:'Game',
    data(){
        return{
            games : [],
            nGame:{
                title:"",
                genre:"",
                played:false
            },
            selectedGame:{
                title: "",
                genre: "",
                played: false
            },
            msg:""
        }
    },
    methods : {
        getGames(){
            const path = "http://localhost:4500/games";
            axios.get(path)
            .then((res)=> this.games = res.data.Games)
            .catch((error)=> console.log(error));
        },
        addGame(){
            const path = "http://localhost:4500/games";
            axios.post(path,this.nGame)
            .then((res)=>{
                this.games.push(res.data.game);
                this.nGame = { title: "", genre: "", played:false };
                this.msg = "Game Added";
                setTimeout(()=>(this.msg= ""),4000);
                document.querySelector('#gameModal .btn-close').click(); 
            })
            .catch((error)=>{
                window.alert("Failed to add new Game");
                console.log(error);
            });
        },
        updateGame(){
            const path = `http://localhost:4500/games/${this.selectedGame.id}`;
            axios.put(path,this.selectedGame)
            .then((res)=>{
                this.getGames();
                this.selectedGame = { title: "", genre: "", played:false };
                this.msg = "Game Updated";
                setTimeout(()=>(this.msg= ""),4000);
                document.querySelector('#updateModal .btn-close').click(); 
            })
            .catch((error)=>{
                window.alert("Failed to Update");
                console.log(error);
            });
        },
        popGame(gameId){
            const path = `http://localhost:4500/games/${gameId}`;
            axios.delete(path)
            .then((res)=>{
                this.getGames();
                this.msg = "Game Deleted";
                setTimeout(()=>{
                    this.msg="";   
                },4000);
            })
            .catch((error)=>{
                window.alert("Failed to delete");
                console.log(error);
            });
        }
    },
    created(){
        this.getGames();
    }
}
</script>
<style scoped>
.lib{
    text-align: center;
    font-size: 70px;
}
#gameModal{
    font-size: 30px;
}
input{
    margin-top: 0px;
    height: 24px;
    font-size: 18px;
    width: 42%;
}
#play{
    font-size: 17px;
    margin-left: 8px;
    margin-top: 7px;
}
#check{
    width: 1px;
    margin-top: 34px;
    margin-left: 23px;
}
.foot{
    margin-top: 30px;
}
.modal-body{
    margin-top: -15px;
    margin-bottom: -38px;
}
</style>