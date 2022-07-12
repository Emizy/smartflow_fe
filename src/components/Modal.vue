<template>
  <transition name="fade">
    <div class="modal-custom"> <!--v-if="show"-->
      <div class="modal-custom__backdrop" @click="existModal"/>
      <div class="modal-custom__dialog" :style="{'width': width+'px'}">
        <div class="modal-custom__header">
          <div class="modal-custom_header sticky-border" style="margin-bottom: -25px;padding-bottom: 0px;">
            <h3 class="text-xl font-semibold text-gray-500" style="margin-left: 14px;">
              {{ title }}
            </h3>
            <div class="flex align-items-center">
              <span class="p-3 leading-none" @click="$emit('handleClose')" v-if="!close">
                <i class="el-icon-circle-close close-icon"></i>
              </span>
            </div>
          </div>
        </div>

        <div class="modal-custom__body">
          <slot name="body"/>
        </div>

        <div class="modal-custom__footer">
          <slot name="footer"/>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    // isVisible : {
    //     type : Boolean,
    //     required : true
    // },
    width: {
      type: Number,
      required: false
    },
    title: {
      type: String,
      required: false
    },
    close: {
      type: Boolean,
      required: false
    },
    backdropOff: {
      type: Boolean,
      require: false,
    }
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    existModal() {
      if (!this.backdropOff) {
        this.$emit('handleClose')
      }
    },
    closeModal() {
      this.show = false
      document.querySelector('body').classList.remove('overflow-hidden')
    },
    openModal() {
      this.show = true
      document.querySelector('body').classList.add('overflow-hidden')
    }
  }
}
</script>


<style>
.modal-custom {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99999;
  overflow-x: hidden;
  overflow-y: auto;
}

.modal-custom__dialog {
  position: relative;
  /*width: 600px;*/
  background-color: #fff;
  border-radius: 5px;
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  z-index: 999999999 !important;


}

@media screen and (max-width: 640px) {
  .modal-custom__dialog {
    width: auto !important;
  }
}

.modal-custom_header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 20px 20px 10px;
}

.modal-custom__close {
  width: 30px;
  height: 30px;
}

.modal-custom__body {
  padding: 10px 20px 10px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.modal-custom__footer {
  padding: 10px 20px 20px;
}

.modal-custom__backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: .5;
  background: #000;
  z-index: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.svg {
  border-radius: 50%;
  border: 1px solid;
  background: #c5c7c8;
  position: relative;
  top: -10px;
  right: -22px;
  height: 29px;
}

.text-xl {
  font-weight: 600;
}

.close-icon {
  font-size: 26px;
  position: relative;
  top: -14px;
  right: -28px;
}
</style>
