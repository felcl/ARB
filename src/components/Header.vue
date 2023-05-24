<script setup>
import { computed ,onMounted} from 'vue'
import { useStore } from 'vuex'
import { AddrHandle } from '../utils/tool'
import {connect,changeNetwork} from '../web3'
import {useRouter,useRoute} from 'vue-router'
import { useI18n } from "vue-i18n";
import HomeActiveIcon from '../assets/Home/HomeActiveIcon.png'
import HomeIcon from '../assets/Home/HomeIcon.png'
import blackHomeIcon from '../assets/Home/blackHomeIcon.png'
import StakeActiveIcon from '../assets/Home/StakeActiveIcon.png'
import StakeIcon from '../assets/Home/StakeIcon.png'
import blackStakeIcon from '../assets/Home/blackStakeIcon.png'
import RewardsIcon from '../assets/Home/RewardsIcon.png'
import blackRewardsIcon from '../assets/Home/blackRewardsIcon.png'
import RewardsActiveIcon from '../assets/Home/RewardsActiveIcon.png'
import logo from '../assets/Home/logo.png'
import blackLogo from '../assets/Home/blackLogo.png'
import blackMenu from '../assets/Home/blackMenu.png'
import Menu from '../assets/Home/menu.png'
import Lang from '../assets/Home/lang.png'
import blackLang from '../assets/Home/blackLang.png'
const router = useRouter()
const route = useRoute()
const store = useStore()
const { locale } = useI18n();
let address = computed(()=>{
  return store.state.address
})
const goPath=(path)=>{
  router.push(path)
}
function IconPath(path,activeIcon,Icon,blackIcon){
  if(route.path === path){
    return activeIcon
  }
  // return Icon
  if(route.path === '/'){
    return Icon
  }else{
    return blackIcon
  }
}
const Connect=()=>{
  if(!address.value){
    changeNetwork(()=>{
      connect((address)=>{
        store.commit('SETADDRESS',address)
      })
    })
  }
}
const leftMenuSwitch = () => {
  store.commit("SETLEFTMENU", !store.state.leftMenu);
};
const changeLang = (val) => {
  locale.value = val;
  localStorage.setItem("lang", val);
};
onMounted(()=>{
  console.log(route.path)
})
</script>

<template>
  <div class="Header">
    <div class="HeaderLeft">
      <img :src="route.path === '/' ? logo:blackLogo" class="Logo" alt="">
      <div class="menu">
        <div :class="['menuItem',{'blackFont':route.path !== '/'}]"  @click="goPath('/')">
          <img :src="IconPath('/',HomeActiveIcon,HomeIcon,blackHomeIcon)" alt="">
          <span>{{ $t("Home") }}</span>
        </div>
        <div :class="['menuItem',{'blackFont':route.path !== '/'}]" @click="goPath('/Dao')">
          <img :src="IconPath('/Dao',StakeActiveIcon,StakeIcon,blackStakeIcon)" alt="">
          <span>{{ $t("DAO") }}</span>
        </div>
        <div :class="['menuItem',{'blackFont':route.path !== '/'}]" @click="goPath('/Rewares')">
          <img :src="IconPath('/Rewares',RewardsActiveIcon,RewardsIcon,blackRewardsIcon)" alt="">
          <span>{{ $t("rewards") }}</span>
        </div>
        <!-- <div :class="['menuItem']"  @click="goPath('/')">
          <img :src="IconPath('/',HomeActiveIcon,HomeIcon,blackHomeIcon)" alt="">
          <span>{{ $t("Home") }}</span>
        </div>
        <div :class="['menuItem']" @click="goPath('/Dao')">
          <img :src="IconPath('/Dao',StakeActiveIcon,StakeIcon,blackStakeIcon)" alt="">
          <span>{{ $t("DAO") }}</span>
        </div>
        <div :class="['menuItem']" @click="goPath('/Rewares')">
          <img :src="IconPath('/Rewares',RewardsActiveIcon,RewardsIcon,blackRewardsIcon)" alt="">
          <span>{{ $t("rewards") }}</span>
        </div> -->
      </div>
    </div>
    <div class="HeaderRight">
      <div class="connect" :class="{HomeConnect:route.path === '/'}" @click="Connect">
        <div class="content">
          {{ address ? AddrHandle(address) : $t('Connectwallet') }}
        </div>
      </div>
      <el-dropdown trigger="click">
        <img :src="route.path === '/' ? Lang:blackLang" alt="">
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="changeLang('zh')">繁體中文</el-dropdown-item>
            <el-dropdown-item @click="changeLang('kr')">한국어</el-dropdown-item>
            <el-dropdown-item @click="changeLang('en')">English</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <img
        class="MenuIcon"
        @click="leftMenuSwitch"
        :src="route.path === '/' ? Menu:blackMenu"
        alt=""
      />
    </div>

  </div>
</template>

<style lang="scss" scoped>
.Header {
  max-width: 1400px;
  width: 100%;
  // margin: 0 13rem;
  box-sizing: border-box;
  height: 5.5rem;
  position: absolute;
  top: 2.75rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  @media (max-width: 1450px) {
    padding: 0 5rem;
  }
  @media (max-width: 767px) {
    height: 8.5rem;
  }
  .HeaderLeft {
    display: flex;
  }
  .HeaderRight{
    display: flex;
    align-items: center;
    img{
      margin-left: 38px;
    }
  }
  .connect {
    width: 9.5rem;
    height: 2.4rem;
    background: linear-gradient(360deg, #299FEF 0%, #69C0FA 100%);
    border-radius: 0.55rem;

    font-size: 0.9rem;
    line-height: 1rem;
    padding: 1px;
    .content {
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0.55rem;
      width: 100%;
      height: 100%;
    }

    // .Connected {
    //   background: #27173a;
    // }
    @media (max-width: 1024px) {
      width: 12rem;
    }
    @media (max-width: 425px) {
      display: none;
    }
  }
  .HomeConnect{
      background: #FFFFFF;
      color: #00A0E9;
      .content {
          color: #00A0E9;
      }
    }
  .Logo {
    height: 100%;
  }
  .MenuIcon {
    display: none;
    @media (max-width: 425px) {
      width: 6rem;
      display: block;
    }
  }
  .menu {
    margin-left: 7.5rem;
    display: flex;
    @media (max-width: 425px) {
      // margin-left: 2.5rem;
      display: none;
    }
    .menuItem {
      display: flex;
      align-items: center;
      margin-right: 3.2rem;
      cursor: pointer;
      img {
        width: 18px;
        height: 18px;
        @media (max-width: 768px) {
          width: 2rem;
          height: 2rem;
        }
        @media (max-width: 425px) {
          width: 4rem;
          height: 4rem;
        }
      }
      span {
        font-size: 18px;
        line-height: 1;
        color: #ffffff;
        margin-left: 0.6rem;
        @media (max-width: 768px) {
          font-size: 2rem;
        }
        @media (max-width: 425px) {
          font-size: 2.5rem;
        }
      }
    }
    .blackFont{
      span{
        color: #3D3D3D;
      }
    }
  }
}
</style>
