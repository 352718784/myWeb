<template>
    <div class="KARExample">
<!--      <el-button @click="addArView">addArView</el-button>-->
<!--      <el-button @click="getArViewList">getArViewList</el-button>-->
<!--      <el-button @click="rmArView">rmArView</el-button>-->
<!--      <el-button @click="addAr">addAr</el-button>-->
<!--      <el-button @click="initArList(currentSceneId)">initArList</el-button>-->
<!--      <el-button @click="editAr">editAr</el-button>-->
<!--      <el-button @click="renderArObjs">renderArObjs</el-button>-->
      <el-dialog custom-class="kar-data" :visible.sync="dialogVisible" width="50%">
        <nav>
          <div @click="tab='01'" key="01" :class="[tab==='01'?'activity':'']">图层列表</div>
          <div @click="tab='02'" key="02" :class="[tab==='02'?'activity':'']">场景列表</div>
          <div @click="tab='03'" key="03" :class="[tab==='03'?'activity':'']">兴趣点列表</div>
          <div @click="tab='04'" key="04" :class="[tab==='04'?'activity':'']">新增兴趣点</div>
        </nav>
        <el-table key="table1" class="tab tab1 scroll0" v-if="tab==='01'" :data="layerList">
          <el-table-column prop="id" label="id"></el-table-column>
          <el-table-column prop="name" label="名字"></el-table-column>
          <el-table-column prop="devType" label="类型"></el-table-column>
          <el-table-column prop="devType" label="源数据">
            <template slot-scope="scope">
              <el-popover placement="bottom"
                width="200" trigger="click"
                :content="JSON.stringify(scope.row)">
                <el-button size="mini" slot="reference">点击查看</el-button>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
        <el-table key="table2" :cell-class-name="cellClassName" class="tab tab1 scroll0" v-if="tab==='02'" :data="sceneList">
          <el-table-column prop="id" label="ID"></el-table-column>
          <el-table-column prop="name" label="名字"></el-table-column>
          <el-table-column prop="devParams.ip" label="IP"></el-table-column>
          <el-table-column prop="devParams.websocketUrl" label="websocketUrl"></el-table-column>
          <el-table-column prop="querystr" label="querystr"></el-table-column>
          <el-table-column prop="devType" label="源数据">
            <template slot-scope="scope">
              <el-popover placement="bottom"
                          width="200" trigger="click"
                          :content="JSON.stringify(scope.row)">
                <el-button size="mini" slot="reference">点击查看</el-button>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
        <el-table key="table3"  class="tab tab1 scroll0" v-if="tab==='03'" :data="arList">
          <el-table-column prop="id" label="id"></el-table-column>
          <el-table-column prop="name" label="名字"></el-table-column>
          <el-table-column prop="layer_id" label="图层id"></el-table-column>
          <el-table-column prop="dev_id" label="场景id"></el-table-column>
          <el-table-column label="源数据">
            <template slot-scope="scope">
              <el-popover placement="bottom"
                          width="200" trigger="click"
                          :content="JSON.stringify(scope.row)">
                <el-button size="mini" slot="reference">点击查看</el-button>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
        <div class="tab tab1 scroll0" v-if="tab==='02'">
        </div>
      </el-dialog>
      <div id="Kar" v-on:click.ctrl="dialogVisible=true"></div>
    </div>
</template>

