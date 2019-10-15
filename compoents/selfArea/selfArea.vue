<template>
  <div class="dialog" v-if="area_state">
    <div class="dialog-mask" @click="cancel"></div>
    <div class="dialog-container">
      <div class="area_box">
        <div class="area_header">
          <div class="area_title">配送至</div>
          <div class="area_close">x</div>
        </div>
        <div class="selected">
          <!-- <div class="selected_item " :class="selected_city.length==0&&select_area.length==0?'selected_on':''" @click="clickProvince()">{{form.province.name?form.province.name:'请选择'}}</div>
          <div class="selected_item " :class="selected_city.length>0&&select_area.length==0? 'selected_on':''" @click="clickCity()">{{form.city.name?form.city.name:'请选择'}}</div>
          <div class="selected_item " :class="form.province.name&&form.city.name?'selected_on':''" @click="clickArea()">{{form.area.name?form.area.name:'请选择'}}</div> -->
          <div class="selected_item" v-show="form.province.name" @click="clickProvince()">{{form.province.name}}</div>
          <div class="selected_item " v-show="form.city.name" @click="clickCity()">{{form.city.name}}</div>
          <div class="selected_item " v-show="form.area.name" @click="clickArea()">{{form.area.name}}</div>
          <div class="selected_item selected_on"  v-show="!(form.area.name&&form.area.name&&form.area.name)">请选择</div>
        </div>
        <div class="select_list">
              <div class="area_province" v-show="selected_city.length==0">
                    <div class="select_item" v-for="(province_item) in province" @click="select_provinveHandle(province_item)" :key="province_item.id">{{province_item.name}}</div>

                </div>
              <div class="area_city"  v-show="select_area.length==0">
                  <div class="select_item" v-for="(city_item) in selected_city" @click="select_cityHandle(city_item)" :key="city_item.id">{{city_item.name}}</div>
            
              </div>
              <div class="area_area">
                  <div class="select_item" v-for="(area_item) in select_area" @click="select_areaHandle(area_item)" :key="area_item.id">{{area_item.name}}</div>
              </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import area from "./data/area.js";
  import city from "./data/city.js";
  import province from "./data/province.js";
export default {
  props:{
    value:{},
    area_parent:{
      type:Object,
      default:function(){
        return (
          {
         province:{
            name: '',
            id : '',
          },
          city:{
            name: '',
            id : '',
          },
          area: {
            name: '',
            id : '',
          },
      }
        )
      }

    }
  },

  data() {
    return {
      form: {
          province:{
            name: '',
            id : '',
          },
          city:{
            name: '',
            id : '',
          },
          area: {
            name: '',
            id : '',
          },
        },
      area_state:this.value,
      province: province,
      city: city,
      area: area,
     };
  },
  created(){
  //  this.form=this.area_parent
  },
  methods: {
    select_provinveHandle(province_item){
      this.form.province.name=province_item.name
      this.form.province.id=province_item.id
    },
    select_cityHandle(city_item){
      this.form.city.name=city_item.name
      this.form.city.id=city_item.id
    },
    select_areaHandle(area_item){
      this.form.area.name=area_item.name
      this.form.area.id=area_item.id
      this.$emit('getArea',this.form)
      this.area_state=false
    },
    clickProvince(){
   
      this.form.province={
        name:'',
        id:''
      }
         this.form.city={
        name:'',
        id:''
      }
      this.form.area={
        name:'',
        id:''
      }

    },
    clickCity(){
  
      this.form.city={
        name:'',
        id:''
      }
      this.form.area={
        name:'',
        id:''
      }
    },
    clickArea(){
    },
    cancel() {
      this.area_state=false
    },
    confirm(){
      this.area_state=false
    }
  },
  computed:{
    selected_city(){
      if(this.city.hasOwnProperty(this.form.province.id)){
         return this.city[this.form.province.id]
      }
      return []
     
    },
    select_area(){
            if(this.area.hasOwnProperty(this.form.city.id)){
            return this.area[this.form.city.id]
      }
      return []

    }
  },
  watch: {
    value(newval){
      this.area_state=newval
    },
    area_state(val){
      this.$emit('input',val)
    },


  },

};
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/pxToRem.scss";
.area_box{
  display: flex;
  flex-direction:column;
  height: 100%;
}
.dialog {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index:999;
  &-mask {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba($color: #000000, $alpha: 0.4);
  }
  &-container {
    position: absolute;
    left: 0;
    right: 0;
    top: 40%;
    bottom: 0;
    border-radius: rem(30) rem(30) 0 0;
    background-color: #fff;
    transition: all 3s ease;
    transform-origin: center;
    padding: rem(30) rem(30);
   
  }
  .area_header {
    text-align: center;
    color: #999999;
    font-size: rem(36);
    position: relative;
    .area_close {
      position: absolute;
      top: 0;
      right: 0;
      padding-left: rem(40);
      border-left: rem(1) solid #cccccc;
    }
  }
  .selected {
    display: flex;
    align-items: center;
    border-bottom: rem(1) solid #ccc;
    box-sizing: border-box;
    .selected_item {
      box-sizing: border-box;
      padding: rem(35) rem(30);
      font-size: rem(34);
      font-weight: bold;
      &.selected_on {
        border-bottom: rem(2) solid #f3270e;
      }
    }
  }
  .select_list{
    overflow:hidden;
    overflow-y: auto;
    flex: 1;
		&::-webkit-scrollbar {
			display: none;
			}
    .select_item{
      font-size: rem(32);
      color: #333;
      padding: rem(30) rem(35);
    }
  }
}
</style>
