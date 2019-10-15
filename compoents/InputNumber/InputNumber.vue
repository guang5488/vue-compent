<template>
	<div class="input-number">
	  <div class="input-number_subtract" @click="mins">
		-
	  </div>
	  <div class="input-number_num">
		<input type="number" :value="text" @input="inputchange" :max="max"/>
	  </div>
	  <div class="input-number_add" @click="add">
		+
	  </div>
	</div>
</template>

<script>
import {  Toast } from "mint-ui";
	export default{
	name: "inputnumber",
	props: {
		value:{
			type: Number
		},
		min: {
			type: Number,
			default: 1
		},
		max: {
			type: Number
		},
		item_value:{
		}
	},
	data(){
		return{
			text: this.value
		}	
	},
	created(){

	},
	methods:{
		add() {
			let data =this.text;
			if(this.max||this.max==0) {
				
				if(data >= this.max){
					Toast({
					message:'库存不足',
					position:'top',
					duration: 1000
					});
					return;
				} 
			}
			this.text++;
		},
		mins() {
			let data =this.text;
			if(this.min) {
				if(data <= this.min) return;
			}
			this.text-- ;
		},
		inputchange(e){
			let data=e.target.value;

			if(data>this.max||data<this.min){
				this.text=0
				return
			}
			this.text=+data
		}
	},
	watch:{
		text(newval){
			this.$emit('input',newval)
			if(this.item_value){
			let obj={	
					uniqid:this.item_value.uniqid,
					cartnum:newval
					}
			this.$emit('num_change',obj)
			}
			
		},
		value(val){
			this.text=val
		},
		max(val){
			if(val==0){
				this.text=0
			}
			else{
				this.text=1
			}
			
		}
	}

}
</script>
<style lang="scss" scoped>
  @import "./index.scss";
</style>
