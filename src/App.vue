<script setup>
import { onMounted , watch, computed , ref} from 'vue'
import { useStore } from 'vuex'
import { ElNotification } from 'element-plus'
import { useI18n } from "vue-i18n";
import Axios from './axios'
import {init,changeNetwork} from './web3'
import {chainConfig} from './config'
import Layout from './Layout/Layout.vue'
import {GetQueryString} from './utils/tool'
const { t:$t } = useI18n();
const store = useStore()
let dialogWidth = ref("550px")
let InviteDialogVisible = ref(false)
let InvitationLink = ref('')
const address = computed(() => {
  return store.state.address;
});
watch(
  address,
  (address) => {
    if (address) {
      let refereeAddress = GetQueryString('address')
      Axios.post('/uUser/auth',{
        userAddress:address,
        refereeAddress,
        chainType:1
      }).then(res=>{
        if(res.data.code === 200){
          store.commit('SETTOKEN',res.data.data)
          Axios.get('/uUser/checkBind').then(res=>{
            if(res.data.data === 0 && res.data.code === 200){
              InviteDialogVisible.value = true
            }
            if(res.data.data === 1 && res.data.code === 200){
              InviteDialogVisible.value = false
            }
          })
        }
        console.log(res,"用户登录")
      })
    }
  },
  {
    immediate: true,
  }
);
let setDialogWidth = (()=>{
  let val = document.body.clientWidth
  const def = 550 // 默认宽度
  if (val < def) {
    dialogWidth.value = '98%'
  } else {
    dialogWidth.value = def + 'px'
  }
})
function bind(){
  if(!InvitationLink.value){
    return ElNotification({
        title: 'Warning',
        message: $t('Pleaseenterthe1'),
        type: 'warning',
    })
  }
  // let refereeUserAddress = GetQueryString('address',InvitationLink.value)
  // if(!refereeUserAddress){
  //   return ElNotification({
  //       title: 'Warning',
  //       message: '请输入正确的邀请链接',
  //       type: 'warning',
  //   })
  // }
  // GetQueryString('address',InvitationLink.value)
  Axios.post('/uUser/bind',{
	  refereeUserAddress:InvitationLink.value
  }).then(res=>{
    if(res.data.code === 200){
        Axios.get('/uUser/checkBind').then(res=>{
            if(res.data.code === 200 &&  res.data.data === 1){
              InviteDialogVisible.value = false
            }
        })
      ElNotification({
          title: 'Success',
          message: $t('Bindingsuccessful'),
          type: 'success',
      })
    }else{
      ElNotification({
          title: 'Warning',
          message: $t('Bindingfailed'),
          type: 'warning',
      })
    }
    console.log(res,"绑定上级")
  })
}
onMounted(async()=>{
  document.body.style.setProperty('--el-border-radius-small', '20px')
  // document.body.style.setProperty('--el-bg-color', '#3E2470')
  document.body.style.setProperty('--el-text-color-primary', '#3D3D3D')
  document.body.style.setProperty('--message-color', '#ccc')
  setDialogWidth()
  window.onresize = () => {
    setDialogWidth()
  }
    if(window.ethereum){
      //用户账号初始化合约
      let chainId = await window.ethereum.request({ method: "eth_chainId" });
      if(chainId !== chainConfig.chainId){
        changeNetwork(()=>{
          init(address=>{
            if(address)
            store.commit('SETADDRESS',address)
            console.log(address)
          })
        })
      }else{
        //用户账号初始化合约
        init(address=>{
          if(address)
          store.commit('SETADDRESS',address)
          console.log(address)
        })
      }
      window.ethereum.on('connect', connectInfo=>{
        console.log("链接",connectInfo)
      });
      //链改变事件
      window.ethereum.on('chainChanged', info=>{
        // this.chainId = info
      });
      window.ethereum.on('disconnect', async res=>{
        console.log("链接已断开",res)
        let chainId = await window.ethereum.request({ method: "eth_chainId" });
        if(chainId !== chainConfig.chainId){
          store.commit('SETADDRESS','')
        }
      });
      window.ethereum.on('accountsChanged', accounts=>{
        if(accounts[0]){
            store.commit('SETADDRESS',accounts[0])
        }else{
            store.commit('SETADDRESS','')
        }
        console.log("切换账号",accounts)
      });
    }else{
      console.log("未安装钱包")
    }
})

</script>

<template>
    <Layout></Layout>
    <el-dialog v-model="InviteDialogVisible" :title="$t('Invite')" :width="dialogWidth" :show-close="false" :close-on-click-modal="false" center :close-on-press-escape="false">
      <input class="InvitationInput" :placeholder="$t('Pleaseenterthe')" v-model="InvitationLink" type="text">
      <div class="enter" @click="bind">{{ $t('Confirm') }}</div>
    </el-dialog>
</template>

<style lang="scss" scoped>
.InvitationInput{
    width: 100%;
    height: 46px;
    background: #F5FBFF;
    border-radius: 14px;
    border: none;
    outline: none;
    padding: 0 25px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    span{
        color: #1D1D1D;
    }
    input{
        flex: 1;
        border: none;
        outline: none;
        height: 100%;
        background: none;
        color: #262626;
    }
}
.enter{
  width: 100%;
  height: 46px;
  background: linear-gradient(360deg, #299FEF 0%, #69C0FA 100%);
  border-radius: 12px;
  margin-top: 30px;
  color: #FFFFFF;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
