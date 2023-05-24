<script setup>
import { watch, computed ,onMounted,ref} from "vue";
import { ElNotification } from 'element-plus'
import { useI18n } from "vue-i18n";
import Axios from '../axios'
import { useStore } from "vuex";
import { contract } from '../web3'
import BigNumber from "big.js";
import { NumSplic } from '../utils/tool'
import { contractAddress ,TokenConfig} from '../config'
const { t:$t } = useI18n();
BigNumber.NE = -40;
BigNumber.PE = 40;
const arbsList = ref([])
const svipList = ref([])
const arbIndex = ref(0)
const svipIndex = ref(0)
const daoAmount = ref(0)
const arbRate = ref(0)
const arbPrice = ref(0)
const totalRewardAmount = ref(0)
const inAllowance = ref(false)
const inSVIPAllowance = ref(false)
const inSubscribe = ref(false)
const inSVIPSubscribe = ref(false)
// const USDTAllowance = ref(new BigNumber(0))
const ARBAllowance = ref(new BigNumber(0))
// const USDTBalance = ref(new BigNumber(0))
const ARBBalance = ref(new BigNumber(0))
const store = useStore();
const address = computed(() => {
  return store.state.address;
});
watch(
  address,
  (address) => {
    if (address) {
      // contract.USDT.methods.balanceOf(address).call().then(res=>{
      //   let amount = new BigNumber(res).div(10 ** 6)
      //   // USDTBalance.value = amount
      //   console.log(amount,"获取用户余额")
      // })
      contract.ARB.methods.balanceOf(address).call().then(res=>{
        let amount = new BigNumber(res).div(10 ** 18)
        ARBBalance.value = amount
        console.log(amount,"获取用户ARB余额")
      })
      getAllowance(contractAddress.Dao)
    }
  },
  {
    immediate: true,
  }
);
const ifApprove = computed(() => {
  if (arbsList.value[arbIndex.value] && ARBAllowance.value.gte(arbsList.value[arbIndex.value].buyAmount)) {
    return false;
  }
  return true;
});
const ifSVIPApprove = computed(() => {
  if (svipList.value[svipIndex.value] && ARBAllowance.value.gte(svipList.value[svipIndex.value].buyAmount)) {
    return false;
  }
  return true;
});
function getAllowance(toAddress) {
  contract.ARB.methods
    .allowance(address.value, toAddress)
    .call()
    .then((res) => {
      res = new BigNumber(res).div(10 ** TokenConfig.ARB.decimals);
      ARBAllowance.value = res
      console.log(res.toString(),"授权额度");
    });
}
function approve(type){
  let amount = new BigNumber("999999")
    .times(10 ** TokenConfig.ARB.decimals)
    .toString();
    if(type === 'vip' && inAllowance.value){
      return ElNotification({
        title: 'Warning',
        message: $t('Pleasedonot'),
        type: 'warning',
      })
    }
    if(type === 'svip' && inSVIPAllowance.value){
      return ElNotification({
        title: 'Warning',
        message: $t('Pleasedonot'),
        type: 'warning',
      })
    }
    if(type === 'vip'){
      inAllowance.value = true;
    }else{
      inSVIPAllowance.value = true;
    }
  contract.ARB.methods.approve(contractAddress.Dao,amount).send({from:address.value}).then(res=>{
    res = new BigNumber(res.events.Approval.returnValues.value).div(10 ** TokenConfig.ARB.decimals);
    ARBAllowance.value = res
  }).finally(()=>{
    if(type === 'vip'){
      inAllowance.value = false;
    }else{
      inSVIPAllowance.value = false;
    }
  })
}
function subscribe(id,type,buyAmount){
  if(type === 'vip' && inSubscribe.value){
      return ElNotification({
        title: 'Warning',
        message: $t('Pleasedonot'),
        type: 'warning',
      })
    }
    if(type === 'svip' && inSVIPSubscribe.value){
      return ElNotification({
        title: 'Warning',
        message: $t('Pleasedonot'),
        type: 'warning',
      })
    }

    if(ARBBalance.value.lt(buyAmount)){
      return ElNotification({
        title: 'Warning',
        message: $t('Insufficientbalance'),
        type: 'warning',
      })
    }
    if(ARBAllowance.value.lt(buyAmount)){
      return ElNotification({
        title: 'Warning',
        message: $t('Pleaseauthorize'),
        type: 'warning',
      })
    }
    if(type === 'vip'){
      inSubscribe.value = true;
    }
    if(type === 'svip'){
      inSVIPSubscribe.value = true;
    }
  console.log(id)
  Axios.post('/dao/stake',{
    id,
    userAddress:address.value
  }).then(res=>{
    if(res.data.code === 200){
      return contract.Dao.methods.stake(res.data.data).send({from:address.value})
    }else{
      ElNotification({
        title: 'Warning',
        message: res.data.msg,
        type: 'warning',
      })
    }
  }).then(res=>{
    ElNotification({
      title: 'Success',
      message: $t('Pledgesuccessful'),
      type: 'success',
    })
    console.log(res,'申购结果')
  }).finally(()=>{
    if(type === 'vip'){
      inSubscribe.value = false;
    }else{
      inSVIPSubscribe.value = false;
    }
  })
}
onMounted(()=>{
  Axios.get('/dao/base').then(res=>{
    if(res.data.code === 200){
      arbsList.value = res.data.data.arbsList
      svipList.value = res.data.data.svipList
      arbRate.value = res.data.data.arbRate
      arbPrice.value = res.data.data.arbPrice
      totalRewardAmount.value = res.data.data.totalRewardAmount
      daoAmount.value = res.data.data.daoAmount
    }
    console.log(res,"获取配置信息")
  })
})
</script>

