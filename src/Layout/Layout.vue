<script setup>
import { computed ,onMounted} from 'vue'
import { useStore } from 'vuex'
import { AddrHandle } from '../utils/tool'
import {useRouter,useRoute} from 'vue-router'
import Header from '../components/Header.vue';
import HomeActiveIcon from '../assets/Home/HomeActiveIcon.png'
import HomeIcon from '../assets/Home/blackHomeIcon.png'
import StakeActiveIcon from '../assets/Home/StakeActiveIcon.png'
import StakeIcon from '../assets/Home/blackStakeIcon.png'
import Rewards from '../assets/Home/blackRewardsIcon.png'
import RewardsActive from '../assets/Home/RewardsActiveIcon.png'
const store = useStore()
const router = useRouter()
const route = useRoute()
let leftMenu = computed(()=>{
  return store.state.leftMenu
})
let address = computed(()=>{
  return store.state.address
})
const goPath=(path)=>{
  router.push(path)
  closeMenuSwitch()
}
const closeMenuSwitch = ()=>{
  store.commit('SETLEFTMENU',false)
}
const Connect=()=>{
  if(!address.value){
    connect((address)=>{
      store.commit('SETADDRESS',address)
    })
  }
}
</script>

<template>
  <Header></Header>
  <router-view></router-view>
  <el-drawer v-model="leftMenu"  @close="closeMenuSwitch" :size="176" :with-header="false">
    <div class="leftMenuTop">
      <div class="drawerLogo">
        <img src="../assets/Home/MenuIcon.png" alt="">
      </div>
      <div class="MenuItem" @click="goPath('/')">
          <img :src="route.path === '/' ? HomeActiveIcon:HomeIcon" alt="">
          <span>HOME</span>
      </div>
      <div class="MenuItem" @click="goPath('/Dao')">
          <img :src="route.path === '/Dao' ? StakeActiveIcon:StakeIcon" alt="">
          <span>DAO</span>
      </div>
      <div class="MenuItem" @click="goPath('/Rewares')">
          <img :src="route.path === '/Rewares' ? RewardsActive:Rewards" alt="">
          <span>REWARDS</span>
      </div>
    </div>
    <div class="connect" @click="Connect">
      <div class="content" :class="['content',{Connected:!!address}]">
        {{ address ?  AddrHandle(address):'Connect wallet'}}
      </div>
    </div>
  </el-drawer>
</template>

<style lang="scss">
.Home{
    background: url('../assets/Home/bg.png') 0 0 / 100% no-repeat;
    min-height: 100vh;
}
.drawerLogo{
  text-align: center;
  margin-bottom: 38px;
  img{
    width: 51px;
  }
}
.MenuItem{
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  span{
    margin-left: 12px;
    color: #3D3D3D;
    font-weight: 500;
    font-size: 14px;
  }
}
.connect{
  width: 100%;
  height: 37px;
  background: linear-gradient(360deg, #299FEF 0%, #69C0FA 100%);
  border-radius: 11px;
  font-size: 0.9rem;
  line-height: 1rem;
  @media (max-width:500px) {
    font-size: 16px;
  }
  .content{
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.55rem;
    width: 100%;
    height: 100%;
    color: #fff;
  }
}
.el-drawer__body{
  width: 176px;
  padding: 33px 24px;
  box-sizing: border-box;
  background: #fff;
  display: flex;
  flex-direction: column;
}
</style>
