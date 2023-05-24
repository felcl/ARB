<script setup>
import Axios from '../axios'
import {onMounted,ref} from 'vue'
import {useRouter} from 'vue-router'
const Info = ref(null)
const router = useRouter()
onMounted(()=>{
  Axios.get('/home/data').then(res=>{
    if(res.data.code === 200){
      Info.value = res.data.data
    }
    console.log(res,"首页数据")
  })
})
function goPath(path){
  router.push(path)
}
</script>

<template>
  <div class="bgColor">
    <div class="Home">
      <div class="firstScreen">
        <div class="title">{{ $t("DydxFoundationFor") }}</div>
        <div class="subTitle">
          {{ $t("Simplifiedandsecure") }}
        </div>
        <span class="StakeBtn flexCenter" @click="goPath('/Dao')">{{$t('stakenow')}}</span>
        <div class="totalRow">
          <div class="TotalItem">
            <div class="totalLabel">{{$t('Totalstakedtokens')}}</div>
            <div class="totalValue" v-if="Info">${{ Info.totalPledgeAmount }}</div>
          </div>
          <div class="TotalItem">
            <div class="totalLabel">{{$t('Totalrewardspaid')}}</div>
            <div class="totalValue" v-if="Info">${{ Info.totalReward }}</div>
          </div>
          <div class="TotalItem dn425">
            <div class="totalLabel">{{$t('TotalTreasury')}}</div>
            <div class="totalValue" v-if="Info">${{ Info.nationalAmount }}</div>
          </div>
        </div>
        <!-- <div class="FriendlyLinks">
                  <a href="">
                      <img src="../assets/Home/InsIcon.png" alt="">
                  </a>
                  <a href="">
                      <img src="../assets/Home/facebookIcon.png" alt="">
                  </a>
                  <a href="">
                      <img src="../assets/Home/TwitterIcon.png" alt="">
                  </a>
                  <a href="">
                      <img src="../assets/Home/youtubeIcon.png" alt="">
                  </a>
              </div> -->
      </div>
      <div class="CenterTitle">{{$t('Subscribe')}}</div>
      <div class="CenterSubTitle">
        {{$t('DydxDaoletsyou')}}
      </div>
      <div class="publicize">
        <div class="publicizeMain">
          <div class="Icon">
            <div class="iconBox">
              <img src="../assets/Home/MenuIcon.png" alt="">
            </div>
            <span>ARB</span>
          </div>
          <div class="Info">
            <div class="text">
              {{$t('StakeDydxtokens')}}
            </div>
            <div class="data">
              <div class="APR">
                <div class="APRValue" v-if="Info">{{Info.arbApr}}%</div>
                <span>{{$t('APR')}}</span>
              </div>
              <div class="separate"></div>
              <div class="staked">
                <div class="stakedValue" v-if="Info">${{Info.arbStaked}}</div>
                <span>{{$t('Staked')}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="StakeNow flexCenter" @click="goPath('/Dao')">{{ $t('stakenow') }}</div>
      </div>
      <div class="CenterTitle">{{$t('SVIP')}}</div>
      <div class="CenterSubTitle">
        {{ $t('DydxDaoletsyou') }}
      </div>
      <div class="publicize">
        <div class="publicizeMain">
          <div class="Icon">
            <div class="iconBox">
              <img src="../assets/Home/MenuIcon.png" alt="">
            </div>
            <span>ARB</span>
          </div>
          <div class="Info">
            <div class="text">
              {{ $t('StakeDydxtokens') }}
            </div>
            <div class="data">
              <div class="APR">
                <div class="APRValue" v-if="Info">{{Info.svipApr}}%</div>
                <span>{{$t('APR')}}</span>
              </div>
              <div class="separate"></div>
              <div class="staked">
                <div class="stakedValue" v-if="Info">${{Info.svipStaked}}</div>
                <span>{{$t('Staked')}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="StakeNow flexCenter" @click="goPath('/Dao')">{{$t('stakenow')}}</div>
      </div>
      <div class="join">
        <div class="CenterTitle">{{ $t('Joinourcommunity') }}</div>
        <div class="CenterSubTitle">
          {{ $t('Learnmoreabout') }}
        </div>
        <div class="joinBanner">
          <img src="../assets/Home/book.png" alt="">
            <div>
              <div class="bannerMain">{{ $t('DYDXinTwitter') }}</div>
              <div class="bannerSub">{{ $t('Follow') }} @XXXXXX</div>
            </div>
        </div>
        <div class="contactRow">
          <div class="contactItem">
                <div class="icon">
                    <img src="../assets/Home/Telegram.png" alt="" />
                </div>
                <div class="Title">
                    <div class="mainTitle">Telegram</div>
                    <div class="subTitle">{{ $t('Joinchat') }}</div>
                </div>
            </div>
            <div class="separate"></div>
            <div class="contactItem">
                <div class="icon">
                    <img src="../assets/Home/Discord.png" alt="" />
                </div>
                <div class="Title">
                    <div class="mainTitle">Discord</div>
                    <div class="subTitle">{{ $t('Jointhecommunity') }}</div>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.bgColor {
  background: #0066ff;
}
.Home {
  background: url("../assets/Home/bg.png") 0 0 / 100% no-repeat;
  min-height: 100vh;
  padding-top: 12.7rem;
  overflow: hidden;
  .firstScreen {
    box-sizing: border-box;
    margin: auto;
    overflow: hidden;
    max-width: 1400px;
    @media (max-width:1450px) {
      padding: 0 5rem;
    }
    .title {
      font-size: 3.7rem;
      font-family: bitte;
      line-height: 1;
      color: #ffffff;
      font-weight: bold;
      @media (max-width: 428px) {
        font-size: 5rem;
        text-align: center;
      }
      @media (max-width:1024px) {
        align-items: center;
        margin-top: 20rem;
        padding: 0;
    }
    }
    .subTitle {
      font-size: 1.2rem;
      line-height: 1;
      color: #ffffff;
      margin-top: 2.8rem;
      @media (max-width: 1440px) {
        font-size: 2rem;
      }
      @media (max-width: 768px) {
        font-size: 3rem;
      }
      @media (max-width: 428px) {
        margin-top: 4rem;
        // font-size: 4rem;
        text-align: center;
      }
    }
    .StakeBtn {
      cursor: pointer;
      width: max-content;
      padding: 0.9rem 3.1rem;
      background: #FFFFFF;
      border-radius: 11px;
      margin-top: 2.5rem;
      font-weight: 500;
      color: #00A0E9;
      font-size: 18px;
      @media (max-width: 428px) {
        margin-top: 16rem;
        width: auto;
        height: 38px;
      }
    }
    .totalRow {
      display: flex;
      margin: 9rem 0 6.5rem;
      justify-content: space-around;
      @media (max-width:428px) {
        // flex-direction:column;
      }
      .dn425{
        @media (max-width:428px) {
          display: none;
        }
      }
      .TotalItem {
        text-align: center;
        @media (max-width:428px) {
          margin-bottom: 16px;
        }
        .totalLabel {
          color: #ffffff;
          font-size: 14px;
          @media (max-width:560px) {
            font-size: 12px;
          }
        }
        .totalValue {
          font-weight: 500;
          color: #ffffff;
          font-size: 30px;
          @media (max-width:768px) {
            font-size: 22px;
          }
          @media (max-width:560px) {
            font-size: 16px;
          }
        }
      }
    }
  }
  .CenterTitle {
    margin-top: 3.5rem;
    font-size: 1.8rem;
    font-family: bitte;
    line-height: 1;
    color: #FFFFFF;
    text-align: center;
    @media (max-width:1024px) {
      font-size: 2.8rem;
    }
    @media (max-width:768px) {
      font-size: 3.5rem;
    }
    @media (max-width:428px) {
      font-size: 5rem;
    }
    @media (max-width:375px) {
      font-size: 6rem;
    }
  }
  .CenterSubTitle {
    margin-top: 12px;
    font-size: 14px;
    line-height: 1;
    // text-transform: uppercase;
    color: #ffffff;
    text-align: center;
    padding: 0 16px;
    box-sizing: border-box;
  }
  .publicize {
    width: 43.9rem;
    // min-height: 21.65rem;
    background: #FFFFFF;
    border-radius: 1.4rem;
    margin: 50px auto 0;
    overflow: hidden;
    @media (max-width:1136px) {
      width: 50rem;
    }
    @media (max-width:868px) {
      width: 60rem;
    }
    @media (max-width:588px) {
      width: 70rem;
    }
    @media (max-width:488px) {
      padding-bottom: 20px;
      width: 75rem;
    }
    @media (max-width:388px) {
      width: 85rem;
    }
    .publicizeMain {
      display: flex;
      align-items: center;
      padding: 4.75rem 7rem 3.5rem;
      @media (max-width:428px) {
        flex-direction: column;
        padding: 4.75rem 6rem 3.5rem;
      }
      .Icon {
        margin-right: 7.25rem;
        text-align: center;
        @media (max-width:428px) {
            margin-right: 0;
            text-align: center;
        }
        .iconBox {
          width: 64px;
          height: 64px;
          border-radius: 50%;
        }
        span {
          font-weight: 500;
          color: #283852;
          font-size: 18px;
        }
      }
      .Info {
        .text {
          color: #808080;
          font-weight: 500;
          font-size: 14px;
          text-align: center;
        }
        .data {
          display: flex;
          justify-content: space-between;
          margin-top: 2.5rem;
          @media (max-width:428px) {
            justify-content: center;
          }
          .APR {
            display: flex;
            flex-direction: column;
            align-items: center;
            @media (max-width:428px) {
              flex: 1;
            }
            .APRValue {
              font-weight: 500;
              color: #1fb51a;
              font-size: 20px;
            }
            span {
              color: #808080;
              font-size: 14px;
            }
          }
          .separate {
            height: 50px;
            border-left: 1px solid #979797;
          }
          .staked {
            display: flex;
            flex-direction: column;
            align-items: center;
            @media (max-width:428px) {
              flex: 1;
            }
            .stakedValue {
              font-weight: 600;
              color: #2C2C2C;
              font-size: 20px;
            }
            span {
              font-weight: 400;
              color: #808080;
              font-size: 14px;
            }
          }
        }
      }
    }
    .StakeNow {
      cursor: pointer;
      // width: 200px;
      // height: 56px;
      width: max-content;
      padding: 0.75rem 2.75rem;
      background: #00A0E9;
      border-radius: 0.5rem;
      margin:0 auto 2.7rem;
      font-weight: 500;
      color: #ffffff;
      @media (max-width:428px) {
        font-size: 18px;
        width: auto;
        margin: 0 6rem;
        height: 38px;
      }
    }
  }
  .join {
    padding: 58px 0 130px;
    margin-top: 2.5rem;
    @media (max-width:500px) {
      margin-top: 2em;
      padding: 20px 0 130px;
    }
    .CenterTitle{
        color: #fff;
    }
    .CenterSubTitle{
        color: #D4D4D4;
        max-width: 53.75rem;
        margin:12px auto 0;
    }
    .joinBanner{
        width: 53.75rem;
        height: 11.2rem;
        background: url('../assets/Home/joinBanner.png') no-repeat 0 0 / 100% 100%;
        margin:55px auto 35px;
        display: flex;
        align-items: center;
        padding-left: 7rem;
        box-sizing: border-box;
        color: #fff;
        @media (max-width:768px) {
          width: 65rem;
          height: 14rem;
        }
        @media (max-width:428px) {
          width: 75rem;
          height: 20rem;
        }
        @media (max-width:375px) {
          width: 80rem;
          height: 23rem;
        }
        img{
          margin-right: 20px;
          @media (max-width:768px) {
            width: 38px;
          }
        }
        .bannerMain{
          font-size: 36px;
          font-family: bitte;
          @media (max-width:1024px) {
            font-size: 26px;
          }
          @media (max-width:768px) {
            font-size: 18px;
          }
        }
        .bannerSub{
          font-size: 14px;
          @media (max-width:768px) {
            font-size: 12px;
          }
        }
    }
    .contactRow{
        width: 53.75rem;
        display: flex;
        justify-content: space-between;
        margin: auto;
        @media (max-width:768px) {
          width: 65rem;
          flex-direction: column;
        }
        @media (max-width:428px) {
          width: 75rem;
        }
        @media (max-width:375px) {
          width: 80rem;
        }
        .contactItem{
            height: 8rem;
            flex: 1;
            box-shadow: 0px 4px 10px 0px rgba(0,0,0,0.15);
            border-radius: 1.4rem;
            background: #fff;
            padding: 2.5rem 2rem 2.5rem;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            @media (max-width:768px) {
                margin-bottom: 20px;
                padding: 3rem 2rem 3rem;
            }
            .icon{
              width: 2.7rem;
              height: 2.7rem;
              @media (max-width:768px) {
                width: 27px;
                height: 27px;
              }
              img{
                  width: 100%;
                }
                margin-right: 1.5rem;
            }
            .Title{
                .mainTitle{
                    font-size: 20px;
                    font-weight: 500;
                    color: #393939;
                    @media (max-width:500px) {
                      font-size: 16px;
                    }
                }
                .subTitle{
                    font-weight: 400;
                    color: #858585;
                    font-size: 14px;
                    @media (max-width:500px) {
                      font-size: 12px;
                    }
                }
            }
        }
        .separate{
            width: 2rem;
        }
    }
  }
}
</style>
