<template>

    <div class="logIn_user">
        
            <div class="image-container">
                <img class="logo" src="@/assets/mov-bike.svg" >
                <img class="map" src="@/assets/img-mov-bike.svg" alt="">
            </div>

            <div class="container_logIn_user">
                <div class="tab-login">
                    <h2>Bienvenido</h2>
                </div>
                <h1 class="title">Iniciar sesión</h1>

           
                <form class="inputs-container" v-on:submit.prevent="processLogInUser" >
                    <input class= "input" type="text" v-model="user.username" placeholder="Username">
                    <input class="input" type="password" v-model="user.password" placeholder="Password">
                    <button class="btn" type="submit">Iniciar sesión</button>
                    <p id="forgot"><span class="span">Olvidaste la contraseña</span></p>
                </form>

            </div>

    </div>
    

</template>


<script>

import axios from 'axios';

export default {
  name: 'Login',
  components: {

  },

  data: function () {
    return {
      user: {
        username: "",
        password: "",
      }
    }
  },


  methods: {
    processLogInUser: function () {
      axios.post(
        "https://open-move-and-flow-be.herokuapp.com/login/",
        this.user,
        {
          headers: {},
        })
        .then((result) => {
          console.log(result);
          let dataLogIn = {
            username: this.user.username,
            token_access: result.data.access,
            token_refresh: result.data.refresh,
          };
          localStorage.setItem("token",dataLogIn.token_access);
          localStorage.setItem("username",dataLogIn.username);
          this.$router.push('dashboard')
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status == "401")
            alert(
              "ERROR 401: Credenciales Incorrectas."
            );
        });
    },
  },
};
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

    :root {
        --login-bg:#ffffff;
        --title-bg: #5046AF;
        --red-span: #ED1C24;
        --button-bg: #5046AF;
    }

    *{
          border: 0px solid red;

    }

    body {
        height: 100vh;
        font-family: 'Poppins', sans-serif;
        background-image: linear-gradient(to left, #FFF5AA 0%, #6EE1FF 100%);
    }

    .logIn_user {
        height:35em;
        width: 55em;
        margin: 6em auto;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        overflow: hidden;
    }

    .container_logIn_user {
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding-top: 1.5rem;
        background-color: var(--login-bg);
        color: #5046AF;
    }

    .image-container {
        background-image: linear-gradient(to right, #AC5CFF 0%, #4948B1 100%);
        width: 60%;
        background-color: var(--image-bg);
        box-sizing: border-box;
        align-items: center;
    }

    .image-container .map {
        margin-top: 38%;
    }

    .image-container .logo {
        width: 200px;
        margin-top: 30px;
        margin-left: 50%;
    }

    .tab-login{
        background-image: linear-gradient(to left, #AC5CFF 0%, #4948B1 100%);
        margin-right: 50%;
        height: 50px;
        width: 200px;
        align-items: center;
        border-bottom-right-radius: 20px;
        border-top-right-radius: 20px;
        display: flex;
    }

    .tab-login > h2 {
        color: #FFFFFF;
        margin-left: 20%;
        font-weight: 300;
        font-size: 1.2em;
    }

    .title {
        text-transform: capitalize;
        font-size: 1.35rem;
        font-weight: 800;
        letter-spacing: 1px;
        color: var(--title-bg);
        padding-top: 20px;
    }


    .container_logIn_user > p {
        font-size: 1.15em;
        margin-top: 2.5em;
    }

    .inputs-container {
        height: 70%;
        width: 85%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        padding-top: 30px;
    }

    .input, .btn {
        width: 90%;
        height: 3.125rem;
        font-size: 1em;
    }

    .input {
        padding-left: 20px;
        border: none;
        border-bottom: 2px solid #5046AF;
        border-radius: 2px;
        font-weight: 600;
        letter-spacing: 1px;
        box-sizing: border-box;
        outline: 0;
    }

    ::placeholder{
        color:lightslategrey;
    }

    .input:hover {
        border: 2px solid var(--button-bg);
        border-radius: 5px;
    }


    .btn {
        width: 60%;
        letter-spacing: 1px;
        text-transform: uppercase;
        color: white;
        font-size: 0.8em;
        border: none;
        border-radius: 50px;
        background-image: linear-gradient(to left, #AC5CFF 0%, #4948B1 100%);
        cursor: pointer;
        margin-top: 50px;
        font-weight: 300;
    }

    .inputs-container p {
        margin-top: 0;
        padding-top: 20px;
        font-size: 15px;
        color: #5046AF;
    }

    .span {
        color: var(--red-span);
        font-weight: 600;
        cursor: pointer;
    }

    #forgot{
        float: left;
        border-bottom: 3px solid #5046AF;
        border-radius: 2px;
    }

    @media screen and (max-width: 1000px) {
        .logIn_user {
            width: 70%;
            margin-top: 3rem;
        }
        .container_logIn_user {
            width: 100%;
            border-radius: 5px;
        }
        
        .image-container {
            display: none;
        }  
    }

    @media screen and (max-width: 650px) {
        .logIn_user {
            width: 90%;
        }
    }

    @media screen and (max-width: 500px) {
        .logIn_user {
            height: 90%;
        }

        .social-login {
            flex-direction: column;
            align-items: center;
            height: 30%;
        }

        .container_logIn_user > p {
            margin: 0;
        }
    }

</style>