<script>
export default {
  name: 'KARExample',
  data () {
    return {
      kar: false,
      dialogVisible: false,
      tab: '01',
      // 图层列表
      layerList: [],
      // 当前场景id
      currentSceneId: false,
      sceneList: [], // 场景列表
      arList: [], // 兴趣点列表
      wsUrl: 'ws://192.168.20.134'
    }
  },
  methods: {
    cellClassName (e) {
      return e.row.id === this.currentSceneId ? 'activity' : ''
    },
    initKar () {
      let that = this
      return new Kar({
        container: '#Kar',
        menus: [KAR.VIEWMANAGER, KAR.LAYERMANAGER, KAR.GEOMETRYEDIT],
        title: '实景地图',
        aggregationMode: KAR.AGGREGATION_MODE.DILUTION,
        UIController: {
          ptz: KAR.UICONTROLLER.PTZ.COMMON
        },
        loading: true,
        defaultView: 44010600001320000011,
        serviceInfo: {
          wsurl: 'ws://192.168.20.131/ar-device',
          arserviceurl: 'http://192.168.20.131/ar'
        },
        onload (e) {
          this.getArViewList(r => {
            that.sceneList = r.data
            that.currentSceneId = this.getCurrentView().id
            this.getArLayerList(r => {
              that.layerList = r.data
              that.initArList(that.layerList.map(a => a.id))
            })
          })
          // this.showPTZ()
          this.hidePTZ()
        },
        onerror (e) {
        }
      })
    },
    // 初始化兴趣点列表
    initArList (id) {
      this.kar.searchArObj({layers: id, type: [0, 1]}, r => {
        if (r.error_code === 0) this.arList = r.data
      })
    },
    // 新增场景
    addArView (params = {}) {
      let viewparam = {
        name: '44010600001320000002',
        description: '测试场景描述',
        latitude: 29.11,
        longitude: 121.22,
        ip: '192.168.20.32',
        port: 80,
        user: 'admin',
        pwd: 'admin123',
        defaultSceneType: 0,
        websocketUrl: 'ws://192.168.20.134',
        range: 5000,
        type: KAR.VIEWTYPE_PTZ,
        resolution: '1920*1080',
        rtspurl: '44010600001320000002'
      }
      params = {...viewparam, ...params}
      return new Promise((resolve, reject) => {
        this.kar.addArView(params, r => {
          if (r.error_code === 0) resolve(r)
          else reject(r)
        })
      })
    },
    // 获取场景列表
    getArViewList () {
      this.kar.getArViewList(res => {
        console.log(res)
      })
    },
    // 删除场景
    rmArView (id = 159618521503284) {
      this.kar.rmArView(159676460155957, r => {
        console.log(r)
      })
    },
    // 新增ar兴趣点
    addAr () {
      let params = {
        name: '兴趣点手动添加',
        ifScene: false,
        layerId: 159618581568274, // 图层id
        geometryType: KAR.POINT,
        devId: 159676953419536, // 场景id
        pos: [{x: 432, y: 189}],
        type: 0,
        channelIds: ['44010600001320000002'],
        websocketUrl: this.wsUrl
      }
      this.kar.addAr(params, res => {
        console.log(JSON.stringify(res))
      })
    },
    // 编辑兴趣点
    editAr () {
      let params = {
        id: 159679398749146,
        name: '兴趣点编辑测试1817',
        ifScene: false,
        layerId: 159618581568274,
        geometryType: KAR.POINT,
        devId: this.currentSceneId,
        pos: [{x: 500, y: 500}],
        type: 0,
        channelIds: ['44010600001320000002'],
        websocketUrl: this.wsUrl
      }
      this.kar.editAr(params, r => {
        console.log('hsq', r)
        this.renderArObjs()
      })
    },
    // 重新渲染图层
    renderArObjs () {
      this.kar.renderArObjs()
    }
  },
  mounted () {
    this.kar = this.initKar()
  },
  beforeDestroy () {
    // this.kar.closeAr()
  }
}
</script>

<style lang="scss">
  .kar-data{
    .el-dialog__body{
      display: flex;flex-direction: column;
      >nav{
        display: flex;
        >div{
          margin: .2rem;border-radius: .3rem;cursor: pointer;user-select: none;
          padding: .3rem;
          &.activity{
            background-color: $blue1;color: white;
          }
        }
      }
      >.tab{
        flex: 1;
        .activity {
          background-color: $blue1; color: white;
        }
      }
    }
  }
  .KARExample{
    position: fixed;left: 0;top: 0;width: 100%;height: 100%;
    >.operate{
      position: absolute; z-index: 36;left: 0; top: 0;
    }
  }
  #Kar{
    width: 100%; height: 100%;position: relative;left: 0;top: 0;
  }
</style>