<template>
  <div class="Stake">
    <div class="StakeTitle">{{ $t('DAO') }}</div>
    <!-- <div class="StakeSubTitle">{{ $t('StakeUSDTand') }}</div> -->
    <div class="StakeItem">
      <div class="totalNetwork">
        <div class="totalItem">
          <div class="label">{{ $t('Totalofthe') }}</div>
          <div class="number">{{ NumSplic(totalRewardAmount,2,true) }}</div>
        </div>
        <div class="separate"></div>
        <div class="totalItem">
          <div class="label">{{ $t('DAOTreasury') }}</div>
          <div class="number">{{  NumSplic(daoAmount,2,true) }}</div>
        </div>
      </div>
      <div class="Increase">
        <div class="Left">
          <div class="Icon">
            <img src="../assets/Home/tokenIcon.png" alt="" />
          </div>
          <div>
            <div class="name">ARB</div>
            <div class="priceInfo">
              <span class="price">$ {{ arbPrice }}</span>
              <span class="pro">{{ arbRate }}%</span>
            </div>
          </div>
        </div>
        <div class="Right">
          <span>{{ NumSplic(ARBBalance,2,true) }}</span>
          <span>$ {{ NumSplic(ARBBalance * arbPrice,2,true)}}</span>
        </div>
      </div>
      <div class="subscribe">
        <div class="subscribeTitle">{{ $t('DydxPurchase') }}</div>
        <div class="subscribeLabel">{{ $t('Subscriptiontype') }}</div>
        <div class="subscribeRow">
          <div class="item flexCenter" :class="{Active:arbIndex === index}" v-for="(item,index) in arbsList" @click="arbIndex = index">{{item.buyAmount}} ARB</div>
        </div>
        <div class="Submit flexCenter" v-if="ifApprove" @click="approve('vip')">
          <svg viewBox="25 25 50 50" v-if="inAllowance">
            <circle cx="50" cy="50" r="20"></circle>
          </svg>
          {{ $t('approve') }}
        </div>
        <div class="Submit flexCenter" v-else @click="subscribe(arbsList[arbIndex].id,'vip',arbsList[arbIndex].buyAmount)">
          <svg viewBox="25 25 50 50" v-if="inSubscribe">
            <circle cx="50" cy="50" r="20"></circle>
          </svg>
          {{ $t('Submit') }}
        </div>
      </div>
    </div>
    <div class="subscribe independence">
      <div class="subscribeTitle">{{ $t('SVIPPurchase') }}</div>
      <div class="subscribeLabel">{{ $t('Subscriptiontype') }}</div>
      <div class="subscribeRow">
        <div class="item flexCenter" :class="{Active:svipIndex === index}" v-for="(item,index) in svipList" @click="svipIndex = index">{{item.buyAmount}} ARB</div>
      </div>
      <div class="Submit flexCenter" v-if="ifSVIPApprove" @click="approve('svip')">
          <svg viewBox="25 25 50 50" v-if="inSVIPAllowance">
            <circle cx="50" cy="50" r="20"></circle>
          </svg>
          {{ $t('approve') }}
      </div>
      <div class="Submit flexCenter" v-else @click="subscribe(svipList[svipIndex].id,'svip',svipList[svipIndex].buyAmount)">
        <svg viewBox="25 25 50 50" v-if="inSVIPSubscribe">
            <circle cx="50" cy="50" r="20"></circle>
          </svg>
        {{ $t('Submit') }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.Stake {
  background: #F5FBFF;
  min-height: 100vh;
  padding-top: 10rem;
  padding-bottom: 50px;
  @media (max-width: 767px) {
    padding-top: 20rem;
  }
  .StakeTitle {
    font-size: 1.5rem;
    line-height: 1;
    color: #262626;
    text-align: center;
    @media (max-width: 1024px) {
      font-size: 3rem;
    }
    @media (max-width: 428px) {
      font-size: 5rem;
    }
  }
  .StakeSubTitle {
    font-size: 14px;
    line-height: 1;
    color: #EEEEEE;
    text-align: center;
    margin-top: 8px;
    @media (max-width: 428px) {
      font-size: 12px;
    }
  }
  .StakeItem {
    background: url("../assets/Home/DaoBg.png") no-repeat center 0 / 100%;
    .totalNetwork {
      display: flex;
      justify-content: space-between;
      // align-items: center;
      margin: 80px 67px 70px;
      @media (max-width: 768px) {
        margin: 40px 33px 35px;
      }
      @media (max-width:428px) {
        margin: 25px 20px 20px;
      }
      .totalItem {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content:space-between;
        .label {
          font-weight: 400;
          color: #e0f1ff;
          font-size: 20px;
          margin-bottom: 36px;
          @media (max-width:500px) {
            font-size: 16px;
            margin-bottom: 18px;
          }
        }
        .number {
          font-size: 40px;
          font-weight: 600;
          color: #ffffff;
          @media (max-width: 768px) {
            font-size: 30px;
          }
          @media (max-width: 550px) {
            font-size: 24px;
          }
          @media (max-width: 428px) {
            font-size: 18px;
          }
        }
      }
      .separate {
        border-left: 1px solid #fff;
        height: 66px;
        margin: 0 50px;
        align-self: center;
      }
    }
    display: flex;
    flex-direction: column;
    width: 750px;
    // background: #00b3ff;
    border-radius: 2.5rem;
    margin: 20px auto 0;
    @media (max-width: 1024px) {
      width: 95%;
      margin: 20px auto;
    }
    .Increase {
      margin: 0 67px 84px;
      display: flex;
      justify-content: space-between;
      @media (max-width: 768px) {
        margin: 0 33px 62px;
      }
      @media (max-width:428px) {
        margin: 0 20px 10px;
      }
      .Left {
        display: flex;
        align-items: center;
        .name {
          font-weight: 600;
          color: #ffffff;
          font-size: 20px;
          @media (max-width:500px) {
            font-size: 12px;
          }
        }
        .price {
          font-weight: 400;
          color: #ffffff;
          font-size: 20px;
          @media (max-width:500px) {
            font-size: 12px;
          }
        }
        .pro {
          color: #49de3d;
          font-weight: 600;
          font-size: 20px;
          margin-left: 25px;
          @media (max-width:500px) {
            font-size: 12px;
          }
        }
      }
      .Right {
        font-weight: 600;
        color: #ffffff;
        font-size: 20px;
        display: flex;
        flex-direction: column;
        @media (max-width:500px) {
            font-size: 12px;
          }
      }
      .Icon {
        width: 52px;
        margin-right: 28px;
        border-radius: 50%;
        // background: #ff0000;
        img{
          width: 100%;
        }
        @media (max-width: 768px) {
          width: 35px;
          height: 35px;
        }
      }
    }
  }

  .subscribe {
    width: 750px;
    margin: 20px auto 0;
    padding: 70px 80px 50px;
    box-sizing: border-box;
    border-radius: 2.5rem;
    background: #fff;
    box-shadow: 0px 3px 20px 0px rgba(0, 0, 0, 0.1);
    @media (max-width: 768px) {
      padding: 35px 40px 25px;
    }
    @media (max-width: 428px) {
      padding: 20px 20px 15px;
    }
    @media (max-width: 1024px) {
      width: 100%;
      margin: 20px auto;
    }
    .subscribeTitle {
      font-weight: 500;
      color: #262626;
      font-size: 30px;
      text-align: center;
      @media (max-width:428px) {
        font-size: 24px;
      }
    }
    .subscribeLabel {
      font-weight: 400;
      color: #3D3D3D;
      font-size: 14px;
      margin-top: 18px;
    }
    .subscribeRow {
      margin-top: 15px;
      display: flex;
      justify-content: space-between;
      .item {
        cursor: pointer;
        width: 179px;
        height: 56px;
        // background: #fff;
        border: 1px solid #00A0E9;
        border-radius: 12px;
        font-weight: 400;
        margin-right: 15px;
        color: #00A0E9;
        font-size: 20px;
        @media (max-width:500px) {
            font-size: 12px;
          }
      }
      .item:nth-last-child(1){
        margin-right: 0;
      }
      .Active {
        background: linear-gradient(360deg, #299FEF 0%, #69C0FA 100%);
        border: none;
        color: #ffffff;
      }
    }
    .Submit {
      cursor: pointer;
      background: linear-gradient(360deg, #299FEF 0%, #69C0FA 100%);
      height: 56px;
      border-radius: 12px;
      margin: 40px auto 20px;
      color: #fff;
      @media (max-width:500px) {
        font-size: 14px;
      }
    }
  }
  .independence {
    width: 750px;
    margin: 30px auto;
    @media (max-width: 1024px) {
      width: 95%;
    }
  }
}
.flexCenter {
  display: flex;
  align-items: center;
  justify-content: center;
}
svg {
  width: 1.5em;
  transform-origin: center;
  animation: rotate 2s linear infinite;
  margin-right: 10px;
}

circle {
  fill: none;
  stroke: #fc2f70;
  stroke-width: 5;
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dashoffset: -125px;
  }
}
</style>
