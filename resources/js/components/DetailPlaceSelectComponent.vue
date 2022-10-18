<template>
        <div class="modal-container modal-container-detail modal-container-detail-priority">
            <div class="task-nav-container task-nav-container-detail">
              <div class="nav-left">
                <p class="text-nav text-hover" @click="closePlace">&lt 詳細</p>
              </div>
              <div class="nav-center">
                <p class="text-nav">場所</p>
              </div>
              <div class="nav-right">
              </div>
            </div>
            <div class="modal-item modal-item-first area-hover padding-15">
              <GmapAutocomplete
                 @place_changed='setPlace'
                 style="width:100%;font-size:16px;"
                 :options="{fields: ['geometry', 'formatted_address', 'name']}"
              />
            </div>
            <div class="modal-item modal-item-middle area-hover">
              <p class="text">{{selectPlace.name}}</p>
            </div>
            <div class="modal-item modal-item-middle area-hover">
              <p class="text">{{selectPlace.adress}}</p>
            </div>
            <div class="modal-item modal-item-last  space-between-s">
              <GmapMap
                  :center='center'
                  :zoom="16"
                  map-type-id="terrain"
                  style="width: 100%; height: 300px"
                >
                  <GmapMarker
                    :key="index"
                    v-for="(m, index) in markers"
                    :position="m.position"
                    :clickable="true"
                    :draggable="true"
                    @click="center=m.position"
                  />
                </GmapMap> 

            </div>


        </div>
        
</template>


<script>

 export default{
    props: {
      sendPlace:{
        type:String,
        default:"",
      }
    },
    
    data: function(){
      return{
        center: {
          lat: 0,
          lng: 0
        },
        currentPlace:null,
        markers:[],
        places:[],
        selectPlace:{
          name:'選択されていません',
          adress:'選択されていません',
        }
      }
    },
    methods:{
      closePlace(){
        this.$emit('close',this.selectPlace.name)
      },
      setPlace(place) {
      this.currentPlace = place
      this.addMarker()
      },
      addMarker() {
      if (this.currentPlace) {
          const marker = {
            lat: this.currentPlace.geometry.location.lat(),
            lng: this.currentPlace.geometry.location.lng(),
          };
          this.selectPlace.name = this.currentPlace.name
          this.selectPlace.adress =  this.currentPlace.formatted_address
          this.selectPlace.latitude = this.currentPlace.geometry.location.lat()
          this.selectPlace.longitude = this.currentPlace.geometry.location.lng()

          this.markers.push({ position: marker });
          this.places.push(this.currentPlace);
          this.center = marker;
          this.currentPlace = null;

          this.onChange()
        }
      },
      getLocation(){
          if(!navigator.geolocation){
            return 
          }
          const options = {
            enableHighAccuracy:true,
            timeout:10000,
            maximumAge:0
          }
          navigator.geolocation.getCurrentPosition(this.success, this.error, options)
      },
      success(position){
        this.center = {
          lat:position.coords.latitude,
          lng:position.coords.longitude
        }
        const marker = {
          lat: this.center.lat,
          lng: this.center.lng,
        }
        this.markers.push({ position: marker })
        this.center = marker
        this.currentPlace = null
      },
      error (error) {
     switch (error.code) {
       case 1: //PERMISSION_DENIED
         alert('位置情報の利用が許可されていません')
         break
       case 2: //POSITION_UNAVAILABLE
         alert('現在位置が取得できませんでした')
         break
       case 3: //TIMEOUT
         alert('タイムアウトになりました')
         break
       default:
         alert('現在位置が取得できませんでした')
         break
     }
      },
      onChange() {
          this.geocoder.geocode({
            'address': this.selectPlace.name
          },(results, status) =>{
            if(status === google.maps.GeocoderStatus.OK) {
            // 緯度を取得
              this.selectPlace.latitude = results[0].geometry.location.lat();
            // 経度を取得
              this.selectPlace.longitude = results[0].geometry.location.lng();
              this.selectPlace.adress = results[0].formatted_address

              const marker = {
               lat: this.selectPlace.latitude,
               lng: this.selectPlace.longitude,
             }
              this.markers.push({ position: marker })
              this.center = marker

            }
          }
         )
      }
    },
    mounted:function(){
      this.$gmapApiPromiseLazy().then(() => { 
        this.geocoder = new google.maps.Geocoder() 
 
        if(this.sendPlace !== ""){
          this.selectPlace.name = this.sendPlace
          this.onChange()
        }else{
          this.getLocation()
        }
      
      })

    },
    computed: {
        apiStatus(){
          return this.$store.state.todo.apiStatus
          },
        registerErrors(){
          return this.$store.state.todo.registerErrorMessages
          },       
    },

 }
</script>