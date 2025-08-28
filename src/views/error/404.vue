<template>
  <div class="main">
    <div class="logo-wrapper">
      <img src="@/assets/logo.png" alt="">
    </div>
    <div class="content">
      <div class="bullshit__oops">
        404
      </div>
      <div class="bullshit__headline">
        找不到网页！
      </div>
      <div class="bullshit__info">
        对不起，您正在寻找的页面不存在。尝试检查URL的错误，然后按浏览器上的刷新按钮或尝试在我们的应用程序中找到其他内容。
      </div>
      <router-link to="/" class="fancy">

        <span class="top-key"></span>
        <span class="text">返回首页</span>
        <span class="bottom-key-1"></span>
        <span class="bottom-key-2"></span>
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
a {
  text-decoration: none;
}

.logo-wrapper {
  position: absolute;
  top: vw(20);
  left: vw(20);
  width: vw(200);

  img {
    width: 100%;
  }
}

.main {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: url("@/assets/screen/bg.webp") no-repeat center center;
  background-size: cover;
  @include flex-center;
  position: relative;

  .content {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: vw(20);

    .bullshit__oops {
      font-size: vw(200);
      font-weight: 700;
      color: #eeeeeed2;
      line-height: 1;
    }

    .bullshit__headline {
      font-size: vw(20);
      color: #c4e3ff;
    }

    .bullshit__info {
      width: vw(600);
      font-size: vw(16);
      margin: vw(10) 0;
      color: #aaaaaa;
      text-align: center;
    }

    /* From Uiverse.io by cssbuttons-io */
    .fancy {
      background-color: transparent;
      border: 2px solid #eeeeeed2;
      border-radius: 0;
      box-sizing: border-box;
      color: #fff;
      cursor: pointer;
      display: inline-block;
      font-weight: 700;
      letter-spacing: 0.05em;
      margin: 0;
      outline: none;
      overflow: visible;
      padding: .8em 2em;
      position: relative;
      text-align: center;
      text-decoration: none;
      text-transform: none;
      transition: all 0.3s ease-in-out;
      user-select: none;
      font-size: 13px;
    }

    .fancy::before {
      content: " ";
      width: 1.5625rem;
      height: 2px;
      background: rgba(255, 255, 255, 0.205);
      top: 50%;
      left: 1.5em;
      position: absolute;
      transform: translateY(-50%);
      transform-origin: center;
      transition: background 0.3s linear, width 0.3s linear;
    }

    .fancy .text {
      font-size: 1.125em;
      line-height: 1.33333em;
      padding-left: 2em;
      display: block;
      text-align: left;
      transition: all 0.3s ease-in-out;
      text-transform: uppercase;
      text-decoration: none;
      color: rgb(255, 255, 255);
    }

    .fancy .top-key {
      height: 2px;
      width: 1.5625rem;
      top: -2px;
      left: 0.625rem;
      position: absolute;
      background: #021641;
      transition: width 0.5s ease-out, left 0.3s ease-out;
    }

    .fancy .bottom-key-1 {
      height: 2px;
      width: 1.5625rem;
      right: 1.875rem;
      bottom: -2px;
      position: absolute;
      background: #021641;
      transition: width 0.5s ease-out, right 0.3s ease-out;
    }

    .fancy .bottom-key-2 {
      height: 2px;
      width: 0.625rem;
      right: 0.625rem;
      bottom: -2px;
      position: absolute;
      background: #021641;
      transition: width 0.5s ease-out, right 0.3s ease-out;
    }

    .fancy:hover {
      color: white;
      background: rgba(5, 113, 214, 0.301);
    }

    .fancy:hover::before {
      width: 0.9375rem;
      background: white;
    }

    .fancy:hover .text {
      color: white;
      padding-left: 1.5em;
    }

    .fancy:hover .top-key {
      left: -2px;
      width: 0px;
    }

    .fancy:hover .bottom-key-1,
    .fancy:hover .bottom-key-2 {
      right: 0;
      width: 0;
    }
  }
}
</style>
