<template>
  <div id="app">
    <div>
      <div class="header-box">
          <router-link to="/home">
            <span  class="header-text">
            集体经济组织网络服务平台演示系统
          </span>
          </router-link>
      </div>
      <div class="main">
        <router-view/>
      </div>
    </div>

  </div>
</template>

<style lang="scss" >
  html{
    width: 100%;
    height: 100%;
    font-size: 62.5%;
  }
  body{
    width: 100%;
    height: 100%;
  }
  *{
    padding: 0 0;
    margin: 0 0;
  }
  a{
      text-decoration:none;
      out-line: none
  }
  .header-box{
    width: 100%;
    background:#545c64;
    text-align: center;
    position: absolute;
    top: 0;
  }
  .header-text{
    color: #fff;
    line-height: 60px;
    font-size: 20px;
    letter-spacing:3px;
  }
  .main{
    margin-top: 60px;
    min-height: 100vh;
    width: 100%;
    background-image: url("./assets/image/11.png");
    background-size: cover;
    background-position: center;


  }
</style>
