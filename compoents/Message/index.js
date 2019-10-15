import Vue from "vue";
import Message from "./src/main.vue";

const MessageConstructor = Vue.extend(Message);

const instance = new MessageConstructor().$mount();

const pageScroll = (() => {
  const fn = e => {
    let evt = e || window.event;
    evt.preventDefault();
    evt.stopPropagation();
  };
  let islock = false;

  return {
    lock(el) {
      if (islock) return;
      islock = true;
      (el || document).addEventListener("mousewheel", fn);
      (el || document).addEventListener("touchmove", fn);
    },
    unlock(el) {
      islock = false;
      (el || document).removeEventListener("mousewheel", fn);
      (el || document).removeEventListener("touchmove", fn);
    }
  };
})();

MessageConstructor.prototype.closeToast = function() {
  const el = instance.$el;
  el.parentNode && el.parentNode.removeChild(el);

  //恢复滚动
  pageScroll.unlock();

  typeof this.callback === "function" && this.callback();
};

const Toast = (options = {}) => {
  instance.msg = options.text;
  instance.icon = options.icon;
  instance.mask = options.mask;
  instance.timeout = ~~options.time || 1400;
  instance.callback = options.callback;

  document.body.appendChild(instance.$el);

  //禁止滚动
  pageScroll.lock();

  const timer = setTimeout(() => {
    clearTimeout(timer);
    instance.closeToast();
  }, instance.timeout + 100);
};

const install = Vue => {
  Vue.prototype.$Message = Toast;
};

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(install);
}

export default install;
