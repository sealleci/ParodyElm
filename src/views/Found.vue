<template>
  <div style="width: 100vw;position: relative;">
    <div class="found-select-bar">
      <van-tabs
        v-model="activeOrderPage"
        animated
        :color="elmColor"
      >
        <van-tab title="推荐" name="recommend">
          <van-cell-group inset
                          v-for="(v,i)  in videos" :key="i"
                          style="margin-bottom: 1vh;">
            <van-cell>
              <van-row type="flex" align="center" justify="space-between">
                <van-col style="display: flex;align-items: center;
                font-weight: bold">
                  <van-image :src="avatar" height="30"
                             style="margin-right: 8px;"/>
                  {{ v.name }}
                </van-col>
                <van-col :style="`display: flex;align-items: center;
                    color:${elmColor};font-weight:bold;`">
                  <van-image :src="blueLikeImage" height="20"
                             style="margin-right: 8px;"/>
                  关注
                </van-col>
              </van-row>
              <van-row type="flex" justify="center">
                <div style="width: 85vw;height:50vh;
              border-radius: 8px;
              background-color: #ddd;
              margin:10px 0;">
                </div>
              </van-row>
              <van-row>
                {{ v.desc }}
                <span v-for="(tag,j) in v.tags" :key="j"
                      :style="`color:${elmColor};display:flex;align-items:center;margin:0 4px;`">
                  <van-image :src="tagImage" height="14"/>
                  {{ tag }}
                </span>
              </van-row>
              <van-row class="video-footer">
                <van-col>
                  <van-image :src="dianzanImage" height="24"/>
                  {{ v.likes === 0 ? '点赞' : v.likes }}
                </van-col>
                <van-col>
                  <van-image :src="commentImage" height="24"/>
                  {{ v.comments === 0 ? '评论' : v.comments }}
                </van-col>
                <van-col>
                  <van-image :src="shareImage" height="24"/>
                  分享
                </van-col>
                <van-col>
                  <van-image :src="foldImage" height="24"/>
                </van-col>
              </van-row>
            </van-cell>
          </van-cell-group>
        </van-tab>
        <van-tab title="附近" name="near">
          <van-row type="flex" justify="space-around">
            <van-col span="12" v-for="(near,i) in nears" :key="i"
            style="display: flex;flex-direction:column;align-items: center;">
              <van-cell-group v-for="(cell,j) in near" :key="j"
              style="width: 94%;margin-bottom: 1vh;" inset>
                <van-cell
                  :style="`height:${cell.h}px;background-color:lightgray;`"
                  class="first-cell">
                </van-cell>
                <van-cell>
                  <div style="font-weight: bold;font-size: 14px;"
                       class="near-desc"
                  >
                    {{ cell.desc }}
                  </div>
                  <div style="font-size: 12px;color: gray;display: flex;align-items: center">
                    <van-image :src="localImage" height="15"/>
                    <span class="near-local">
                      {{ cell.local }}
                    </span>
                  </div>
                  <van-row type="flex" align="center" justify="space-between"
                  style="font-size: 12px;color: gray">
                    <van-col style="display: flex;align-items: center;">
                      <van-image :src="avatar" height="20"/>
                      <span class="near-name">
                        {{ cell.name }}
                      </span>
                    </van-col>
                    <van-col style="display: flex;align-items: center;">
                      <van-image :src="dianzanImage" height="16"
                      style="margin-right: 3px;position:relative;top:-1px"/>
                      {{ cell.likes }}
                    </van-col>
                  </van-row>
                  <van-tag plain :color="elmColor" v-if="cell.hash!==''" round
                  style="padding:2px 8px;">
                    {{ '#' + cell.hash }}
                  </van-tag>
                </van-cell>
              </van-cell-group>
            </van-col>
          </van-row>
        </van-tab>
        <van-tab title="关注" name="like">
          <van-empty description="你还没有关注的人"
                     style="padding-bottom: 0px;"/>
          <div style="width: 100%;">
            <h5 style="width: 25vw;margin-bottom: 10px;">为你推荐</h5>
          </div>
          <van-cell-group inset v-for="(up,i) in ups" :key="i"
                          style="margin-bottom: 1vh;">
            <van-cell>
              <van-row type="flex" justify="space-between" align="center">
                <van-col style="display: flex;align-items: center;" span="12">
                  <van-image :src="avatar" height="40" style="margin-right: 10px;"/>
                  <div>
                    <div style="font-weight: bold;">{{ up.name }}</div>
                    <div style="font-size: 12px;color: gray;">{{ '作品 ' + up.count }}</div>
                  </div>
                </van-col>
                <van-col>
                  <van-button round type="primary" style="height: 28px;width: 85px;display: flex;align-items: center;">
                    <van-image :src="likeImage" height="18"
                               style="position: relative;top: 3px;"/>
                    关注
                  </van-button>
                </van-col>
              </van-row>
            </van-cell>
          </van-cell-group>
          <div style="color: gray;margin: 20px 0;">没有更多了</div>
        </van-tab>
      </van-tabs>
      <van-row class="header-right">
        <van-image :src="tvImage" height="26" style="border-radius: 20px;overflow: hidden;"/>
        <van-image :src="avatar" height="26"/>
      </van-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Found',
  data () {
    return {
      elmColor: '#02B6FD',
      activeOrderPage: 1,
      avatar: require('../../src/assets/images/im_ic_profile.png'),
      tvImage: require('../../src/assets/images/mist_life_delicious_icon_living.png'),
      likeImage: require('../../src/assets/images/spd_collect_heart_light.png'),
      blueLikeImage: require('../../src/assets/images/mist_life_delicious_icon_follow_focus_blue.png'),
      dianzanImage: require('../../src/assets/images/mist_life_delicious_icon_single_praise_grey.png'),
      commentImage: require('../../src/assets/images/mist_life_delicious_icon_message.png'),
      shareImage: require('../../src/assets/images/mist_life_delicious_icon_share.png'),
      foldImage: require('../../src/assets/images/mist_life_delicious_icon_single_feedback.png'),
      tagImage: require('../../src/assets/images/ic_label.png'),
      localImage: require('../../src/assets/images/ic_store_select_location.png'),
      videos: [
        {
          name: '桃子er',
          desc: '请回答1988同款烤肉，太幸福了',
          tags: ['肉肉', '香香'],
          likes: 2029,
          comments: 92
        }, {
          name: '阿宝探食行',
          desc: '这家面太香了，一口汤喝下去太满足',
          tags: [],
          likes: 8,
          comments: 1
        }, {
          name: '低调的奢华惹',
          desc: '好朋友从外地回来，烤鸭是她的最爱',
          tags: ['鸡蛋', '烤鸭', '肉'],
          likes: 1000,
          comments: 87
        }, {
          name: '小狗狗暴风吸入',
          desc: '他家的肉原汁原味，没有腌制过！',
          tags: ['肉肉'],
          likes: 8,
          comments: 0
        }, {
          name: '嘉然今晚吃什么',
          desc: '然然我的然然呜呜呜老鼠人蚌埠住了',
          tags: ['乃林', '向晚', '嘉然'],
          likes: 10000,
          comments: 5000
        }
      ],
      nears: [
        [
          {
            desc: '【元祖凤梨酥】纯正土凤梨酱打造精致凤梨酥',
            local: 'GANSO元祖蛋糕（小狗店）',
            name: '元祖食品',
            likes: '253',
            hash: '甜蜜即正义',
            h: 160
          }, {
          desc: '仙气飘飘的多肉蛋糕，每一口都是新鲜的口感',
          local: '多肉蛋糕店',
          name: '好狗食品',
          likes: '683',
          hash: '',
          h: 150
        }, {
          desc: '一桶水果茶——多种水果，多重享受~',
          local: '甜啦啦、奶茶冰激淋店',
          name: '甜啦啦水果茶',
          likes: '242',
          hash: '约会必打卡餐厅',
          h: 155
        }, {
          desc: '烤肉糯米紫菜包饭',
          local: '好吃到不得了紫菜包饭店',
          name: '娜姐木桶饭饭',
          likes: '253',
          hash: '',
          h: 165
        }
        ],
        [
          {
            desc: '叮咚！请确认收货',
            local: '一米蛋糕（欧麦香店）',
            name: '一米蛋糕',
            likes: '1218',
            hash: '',
            h: 152
          }, {
          desc: '打卡一家面包吐司甜品店，他家的面包好吃到绝绝子',
          local: '爸爸糖手工吐司（小狗店）',
          name: '青春从遇见开始',
          likes: '3',
          hash: '',
          h: 165
        }, {
          desc: '本店金牌蛋糕，多肉葡萄蛋糕！三层夹心我去',
          local: '爱民路3号工坊',
          name: '一七蛋糕房（天心）',
          likes: '2',
          hash: '周末大餐',
          h: 148
        }, {
          desc: '9.9元爆款套餐限时抢购！现磨豆浆！非添加剂',
          local: '永和大王（大连和平路口）',
          name: '永和大王',
          likes: '240',
          hash: '',
          h: 156
        }
        ]
      ],
      ups: [
        {
          name: '超级小老狗',
          count: 13
        }, {
          name: '我是威海人',
          count: 45
        }, {
          name: '温州人吃温州',
          count: 36
        }, {
          name: '东北老铁',
          count: 86
        }, {
          name: '小丫么小苹果',
          count: 74
        }, {
          name: '绝绝子女孩',
          count: 23
        }, {
          name: '你好李鑫',
          count: 51
        }, {
          name: '廊坊阿诺',
          count: 43
        },
      ]
    }
  },
  methods: {},
  activated () {
    document.querySelector('#elm-nav').style.display = 'flex'
    document.querySelector('#elm-page-body').style.height = '90vh'
  }
}
</script>

<style scoped lang="less">
@home-bg-bottom-color: #f5f5f5;
.border {
  border: 1px solid black;
}

.text-overflow {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}

.first-cell{
  &::after{
    content: none;
  }
}

.near-local,
.near-name{
  .text-overflow();
}

.near-local{
  width: 30vw;
  margin-left: 4px;
}

.near-name{
  width: 18vw;
  margin-left: 4px;
}

.near-desc{
  display:  -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}

.video-footer {
  float: right;
  margin-top: 10px;

  & > .van-col {
    display: flex;
    align-items: center;
    margin: 0 6px;
  }
}

/deep/ .van-tabs__content {
  width: 100vw;
}

.text-overflow {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}

.header-right {
  position: fixed;
  right: 5px;
  top: 0;
  width: 30vw;
  background-color: @home-bg-bottom-color;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  .van-image {
    margin: 0 8px;
  }
}

.found-select-bar {
  z-index: 100;
  width: 70vw;

  /deep/ .van-tabs {
    background-color: transparent;
    height: 5vh;

    .van-tabs__nav {
      z-index: 100;
      position: fixed;
      top: 0;
      width: 70vw;
      height: 40px;
      padding-left: 0;
      margin: 0;
      background-color: transparent;

      .van-tab {
        font-size: 16px;
        margin: 0;
        background-color: @home-bg-bottom-color;


        &.van-tab--active {
          font-weight: bold;
        }
      }

      .van-tabs__line {
        width: 22px;
        height: 4px;
        bottom: 19px;
      }
    }
  }
}
</style>
