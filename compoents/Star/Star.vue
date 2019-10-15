<template>
  <div class="star">
    <img src="@/assets/images/yes_star.png" alt="" class="star_item" 	v-for="yellow in yelloScore" :key='yellow'/>
    <img src="@/assets/images/icon17.png" alt="" class="star_item" v-for="gray in grayScore" :key="gray"/>
 
  </div>
</template>

<script>
  export default {
    name: "star",
    props:{
      innerScore:{

      }
    },
    data() {
      return {
        yelloScore: 0,
				grayScore: 5
      }
    },
    created() {
      var tempScore = 0;
			if (this.innerScore != null && this.innerScore != undefined && this.innerScore != '') {
				tempScore = this.innerScore;
			}
			
			var yelloScore = parseInt(tempScore / 2);
			var grayScore = 5 - yelloScore;
			this.yelloScore = yelloScore;
			this.grayScore = grayScore;
		
    
    },
    methods:{
      get_grade(){

      }
     
    },
    components: {
    }
  }
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/pxToRem.scss";
.star{
  overflow: hidden;
  .star_item{
    width: rem(25);
    height: rem(25);
    float: left;
    margin-right:rem(10);
  }
}
</style>
