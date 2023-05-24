<template>
  <div class="Team">
    <div class="TeamHeader">
      <img src="../assets/Home/back.png" @click="router.go(-1)" alt="" />
      <div>{{ $t('team') }}</div>
      <div></div>
    </div>
    <div class="TeamInfo">
      <div class="totalLabel">{{ $t('Totalpeople') }}</div>
      <div class="totalNum">{{ invitelist.length }}</div>
      <div class="InviteUrl">
        {{AddrHandle(inviteUrl , 11 , 11)}}
        <img src="../assets/Home/copy.png" alt="" />
      </div>
      <div class="recordList">
        <div class="recordLabel">{{ $t('Cumulativewithdrawal') }}</div>
        <div class="recordItem" v-for="item in invitelist">
          <span class="address">{{AddrHandle(item.userAddress,6,6)}}</span>
          <span>{{dateFormat('YYYY/mm/dd HH:MM:SS',new Date(item.createTime))}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import Axios from '../axios'
import {useRouter} from 'vue-router'
import { ref, computed, watch } from "vue";
import {AddrHandle , dateFormat} from '../utils/tool'
const router = useRouter()
const store = useStore();
const invitelist = ref([])
const inviteUrl = ref('')
const token = computed(() => {
  return store.state.token;
});
const address = computed(() => {
  return store.state.address;
});
watch(address,(address)=>{
    console.log(location)
    inviteUrl.value = location.origin+location.pathname+'#/?address='+address
},{
    immediate:true
})
watch(
  token,
  (token) => {
    if (token) {
      Axios.get("/dao/userReferee").then((res) => {
        if (res.data.code === 200) {
          invitelist.value = res.data.data;
        }
        console.log(res, "用户邀请记录");
      });
    }
  },
  {
    immediate: true,
  }
);
</script>

<style lang="scss" scoped>
.Team {
  background: #F5FBFF;
  padding-top: 10rem;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  align-items: center;
  min-height: 100vh;
  @media (max-width: 767px) {
    padding-top: 20rem;
  }
  .TeamHeader {
    width: 750px;
    display: flex;
    justify-content: space-between;
    font-size: 30px;
    color: #262626;
    align-items: center;
    @media (max-width:750px) {
      width: 95%;
    }
    img {
      height: 20px;
    }
  }
  .TeamInfo {
    width: 750px;
    overflow: hidden;
    margin-top: 50px;
    border-radius: 50px;
    background: url(../assets/Home/DaoBg.png) no-repeat center 0 / 100%;
    text-align: center;
    @media (max-width:750px) {
      width: 95%;
    }
    .totalLabel {
      font-size: 14px;
      color: #ffffff;
      margin-top: 25px;
    }
    .totalNum {
      font-size: 40px;
      font-weight: 500;
      color: #ffffff;
      margin-top: 7px;
    }
    .InviteUrl {
      font-weight: 500;
      color: #ffffff;
      font-size: 18px;
      margin-top: 8px;
      margin-bottom: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 20px;
        margin-left: 20px;
      }
    }
    .recordList {
      width: 100%;
      height: 500px;
      border-radius: 50px;
      background: #FFFFFF;
      padding: 35px 30px;
      box-sizing: border-box;
      .recordLabel {
        font-weight: 400;
        color: #3D3D3D;
        font-size: 14px;
        text-align: left;
      }
      .recordItem {
        display: flex;
        justify-content: space-between;
        margin-top: 18px;
        span {
          font-weight: 400;
          color: #262626;
          font-size: 14px;
        }
        .address {
          color: #424242;
          font-size: 16px;
        }
      }
    }
  }
}
</style>
